<template>
  <div class="studentDeliver">

    <div class="deliverContainer">
      <div class="deliver_head">
      简历投递
    </div>

      <div class="deliver_body">

      <el-tabs v-model="type" type="border-card" @tab-click="handleClick">
<!--        <el-tabs v-model="type" type="border-card">-->
        <el-tab-pane label="全部信息" name="allInfo">
          <el-table
            :data="(studentDeliverForm.filter(data => !searchInput || data.companyname.toLowerCase().includes(searchInput.toLowerCase()))).slice((currentPage-1)*pagesize,currentPage*pagesize)"
            stripe
            border
            style="width: 100%">
            <el-table-column label="序号" type="index" width="50px"></el-table-column>
            <el-table-column label="单位名称" prop="companyname" width="300px"></el-table-column>
            <el-table-column label="单位地址" prop="companyaddress" width="700px"></el-table-column>
            <el-table-column align="center">
              <template slot="header" >
                <input v-model="searchInput" placeholder="请输入关键字搜索" class="searchInput"/>
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click.native.prevent="seeDetails(scope.$index,scope.row)">查看详情</el-button>
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
            :total="studentDeliverForm.length"
            align="center"
            background
            style="margin-top: 20px">
          </el-pagination>
        </el-tab-pane>

        <el-tab-pane label="已投递" name="delivered">
          <el-table
            :data="(deliveredInfo.filter(data => !searchInput || data.companyname.toLowerCase().includes(searchInput.toLowerCase()))).slice((currentPage-1)*pagesize,currentPage*pagesize)"
            stripe
            border
            style="width: 100%">
            <el-table-column label="序号" type="index" width="50px"></el-table-column>
            <el-table-column label="单位名称" prop="companyname" width="300px"></el-table-column>
            <el-table-column label="单位地址" prop="companyaddress" width="700px"></el-table-column>
            <el-table-column align="center">
              <template slot="header" >
                <input v-model="searchInput" placeholder="请输入关键字搜索" class="searchInput"/>
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click.native.prevent="seeDeliveredDetails(scope.row)">查看详情</el-button>
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
            :total="deliveredInfo.length"
            align="center"
            background
            style="margin-top: 20px">
          </el-pagination>
        </el-tab-pane>

        <el-tab-pane label="未投递" name="undelivered">
          <el-table
            :data="(undeliveredInfo.filter(data => !searchInput || data.companyname.toLowerCase().includes(searchInput.toLowerCase()))).slice((currentPage-1)*pagesize,currentPage*pagesize)"
            stripe
            border
            style="width: 100%">
            <el-table-column label="序号" type="index" width="50px"></el-table-column>
            <el-table-column label="单位名称" prop="companyname" width="300px"></el-table-column>
            <el-table-column label="单位地址" prop="companyaddress" width="700px"></el-table-column>
            <el-table-column align="center">
              <template slot="header" >
                <input v-model="searchInput" placeholder="请输入关键字搜索" class="searchInput"/>
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click.native.prevent="seeDetails(scope.$index,scope.row)">查看详情</el-button>
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
            :total="undeliveredInfo.length"
            align="center"
            background
            style="margin-top: 20px">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>



        <el-drawer :visible.sync="dialogFormVisible_all" size="100%" direction="ttb" class="recruiterDetails" :with-header="false">
          <el-form :model="details">
            <div class="deliver_head">
              招聘详情
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
            <el-button @click="dialogFormVisible_all = false">关闭</el-button>
            <el-button type="primary" @click="deliver" :disabled="disabledAll">投递简历</el-button>
            <el-button type="primary" plain @click="addChat(details.recruitername)">聊天咨询</el-button>
          </div>
        </el-drawer>

        <el-drawer :visible.sync="dialogFormVisible_delivered" size="100%" direction="ttb" class="recruiterDetails" :with-header="false">
          <el-form :model="details">
            <div class="deliver_head">
              详情
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
            <el-button @click="dialogFormVisible_delivered = false">关闭</el-button>
            <el-button type="success" :disabled="dialogFormVisible_delivered">已投递</el-button>
            <el-button type="primary" plain @click="addChat(details.recruitername)">聊天咨询</el-button>
          </div>
        </el-drawer>
      </div>
    </div>

  </div>
</template>

