<template>
  <div class="managerRecruitment">

    <div class="recruitmentContainer">

      <div class="recruitment_head">
        招聘信息管理
      </div>

      <div class="recruitment_body">

      <el-tabs v-model="type" type="border-card" @tab-click="handleClick">

        <el-tab-pane label="未发布的招聘信息" name="allRecruitment">
          <el-table
            :data="(allRecruitmentList.filter(data => !searchInput || data.companyname.toLowerCase().includes(searchInput.toLowerCase()))).slice((currentPage-1)*pagesize,currentPage*pagesize)"
            stripe
            border
            style="width: 100%"
            :default-sort = "{prop: 'applytime', order: 'ascending'}">
            <el-table-column label="序号" type="index" width="50px"></el-table-column>
            <el-table-column label="申请时间" prop="applytime" sortable width="300px"></el-table-column>
            <el-table-column label="申请用户" prop="recruitername" sortable width="700px"></el-table-column>
            <el-table-column align="center">
              <template slot="header" >
                <input v-model="searchInput" placeholder="请输入关键字搜索" class="searchInput"/>
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click.native.prevent="seeDetails(scope.$index,scope.row)">招聘详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[6,12]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="allRecruitmentList.length"
            align="center"
            background
            style="margin-top: 20px">
          </el-pagination>
        </el-tab-pane>

        <el-tab-pane label="已发布的招聘信息" name="passedRecruitment">
          <el-table
            :data="(passedRecruitmentList.filter(data => !searchInput || data.companyname.toLowerCase().includes(searchInput.toLowerCase()))).slice((currentPage-1)*pagesize,currentPage*pagesize)"
            stripe
            border
            style="width: 100%"
            :default-sort = "{prop: 'applytime', order: 'ascending'}">
            <el-table-column label="序号" type="index" width="50px"></el-table-column>
            <el-table-column label="申请时间" prop="applytime" sortable width="300px"></el-table-column>
            <el-table-column label="申请用户" prop="recruitername" sortable width="700px"></el-table-column>
            <el-table-column align="center">
              <template slot="header" >
                <input v-model="searchInput" placeholder="请输入关键字搜索" class="searchInput"/>
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click.native.prevent="seePassedDetails(scope.row)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[6,12]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="passedRecruitmentList.length"
            align="center"
            background
            style="margin-top: 20px">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>



        <el-drawer :visible.sync="dialogFormVisible_all" size="100%" direction="ttb" class="recruitmentDetails" :with-header="false">
          <el-form :model="details">
            <div class="recruitment_head">
              {{details.companyname}}的招聘信息
            </div>
            <br>
            <el-row>
              <el-col :span="12">
                <el-form-item label="单位名称" label-width="100px">
                  <el-input :value="details.companyname" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单位地址" label-width="100px">
                  <el-input :value="details.companyaddress" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="宣讲时间" label-width="100px">
                  <el-input :value="details.presentationtime" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="宣讲地址" label-width="100px">
                  <el-input :value="details.presentationaddress" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="招聘类型" label-width="100px">
                  <el-input :value="details.recruitmenttype" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="招聘对象" label-width="100px">
                  <el-input :value="details.recruitmentobject" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="招聘院系" label-width="100px">
                  <el-input :value="details.recruitingdepartment" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="招聘专业" label-width="100px">
                  <el-input :value="details.recruitingprofession" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="招聘职位" label-width="100px">
                  <el-input :value="details.recruitingposition" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="计划人数" label-width="100px">
                  <el-input :value="details.plannumber" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="23">
                <el-form-item label="相关介绍" label-width="100px">
                  <el-input :value="details.introduction" readonly type="textarea" :autosize="{ minRows: 8}"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button type="success" @click="releaseRecruitment">发 布</el-button>
            <el-button type="warning" @click="deleteRecruitment">移 除</el-button>
            <el-button type="info" @click="dialogFormVisible_all = false">关 闭</el-button>
          </div>

        </el-drawer>

        <el-drawer :visible.sync="dialogFormVisible_passed" size="100%" direction="ttb" class="recruitmentDetails" :with-header="false">
          <el-form :model="details">
            <div class="recruitment_head">
              {{details.companyname}}的信息
            </div>
            <br>
            <el-row>
              <el-col :span="12">
                <el-form-item label="单位名称" label-width="100px">
                  <el-input :value="details.companyname" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单位地址" label-width="100px">
                  <el-input :value="details.companyaddress" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="宣讲时间" label-width="100px">
                  <el-input :value="details.presentationtime" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="宣讲地址" label-width="100px">
                  <el-input :value="details.presentationaddress" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="招聘类型" label-width="100px">
                  <el-input :value="details.recruitmenttype" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="招聘对象" label-width="100px">
                  <el-input :value="details.recruitmentobject" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="招聘院系" label-width="100px">
                  <el-input :value="details.recruitingdepartment" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="招聘专业" label-width="100px">
                  <el-input :value="details.recruitingprofession" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="招聘职位" label-width="100px">
                  <el-input :value="details.recruitingposition" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="计划人数" label-width="100px">
                  <el-input :value="details.plannumber" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="23">
                <el-form-item label="相关介绍" label-width="100px">
                  <el-input :value="details.introduction" readonly type="textarea" :autosize="{ minRows: 8}"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button type="success" :disabled="dialogFormVisible_passed">已通过审核</el-button>
            <el-button type="warning" @click="deleteRecruitment">移 除</el-button>
            <el-button type="info" @click="dialogFormVisible_passed = false">关闭</el-button>
          </div>
        </el-drawer>


      </div>

    </div>

  </div>
