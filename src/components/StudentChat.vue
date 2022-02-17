<template>
  <div class="studentChat">

    <div class="chatContainer">

      <el-row v-model="chatFromList">
        <el-col :span="6">
          <el-card class="chat_people">
              联系人
          </el-card>
          <el-menu
            background-color="whitesmoke"
            style="height: 530px"
            text-color="black">
            <el-menu-item :index='(index+1).toString()' v-for="(item,index) in chatFromList" :key="index" @click="itemClick(item)">
              <span slot="title" style="padding-left: 20px">{{item}}</span>
              <i class="deletePeople el-icon-close" v-show="messageto == item" @click.stop="deleteClick(index)"></i>
            </el-menu-item>
          </el-menu>
        </el-col>

        <el-col :span="18">

          <div class="right_header">
            <span class="chat_title">{{messageto}}</span>
            <el-button v-show="!isDisable" @click="closeChatClick">关闭聊天</el-button>
          </div>

          <div id="right_body" ref="chatContent">
            <div class="li_style" v-for="(item,index) in messageList" :key="index">
              <div :class="{'chat_people_style':messageto == item.messagefrom,
              'chat_people_style_right':messageto != item.messagefrom}">
                <el-avatar class="avatar_style" v-if="messageto == item.messagefrom">{{messageto}}</el-avatar>
                <el-avatar class="avatar_style" v-else>我</el-avatar>
                <span class="time_style">{{item.messagetime}}</span>
              </div>
              <div :class="{'text_style':messageto == item.messagefrom,
              'text_style_right':messageto != item.messagefrom}">
                <span class="text_style_span">{{item.messagecontent}}</span>
              </div>
            </div>
          </div>

          <div class="right_footer">
<!--            <el-form ref="form" :model="chatForm" label-width="300px">-->
              <el-input placeholder="请输入内容"
                        maxlength="40"
                        show-word-limit
                        v-model="messagecontent"
                        clearable
                        :disabled="isDisable">
                <el-button slot="append" icon="el-icon-s-promotion" @click="sendClick" :disabled="isDisable"></el-button>
              </el-input>
<!--            </el-form>-->
          </div>
        </el-col>
      </el-row>

    </div>

  </div>
</template>

<script>
  import {axiosRequest} from "../network/request";

  export default {
    name: "StudentChat",
    data(){
      return{
        timer: 0,
        chatFromList:[],
        messagefrom:this.$route.query.username,
        messageto:'',
        messagetime:'',
        messagecontent:'',
        messageList:[]
      }
    },
    computed:{
      getLocalTime(){
        return this.date.toLocaleString()
      },
      isDisable(){
        if (this.messageto == ''){
          return true
        }else {
          return false
        }
      }
    },
    created(){
      this.getContact()
    },
    beforeDestroy () {
      clearInterval(this.timer)
    },
    methods: {
      getContact(){
        axiosRequest({
          method:'get',
          url:'/getContact',
          params:{
            studentaccount:this.$route.query.username
          }
        }).then(successResponse => {
          if (successResponse.data.code == 200){
            this.chatFromList = successResponse.data.chatList
          }
        })
      },
      itemClick(item){
        this.messageto = item
        this.timer = setInterval(() => {
          // setTimeout(() => {
            axiosRequest({
              method:'get',
              url:'/getMessageList',
              params: {
                messagefrom:this.messagefrom,
                messageto:this.messageto
              }
            }).then(successResponse => {
              if (successResponse.data.code == 200){
                this.messageList = successResponse.data.messageList
              }
            })
          // },0)
        },100)

      },
      sendClick(){
        let date = new Date()
        let dateString = date.toLocaleDateString().split('/')
        let dateStr = dateString[0]+'-'+(dateString[1]>=10?dateString[1]:'0'+dateString[1])+'-'+
            (dateString[2]>=10?dateString[2]:'0'+dateString[2])+' '+
            (date.getHours()>=10?date.getHours():'0'+date.getHours())+':'+
            (date.getMinutes()>=10?date.getMinutes():'0'+date.getMinutes())+':'+
            (date.getSeconds()>=10?date.getSeconds():'0'+date.getSeconds())
        this.messagetime = dateStr
        axiosRequest({
          method:'post',
          url:'/sendMessage',
          data:{
            messagefrom:this.messagefrom,
            messageto:this.messageto,
            messagetime:this.messagetime,
            messagecontent:this.messagecontent,
          }
        }).then(successResponse => {
          if (successResponse.data.code == 200){
            this.messagecontent = ''
          }
        })
      },
      deleteClick(index){
        this.$confirm('是否删除与'+this.messageto+'的聊天记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axiosRequest({
            method: 'post',
            url:'/deleteContact',
            data:{
              studentaccount:this.$route.query.username,
              recruiteraccount:this.messageto
            }
          }).then(successResponse => {
            if (successResponse.data.code == 200){
              this.chatFromList.splice(index,1)
              this.chatFromListDetail = ''
              this.messageto = ''
              this.$message({
                type: 'success',
                message: '已删除！'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消！'
          })
        })
      },
      closeChatClick(){
        this.$router.go(0)
      }
    }
  }
</script>

<style scoped>
  .studentChat{
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    overflow-y:scroll;
    background-color: rgba(209,223,250,1);
  }

  .chatContainer{
    width: 1000px;
    margin-top: 6%;
    margin-bottom: 2%;
    box-shadow: 0 0 25px #cac6c6;
    background-color: whitesmoke;
    border: solid 2px white;
  }

  .right_header{
    background-color: whitesmoke;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid white;
    text-align: center;
  }

  .chat_title{
    flex: 1;
  }

  #right_body{
    background-color: whitesmoke;
    border: 1px solid white;
    height: 430px;
    overflow-y:auto
  }

  #right_body::-webkit-scrollbar{
    display: none;
  }

  .right_footer{
    margin-top: 20px;
    border: 1px solid white;
  }

  .chat_people{
    background-color: whitesmoke;
    font-size: 20px;
  }

  .li_style{
    list-style-type: none;
    flex-direction: column;
    overflow: auto;
    padding-bottom: 10px;
  }

  .chat_people_style{
    display: flex;
    align-items: center;
    margin: 10px;
  }

  .chat_people_style_right{
    display: flex;
    align-items: center;
    margin: 10px;
    flex-direction: row-reverse;
  }

  .avatar_style{
    margin-left: 10px;
  }

  .time_style{
    margin-left: 10px;
  }

  .text_style{
    background-color: rgba(209,223,250,1);
    margin: 0px 20px;
    padding: 12px;
    border-radius: 10px;
    width:fit-content;
    max-width: 400px;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }

  .text_style_right{
    background-color: rgba(209,223,250,1);
    margin: 0px 12px;
    padding: 12px;
    border-radius: 10px;
    width:fit-content;
    max-width: 400px;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    float: right;
  }

  .text_style_span{
    float: right;
    margin-right: 0px;
  }

  .deletePeople{
    float: right;
    margin: 22px 0px 0px 0px;
    color: black;
    font-size: medium;
  }

  .deletePeople:hover{
    color: red;
    font-size: larger;
  }

</style>
