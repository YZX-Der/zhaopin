<template>
  <div class="studentMessage">

    <div class="messageContainer">

      <div class="message_body">
        <el-table
          :data="(messageList.filter(data => !searchInput || data.companyname.toLowerCase().includes(searchInput.toLowerCase()))).slice((currentPage-1)*pagesize,currentPage*pagesize)"
          stripe
          border
          style="width: 100%"
          :default-sort = "{prop: 'passtime', order: 'descending'}">
          <el-table-column label="序号" type="index" width="100px"></el-table-column>
          <el-table-column label="时间" prop="passtime" sortable width="300px"></el-table-column>
          <el-table-column label="招聘者" prop="recruitername" width="500px"></el-table-column>
          <el-table-column align="center">
            <template slot="header" >
              <input v-model="searchInput" placeholder="请输入关键字以搜索准确信息" class="searchInput"/>
            </template>
            <template slot-scope="scope">
              <el-switch
                v-model="(messageList[messageList.findIndex(element => element.recruitername === scope.row.recruitername)]).islooked"
                active-color="#13ce66"
                inactive-color="#696969"
                active-text="已查看"
                inactive-text="未查看"
                active-value="true"
                inactive-value="false"
                :disabled="true">
              </el-switch>
              <el-button
                size="medium"
                type="primary"
                class="btnStyle"
                @click="seeDetails(scope.$index, scope.row)">查 看</el-button>
              <el-button
                size="medium"
                type="danger"
                class="btnStyle"
                @click="deleteMessage(scope.$index, scope.row)">移 除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[6, 12]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="messageList.length"
          align="center"
          background
          style="margin-top: 20px;margin-bottom: 20px">
        </el-pagination>

        <el-drawer :visible.sync="dialogFormVisible" size="100%" direction="ttb" class="messageDetails" :with-header="false">
            <el-form :model="details">
              <div class="message_head">
                简历已通过
                <br>
                <span class="message_span">请留意手机信息以接收面试邀请</span>
              </div>
              <br>
              <el-tag class="tagStyle">
                单位名称
              </el-tag>
              <el-card class="box-card">
                {{details.companyname}}
              </el-card>
              <br>
              <el-tag class="tagStyle">
                单位地址
              </el-tag>
              <el-card class="box-card">
                {{details.companyaddress}}
              </el-card>
            </el-form>
            <div class="demo-drawer__footer">
              <el-button type="primary" @click="closeMessage">关闭</el-button>
            </div>
          </el-drawer>

      </div>

    </div>

  </div>
</template>

<script>
  import {axiosRequest} from "../network/request";

  export default {
    name: "StudentMessage",
    data(){
      return{
        messageList:[],
        searchInput:'',
        currentPage:1,
        pagesize:6,
        details:{},
        dialogFormVisible:false,
        // currentIndex:0,
      }
    },
    created(){
      this.getMessage()
    },
    methods:{
      getMessage(){
        axiosRequest({
          method: 'get',
          url: '/getAllMessage',
          params:{
            username:this.$route.query.username,
            status:'true',
          }
        }).then(successResponse => {
          // console.log(successResponse.data)
          if (successResponse.data.code == 200){
            this.messageList = successResponse.data.messageList
            // console.log(this.messageList);
          }
        })
      },
      handleSizeChange(size){
        this.pagesize = size
      },
      handleCurrentChange(currentPage){
        this.currentPage = currentPage
      },
      seeDetails(index,row){
        // this.details = row
        axiosRequest({
          method: 'get',
          url: '/enterpriseSubmitRecruitInfo',
          params: {
            recruitername: row.recruitername
          }
        }).then(successResponse =>{
          if (successResponse.data.code == 200){
            this.details = successResponse.data.companyInfo
            row.islooked = 'true'
            // console.log(row);
            // console.log(this.details);
          }
        })
        this.dialogFormVisible = true
        // this.currentIndex = this.messageList.findIndex(element => element.recruitername === this.details.recruitername)
        // console.log(this.currentIndex);
      },
      closeMessage(){
        axiosRequest({
          method: 'post',
          url: '/lookMessage',
          data:{
            username: this.$route.query.username,
            recruitername: this.details.recruitername
          }
        }).then(successResponse => {
          if (successResponse.data.code == 200){
            this.dialogFormVisible = false
          }
        })
      },
      deleteMessage(index,row){
        if (row.islooked == 'false'){
          this.$confirm('尚未查看该消息，是否继续删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axiosRequest({
              method:'post',
              url:'/deleteResume',
              data:{
                username:this.$route.query.username,
                recruitername: row.recruitername
              }
            }).then(successResponse => {
              if (successResponse.data.code == 200){
                this.messageList.splice(this.messageList.findIndex(element => element.recruitername === row.recruitername),1)
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消！'
            })
          })
        }else {
          this.$confirm('是否删除该信息?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axiosRequest({
              method:'post',
              url:'/deleteResume',
              data:{
                username:this.$route.query.username,
                recruitername: row.recruitername
              }
            }).then(successResponse => {
              if (successResponse.data.code == 200){
                this.messageList.splice(this.messageList.findIndex(element => element.recruitername === row.recruitername),1)
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消！'
            })
          })
        }
      },
    },
  }
</script>

<style scoped>
  .studentMessage{
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }

  .messageContainer{
    width: 1300px;
    margin-top: 6%;
    margin-bottom: 2%;
    box-shadow: 0 0 25px #cac6c6;
  }

  .message_head{
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    font-size: 110px;
    padding-top: 5%;
    color: #409EFF;
  }

  .message_span{
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    padding-top: 5%;
    color: red;
  }

  .message_body{
    display: flex;
    flex-direction:column;
  }

  .messageDetails{
    width: 600px;
    height: 600px;
    margin-left: 32%;
    margin-top: 5%;
    /*padding: 60px 400px 60px 400px;*/
    box-shadow: 0 0 25px #cac6c6;
  }

  .btnStyle{
    width: 80px;
    margin-left: 20px;
  }

  .tagStyle{
    font-size: 30px;
    margin: 5px;
  }

  .searchInput{
    background-color:#FFFFFF;
    border-radius:4px;
    border:1px solid #dcdfe6;
    box-sizing:border-box;
    color:#606266;
    display:inline-block;
    font-size:inherit;
    height: 39px;
    line-height: 39px;
    outline: none;
    padding:0 15px;
    transition:border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 80%;
    margin-right: 20px;
  }

  .demo-drawer__footer{
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }

  .box-card{
    margin: 5px;
    font-size: 30px;
  }

</style>