</template>

<script>
  import {axiosRequest} from "../network/request";

  export default {
    name: "ManagerRecruitment",
    data(){
      return{
        allRecruitmentList:[],
        passedRecruitmentList:[],
        searchInput:'',
        details:{},
        dialogFormVisible_all:false,
        dialogFormVisible_passed:false,
        currentPage:1,
        pagesize:6,
        type:'allRecruitment',
        currentIndex:0
      }
    },
    created() {
      this.getAllRecruitment()
    },
    methods:{
      seeDetails(index,info){
        this.currentIndex = index
        this.details= info
        this.dialogFormVisible_all = true
      },
      seePassedDetails(info){
        this.details= info
        this.dialogFormVisible_passed = true
      },
      handleSizeChange(size){
        this.pagesize = size
      },
      handleCurrentChange(currentPage){
        this.currentPage = currentPage
      },
      releaseRecruitment(){
        // console.log(this.details.recruitername);
        axiosRequest({
          method: 'post',
          url:'/passRecruitment',
          data:{
            recruitername:this.details.recruitername
          }
        }).then(successResponse => {
          if (successResponse.data.code == 200){
            this.allRecruitmentList.splice(this.currentIndex,1)
            this.dialogFormVisible_all = false
            this.$message({
              type: 'success',
              message: '发布成功!'
            })
          }
        })
      },
      deleteRecruitment(){
        this.$confirm('是否确认移除企业:'+this.details.companyname+'?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axiosRequest({
            method:'post',
            url:'/deleteRecruitment',
            data:{
              recruitername: this.details.recruitername
            }
          }).then(successResponse => {
            if (successResponse.data.code == 200){
              if (this.details.isreviewed == "false"){
                this.allRecruitmentList.splice(this.currentIndex,1)
                this.dialogFormVisible_all = false
                this.$message({
                  type: 'success',
                  message: '移除成功!'
                })
              }else if (this.details.isreviewed == "true"){
                this.passedRecruitmentList.splice(this.currentIndex,1)
                this.dialogFormVisible_passed = false
                this.$message({
                  type: 'success',
                  message: '移除成功!'
                })
              }
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消！'
          })
        })
      },
      getAllRecruitment(){
        axiosRequest({
          method:'get',
          url:'/companyInfo',
          params:{
            isreviewed: 'false'
          }
        }).then(successResponse => {
          if (successResponse.data.code == 200){
            this.allRecruitmentList = successResponse.data.companyList
          }
        })
      },
      handleClick(tab){
        if (tab.name == 'passedRecruitment'){
          axiosRequest({
            method:'get',
            url:'/companyInfo',
            params: {
              isreviewed: 'true'
            }
          }).then(successResponse => {
            if (successResponse.data.code == 200){
              this.passedRecruitmentList = successResponse.data.companyList
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .managerRecruitment{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .recruitmentContainer{
    width: 1300px;
    margin-top: 6%;
    margin-bottom: 2%;
    box-shadow: 0 0 25px #cac6c6;
  }

  .recruitment_head{
    display: flex;
    flex-direction:column;
    align-items: center;
    font-size: 100px;
    color: #909399;
    background-color: rgba(193,230,198,1);
  }

  .recruitment_body{
    display: flex;
    flex-direction:column;
    /*height: 485px;*/
  }

  .searchInput{
    background-color:#FFFFFF;
    border-radius:4px;
    border:1px solid #dcdfe6;
    box-sizing:border-box;
    color:#606266;
    display:inline-block;
    font-size:inherit;
    height: 35px;
    line-height: 35px;
    outline: none;
    padding:0 15px;
    transition:border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  }

  .recruitmentDetails{
    padding: 15px 200px;
    box-shadow: 0 0 25px #cac6c6;
  }

  .el-input{
    width: 90%;
  }

  .demo-drawer__footer{
    display: flex;
    justify-content: center;
  }

</style>
