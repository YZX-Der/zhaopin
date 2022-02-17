<template>
  <div class="studentRecruit">

    <div class="information_block">
      <el-carousel trigger="click" height="550px">
        <el-carousel-item v-for="item in imgsBox" :key="item.id" class="carousel-item">
          <img :src="item.img" class="imgStyle">
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="calender">
      <el-calendar v-model="value">
        <template
          slot="dateCell"
          slot-scope="{data}">
          <div v-if="dealCount(data.day)>0">
            {{ data.day.split('-').slice(1).join('-') }}
            <br/>
            <el-popover
              placement="top"
              width="450"
              trigger="click">
                <el-table :data="dealInfo(data.day)" stripe border>
                  <el-table-column width="300" property="companyname" label="公司名称"></el-table-column>
                  <el-table-column label="宣讲简介" align="center">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="primary"
                        @click.native.prevent="seeDetails(scope.row)">简介</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              <p class="countInfo" slot="reference">{{dealCount(data.day)}}场</p>
            </el-popover>

            <el-dialog title="企业简介" :visible.sync="dialogFormVisible_all">
              <el-form :model="details">
                <el-form-item label="单位名称" label-width="70px">
                  <el-input :value="details.companyname" readonly></el-input>
                </el-form-item>
                <el-form-item label="单位地址" label-width="70px">
                  <el-input :value="details.companyaddress" readonly></el-input>
                </el-form-item>
                <el-form-item label="宣讲时间" label-width="70px">
                  <el-input :value="details.presentationtime" readonly></el-input>
                </el-form-item>
                <el-form-item label="宣讲地址" label-width="70px">
                  <el-input :value="details.presentationaddress" readonly></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible_all = false">关闭</el-button>
              </div>
            </el-dialog>
          </div>
          <div v-else>
            {{ data.day.split('-').slice(1).join('-') }}
          </div>
        </template>
      </el-calendar>
    </div>

  </div>
</template>

<script>
  import {axiosRequest} from "../network/request";

  export default {
    name: "StudentRecruit",
    data(){
      return{
        value:new Date(),
        imgsBox:[
          {
            id:0,
            img:require('assets/img/1.jpg')
          },
          {
            id: 1,
            img:require('assets/img/2.jpg')
          },
          {
            id: 2,
            img:require('assets/img/3.jpg')
          },
          {
            id: 3,
            img:require('assets/img/4.jpg')
          }
        ],
        info:[],
        details:{},
        dialogFormVisible_all :false,
      }
    },
    created(){
      this.getRecruitInfo()
    },
    methods:{
      dealPresentationtime(){
        return this.details.presentationtime.slice(0,10)
      },
      getRecruitInfo(){
        axiosRequest({
          method:'get',
          url:'/companyInfo',
          params:{
            isreviewed: 'true'
          }
        }).then(successResponse => {
          if (successResponse.data.code == 200){
            this.info = successResponse.data.companyList
          }
        })
      },
      dealInfo(date){
        let result = []
        for (let i = 0;i < this.info.length;i++){
          if (this.info[i].presentationtime.slice(0,10) == date){
            result.push(this.info[i])
          }
        }
        return result
      },
      dealCount(date){
        return this.dealInfo(date).length
      },
      seeDetails(row){
        // console.log(row);
        this.details= row,
        this.dialogFormVisible_all  = true
      }
    }

  }
</script>

<style scoped>
  .studentRecruit{
    display: flex;
    flex-direction:column;
    align-items: center;
  }

  .information_block{
    width: 1300px;
    margin-top: 6%;
    box-shadow: 0 0 25px #cac6c6;
  }

  .carousel-item{
    background-color: bisque;
    height: 550px;
  }

  .imgStyle{
    height: 550px;
    width: 1300px;
  }

  .calender{
    width: 1300px;
    height: auto;
    margin: 2% 0;
    box-shadow: 0 0 25px #cac6c6;
  }

  .countInfo:hover{
    color: red;
  }


</style>
