<template>
  <div class="enterpriseGetResume">

    <div class="resumeContainer">

      <div class="resume_head">
        简历详情
      </div>

      <div class="resume_body">

      <el-tabs v-model="type" type="border-card" @tab-click="handleClick">

        <el-tab-pane label="全部简历" name="allResume">

          <el-form :inline="true" :model="filterBox" class="demo-form-inline">
            <el-form-item label="筛选条件:">
              <el-select v-model="filterBox.condition" placeholder="请选择筛选条件" clearable>
                <el-option label="专业" value="profession"></el-option>
                <el-option label="英语等级" value="englishcertificate"></el-option>
                <el-option label="计算机等级" value="calculatorcertificate"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="条件内容:">
              <el-input v-model="filterBox.content" placeholder="请填写条件关键字"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="filterClick">查询</el-button>
            </el-form-item>
          </el-form>

          <el-table
            :data="allResumeList"
            stripe
            border
            style="width: 100%"
            :default-sort = "{prop: 'delivertime', order: 'ascending'}">
            <el-table-column label="序号" type="index" width="50px"></el-table-column>
            <el-table-column label="投递时间" prop="delivertime" sortable width="300px"></el-table-column>
            <el-table-column label="投递用户" prop="username" sortable width="700px"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click.native.prevent="seeDetails(scope.$index,scope.row)">简历详情</el-button>
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
            :total="allResumeList.length"
            align="center"
            background
            style="margin-top: 20px">
          </el-pagination>
        </el-tab-pane>

        <el-tab-pane label="已通过" name="passedResume">
          <el-table
            :data="passedResumeList"
            stripe
            border
            style="width: 100%"
            :default-sort = "{prop: 'delivertime', order: 'ascending'}">
            <el-table-column label="序号" type="index" width="50px"></el-table-column>
            <el-table-column label="投递时间" prop="delivertime" sortable width="300px"></el-table-column>
            <el-table-column label="投递用户" prop="username" sortable width="700px"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click.native.prevent="seePassedDetails(scope.row)">简历详情</el-button>
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
            :total="passedResumeList.length"
            align="center"
            background
            style="margin-top: 20px">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>



        <el-drawer :visible.sync="dialogFormVisible_all" size="100%" direction="ttb" class="resumeDetails" :with-header="false">
          <el-form :model="details">
            <div class="resume_head">
              {{details.username}}的简历
            </div>
            <br>
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名" label-width="100px">
                  <el-input :value="details.name" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别" label-width="100px">
                  <el-input :value="details.sex" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="出生日期" label-width="100px">
                  <el-input :value="details.birthday" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="年龄" label-width="100px">
                  <el-input :value="details.age" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="手机号码" label-width="100px">
                  <el-input :value="details.phone" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="家庭住址" label-width="100px">
                  <el-input :value="details.address" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="联系QQ" label-width="100px">
                  <el-input :value="details.number" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="邮箱号" label-width="100px">
                  <el-input :value="details.email" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="专业" label-width="100px">
                  <el-input :value="details.profession" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="英语证书" label-width="100px">
                  <el-input :value="details.englishcertificate" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="计算机证书" label-width="100px">
                  <el-input :value="details.calculatorcertificate" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="23">
                <el-form-item label="个人经历" label-width="100px">
                  <el-input :value="details.experience" readonly  type="textarea" :autosize="{ minRows: 5}"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button type="success" @click="passResume">通 过</el-button>
            <el-button type="warning" @click="deleteResume">删 除</el-button>
            <el-button type="info" @click="dialogFormVisible_all = false">关 闭</el-button>
          </div>

        </el-drawer>

        <el-drawer :visible.sync="dialogFormVisible_passed" size="100%" direction="ttb" class="resumeDetails" :with-header="false">
          <el-form :model="details">
            <div class="resume_head">
              {{details.username}}的简历
            </div>
            <br>
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名" label-width="100px">
                  <el-input :value="details.name" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别" label-width="100px">
                  <el-input :value="details.sex" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="出生日期" label-width="100px">
                  <el-input :value="details.birthday" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="年龄" label-width="100px">
                  <el-input :value="details.age" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="手机号码" label-width="100px">
                  <el-input :value="details.phone" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="家庭住址" label-width="100px">
                  <el-input :value="details.address" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="联系QQ" label-width="100px">
                  <el-input :value="details.number" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="邮箱号" label-width="100px">
                  <el-input :value="details.email" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="专业" label-width="100px">
                  <el-input :value="details.profession" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="英语证书" label-width="100px">
                  <el-input :value="details.englishcertificate" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="计算机证书" label-width="100px">
                  <el-input :value="details.calculatorcertificate" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="23">
                <el-form-item label="个人经历" label-width="100px">
                  <el-input :value="details.experience" readonly  type="textarea" :autosize="{ minRows: 5}"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button type="warning" @click="deletePassedResume">删 除</el-button>
            <el-button type="info" @click="dialogFormVisible_passed = false">关 闭</el-button>
          </div>

        </el-drawer>

      </div>

    </div>

  </div>
</template>