<script>
  import {axiosRequest} from "../network/request";

  export default {
    name: "StudentDeliver",
    data(){
      return{
        studentDeliverForm:[],
        deliveredInfo:[],
        undeliveredInfo:[],
        studentResume:{
          name: '',
          sex:'',
          birthday: '',
          age:'',
          phone:'',
          address:'',
          number:'',
          email:'',
          profession:'',
          englishcertificate:'',
          calculatorcertificate:'',
          experience: '',
        },
        details:{},
        searchInput:'',
        dialogFormVisible_all :false,
        dialogFormVisible_delivered :false,
        type:'allInfo',
        disabledAll:false,
        disabledDelivered:false,
        currentPage:1,
        pagesize:6,
        currentIndex:0,
      }
    },
    created(){
      this.getStudentDeliverInfo()
      this.getStudentMakeInfo()
    },
    methods:{
      seeDetails(index,info){
        this.currentIndex = index
        this.details= info
        this.dialogFormVisible_all  = true
      },
      seeDeliveredDetails(info){
        this.details= info,
        this.dialogFormVisible_delivered  = true
        this.disabledDelivered = true
      },
      handleSizeChange(size){
        this.pagesize = size
      },
      handleCurrentChange(currentPage){
        this.currentPage = currentPage
      },
      addChat(){
        //添加聊天请求
        // console.log(this.$route.query.username);
        // console.log(this.details.recruitername);
        axiosRequest({
          method:'post',
          url:'/addChat',
          data:{
            studentaccount:this.$route.query.username,
            recruiteraccount:this.details.recruitername
          }
        }).then(successResponse => {
          if (successResponse.data.code == 200){
            this.$confirm('已成功添加'+this.details.recruitername+'，是否马上发起聊天?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$router.replace({path:'studentChat',query:{username:this.$route.query.username}})
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消！'
              })
            })
          }else if (successResponse.data.code == 500){
            this.$router.replace({path:'studentChat',query:{username:this.$route.query.username}})
          }
        })

      },
      deliver(){
        let date = new Date()
        let dateString = date.toLocaleDateString().split('/')
        let dateStr = dateString[0]+'-'+(dateString[1]>=10?dateString[1]:'0'+dateString[1])+'-'+
            (dateString[2]>=10?dateString[2]:'0'+dateString[2])+' '+(date.getHours()>=10?date.getHours():'0'+date.getHours())+':'+
            (date.getMinutes()>=10?date.getMinutes():'0'+date.getMinutes())
        axiosRequest({
          method:'post',
          url:'/deliver',
          data:{
            username: this.$route.query.username,
            recruitername:this.details.recruitername,
            status:'false',
            delivertime:dateStr,
            islooked:'false',
            passtime:''
          }
        }).then(successResponse => {
          // console.log(successResponse);
          if (successResponse.data.code == 200){
            this.$message({
              type: 'success',
              message: '投递成功!'
            })
            this.undeliveredInfo.splice(this.currentIndex,1)
            this.dialogFormVisible_all = false
          }else if (successResponse.data.code == 500){
            this.$message.error('您已投递过该公司，请勿重复投递！')
            this.dialogFormVisible_all = false
          }
        }).catch(failResponse => {
          console.log(failResponse)
          this.$message.error('出错啦！请稍后再试！')
          this.dialogFormVisible_all = false
        })
      },
      handleClick(tab){
        if (tab.name == 'delivered'){
          axiosRequest({
            method: 'get',
            url: 'deliveredCompanyInfo',
            params:{
              username:this.$route.query.username
            }
          }).then(successResponse => {
            // console.log(successResponse.data.deliveredCompanyList);
            if (successResponse.data.code == 200){
              this.deliveredInfo = successResponse.data.deliveredCompanyList
            }
          })
        }else if (tab.name == 'undelivered'){
          axiosRequest({
            method: 'get',
            url: 'undeliveredCompanyInfo',
            params:{
              username:this.$route.query.username,
              isreviewed: 'true'
            }
          }).then(successResponse => {
            // console.log(successResponse);
            if (successResponse.data.code == 200){
              this.undeliveredInfo = successResponse.data.companyList
            }else if (successResponse.data.code == 500){
              this.undeliveredInfo = successResponse.data.companyList
            }
          })
        }
      },
      getStudentDeliverInfo(){
        axiosRequest({
          method:'get',
          url:'/companyInfo',
          params:{
            isreviewed: 'true'
          }
        }).then(successResponse => {
          if (successResponse.data.code == 200){
            this.studentDeliverForm = successResponse.data.companyList
          }
        })
      },
      getStudentMakeInfo(){
        axiosRequest({
          method: 'get',
          url: '/studentMakeInfo',
          params:{
            username: this.$route.query.username
          }
        }).then(successResponse => {
          if (successResponse.data.code == 200){
            this.studentResume.name = successResponse.data.studentMakeInfo.name,
                this.studentResume.sex = successResponse.data.studentMakeInfo.sex,
                this.studentResume.birthday = successResponse.data.studentMakeInfo.birthday,
                this.studentResume.age = successResponse.data.studentMakeInfo.age,
                this.studentResume.phone = successResponse.data.studentMakeInfo.phone,
                this.studentResume.address = successResponse.data.studentMakeInfo.address,
                this.studentResume.number = successResponse.data.studentMakeInfo.number,
                this.studentResume.email = successResponse.data.studentMakeInfo.email,
                this.studentResume.profession = successResponse.data.studentMakeInfo.profession,
                this.studentResume.englishcertificate = successResponse.data.studentMakeInfo.englishcertificate,
                this.studentResume.calculatorcertificate = successResponse.data.studentMakeInfo.calculatorcertificate,
                this.studentResume.experience = successResponse.data.studentMakeInfo.experience
          }else if (successResponse.data.code == 500){
            this.$confirm('尚未完成简历，是否前往填写?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$router.replace({path:'studentMake',query:{username:this.$route.query.username}})
            }).catch(() => {
              this.$router.replace({path:'studentRecruit',query:{username:this.$route.query.username}})
            })
          }
        })
      },
    }
  }
</script>

<style scoped>
  .studentDeliver{
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }

  .deliverContainer{
    width: 1300px;
    margin-top: 6%;
    margin-bottom: 2%;
    box-shadow: 0 0 25px #cac6c6;
  }

  .deliver_head{
    display: flex;
    flex-direction:column;
    align-items: center;
    font-size: 100px;
    color: #909399;
    background-color: rgba(209,223,250,1);
  }

  .deliver_body{
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

  .recruiterDetails{
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