<script>
  import {axiosRequest} from "../network/request";

  export default {
    name: "EnterpriseGetResume",
    data(){
      return{
        allResumeList:[],
        passedResumeList:[],
        searchInput:'',
        details:{},
        dialogFormVisible_all:false,
        dialogFormVisible_passed:false,
        currentPage:1,
        pagesize:6,
        type:'allResume',
        currentIndex:0,
        filterBox:{
          condition:'',
          content:''
        }
      }
    },
    created(){
      this.getAllResumeInfo()
    },
    methods:{
      filterClick(){
        if (this.filterBox.condition == ''){
          this.filterBox.content = ''
          this.getAllResumeInfo()
        }else if (this.filterBox.condition == 'profession'){
          axiosRequest({
            method:'get',
            url:'/filterResumeByProfession',
            params:{
              recruitername:this.$route.query.username,
              content:this.filterBox.content
            }
          }).then(successResponse => {
            if (successResponse.data.code == 200){
              this.allResumeList = successResponse.data.filterResumeList
            }
          })
        }else if (this.filterBox.condition == 'englishcertificate'){
          axiosRequest({
            method:'get',
            url:'/filterResumeByEnglishcertificate',
            params:{
              recruitername:this.$route.query.username,
              content:this.filterBox.content
            }
          }).then(successResponse => {
            if (successResponse.data.code == 200){
              this.allResumeList = successResponse.data.filterResumeList
            }
          })
        }else if (this.filterBox.condition == 'calculatorcertificate'){
          axiosRequest({
            method:'get',
            url:'/filterResumeByCalculatorcertificate',
            params:{
              recruitername:this.$route.query.username,
              content:this.filterBox.content
            }
          }).then(successResponse => {
            if (successResponse.data.code == 200){
              this.allResumeList = successResponse.data.filterResumeList
            }
          })
        }
      },
      seeDetails(index,info){
        this.currentIndex = index
        axiosRequest({
          method:'get',
          url:'/studentMakeInfo',
          params:{
            username:info.username
          }
        }).then(successResponse => {
          if (successResponse.data.code == 200){
            this.details = successResponse.data.studentMakeInfo
          }
        })
        this.dialogFormVisible_all = true
      },
      seePassedDetails(info){
        axiosRequest({
          method:'get',
          url:'/studentMakeInfo',
          params:{
            username:info.username
          }
        }).then(successResponse => {
          if (successResponse.data.code == 200){
            this.details = successResponse.data.studentMakeInfo
          }
        })
        this.dialogFormVisible_passed = true
      },
      handleSizeChange(size){
        this.pagesize = size
      },
      handleCurrentChange(currentPage){
        this.currentPage = currentPage
      },
      getAllResumeInfo(){
        axiosRequest({
          method:'get',
          url:'/allResumeInfo',
          params:{
            recruitername:this.$route.query.username,
            status:'false'
          }
        }).then(successResponse => {
          // console.log(successResponse.data);
          if (successResponse.data.code == 200){
            this.allResumeList = successResponse.data.allResumeList
          }
        })
      },
      passResume(){
        // console.log(this.details.username,this.details.recruitername);
        // console.log('通过');
        // console.log(this.details);
        let date = new Date()
        let dateString = date.toLocaleDateString().split('/')
        let dateStr = dateString[0]+'-'+(dateString[1]>=10?dateString[1]:'0'+dateString[1])+'-'+
            (dateString[2]>=10?dateString[2]:'0'+dateString[2])+' '+(date.getHours()>=10?date.getHours():'0'+date.getHours())+':'+
            (date.getMinutes()>=10?date.getMinutes():'0'+date.getMinutes())
        axiosRequest({
          method: 'post',
          url: '/passresume',
          data:{
            username:this.details.username,
            recruitername: this.$route.query.username,
            passtime:dateStr
          }
        }).then(successResponse => {
          if (successResponse.data.code == 200){
            this.allResumeList.splice(this.currentIndex,1)
            this.dialogFormVisible_all = false
            this.$message({
              type: 'success',
              message: '已成功收取简历!'
            })
          }
        })
      },
      deleteResume(){
        this.$confirm('是否删除用户'+this.details.username+'的简历?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axiosRequest({
            method:'post',
            url:'/deleteResume',
            data:{
              username:this.details.username,
              recruitername: this.$route.query.username
            }
          }).then(successResponse => {
            if (successResponse.data.code == 200){
              this.allResumeList.splice(this.currentIndex,1)
              this.dialogFormVisible_all = false
                this.$message({
                  type: 'success',
                  message: '移除成功!'
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
      deletePassedResume(){
        this.$confirm('是否删除用户'+this.details.username+'的简历?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axiosRequest({
            method:'post',
            url:'/deleteResume',
            data:{
              username:this.details.username,
              recruitername: this.$route.query.username
            }
          }).then(successResponse => {
            if (successResponse.data.code == 200){
              this.passedResumeList.splice(this.currentIndex,1)
              this.dialogFormVisible_passed = false
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
      },
      handleClick(tab){
        if (tab.name == 'passedResume'){
          axiosRequest({
            method:'get',
            url:'/passedResumeInfo',
            params: {
              recruitername:this.$route.query.username,
              status:'true'
            }
          }).then(successResponse => {
            if (successResponse.data.code == 200){
              this.passedResumeList = successResponse.data.allResumeList
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .enterpriseGetResume{
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }

  .resumeContainer{
    width: 1300px;
    margin-top: 6%;
    margin-bottom: 2%;
    box-shadow: 0 0 25px #cac6c6;
  }

  .resume_head{
    display: flex;
    flex-direction:column;
    align-items: center;
    font-size: 100px;
    color: #909399;
    background-color: rgba(255,198,128,1);
  }

  .resume_body{
    display: flex;
    flex-direction:column;
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

  .resumeDetails{
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
