<template>
  <div class="enterpriseSubmitRecruit">

    <div class="recruitContainer">
      <div class="recruit_head">
        招聘信息录入
      </div>
      <div class="recruit_body">

        <el-form ref="form" :model="enterpriseSubmitRecruitForm" :rules="rules" label-width="180px" class="formStyle">

          <el-row >
            <el-col :span="12">
              <el-form-item label="单位名称" prop="companyname">
                <el-input v-model="enterpriseSubmitRecruitForm.companyname" :readonly ="enterpriseSubmitRecruitForm.isCompleted"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位地址" prop="companyaddress">
                <el-input v-model="enterpriseSubmitRecruitForm.companyaddress" :readonly ="enterpriseSubmitRecruitForm.isCompleted"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="宣讲时间" prop="presentationtime">
                <el-date-picker type="datetime" placeholder="选择日期" format="yyyy年MM月dd日   HH:mm" value-format="yyyy-MM-dd HH:mm" v-model="enterpriseSubmitRecruitForm.presentationtime" style="width: 77%;" :readonly="enterpriseSubmitRecruitForm.isCompleted"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="宣讲地点" prop="presentationaddress">
                <el-input v-model="enterpriseSubmitRecruitForm.presentationaddress" :readonly="enterpriseSubmitRecruitForm.isCompleted"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row >
            <el-col :span="12">
              <el-form-item label="招聘类型" prop="recruitmenttype">
                <el-select v-model="enterpriseSubmitRecruitForm.recruitmenttype" style="width: 77%;" clearable placeholder="请选择招聘类型" :disabled="enterpriseSubmitRecruitForm.isCompleted">
                  <el-option label="社招" value="社招"></el-option>
                  <el-option label="校招" value="校招"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="招聘对象" prop="recruitmentobject">
                <el-select v-model="enterpriseSubmitRecruitForm.recruitmentobject" style="width: 77%;" clearable placeholder="请选择招聘对象" :disabled="enterpriseSubmitRecruitForm.isCompleted">
                  <el-option label="应届生" value="应届生"></el-option>
                  <el-option label="毕业生" value="毕业生"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row >
            <el-col :span="12">
              <el-form-item label="招聘院系" prop="recruitingdepartment">
                <el-input v-model="enterpriseSubmitRecruitForm.recruitingdepartment" :readonly="enterpriseSubmitRecruitForm.isCompleted"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="招聘专业" prop="recruitingprofession">
                <el-input v-model="enterpriseSubmitRecruitForm.recruitingprofession" :readonly="enterpriseSubmitRecruitForm.isCompleted"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="招聘职位" prop="recruitingposition">
                <el-input v-model="enterpriseSubmitRecruitForm.recruitingposition" :readonly="enterpriseSubmitRecruitForm.isCompleted"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="计划人数" prop="plannumber">
                <el-input v-model="enterpriseSubmitRecruitForm.plannumber" :readonly="enterpriseSubmitRecruitForm.isCompleted"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="22">
              <el-form-item label="相关介绍" prop="introduction">
                <el-input type="textarea" :autosize="{ minRows: 5}" v-model="enterpriseSubmitRecruitForm.introduction" :readonly="enterpriseSubmitRecruitForm.isCompleted"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item style="margin-left: 27%">
            <el-button type="primary" @click="submit" :disabled="enterpriseSubmitRecruitForm.isCompleted">完成录入</el-button>
            <el-button type="info" @click="revise">修改信息</el-button>
          </el-form-item>
        </el-form>

      </div>
    </div>

  </div>
</template>

<script>
  import {axiosRequest} from "../network/request"

  export default {
    name: "EnterpriseSubmitRecruit",
    data(){
      return{
        enterpriseSubmitRecruitForm:{
          companyname: '',
          companyaddress:'',
          presentationtime: '',
          presentationaddress:'',
          recruitmenttype:'',
          recruitmentobject:'',
          recruitingdepartment:'',
          recruitingprofession:'',
          recruitingposition:'',
          plannumber:'',
          introduction:'',
          isCompleted:false
        },
        rules:{
          companyname: [
            {
              required:true,
              message:'单位名不能为空',
              trigger:'blur'
            }
          ],
          companyaddress: [
            {
              required:true,
              message:'单位地址不能为空',
              trigger:'blur'
            }
          ],
          presentationtime: [
            {
              required:true,
              message:'宣讲时间不能为空',
              trigger:'blur'
            }
          ],
          presentationaddress: [
            {
              required:true,
              message:'宣讲地点不能为空',
              trigger:'blur'
            }
          ],
          recruitmenttype:[
            {
              required:true,
              message:'招聘类型不能为空',
              trigger:'blur'
            }
          ],
          recruitmentobject: [
            {
              required:true,
              message:'招聘对象不能为空',
              trigger:'blur'
            }
          ],
          recruitingdepartment:[
            {
              required:true,
              message:'招聘院系不能为空',
              trigger:'blur'
            }
          ],
          recruitingprofession:[
            {
              required:true,
              message:'招聘专业不能为空',
              trigger:'blur'
            }
          ],
          recruitingposition: [
            {
              required:true,
              message:'招聘职位不能为空',
              trigger:'blur'
            }
          ],
          plannumber:[
            {
              required:true,
              message:'计划人数不能为空',
              trigger:'blur'
            },
            {
              pattern:/^[1-9]\d*$/,
              message:'请录入正确计划人数'
            }
          ]
        }
      }
    },
    created(){
      this.getEnterpriseSubmitRecruitInfo()
    },
    methods:{
      getEnterpriseSubmitRecruitInfo(){
        axiosRequest({
          method: 'get',
          url: '/enterpriseSubmitRecruitInfo',
          params: {
            recruitername: this.$route.query.username
          }
        }).then(successResponse =>{
          if (successResponse.data.code == 200){
            this.enterpriseSubmitRecruitForm.companyname = successResponse.data.companyInfo.companyname,
            this.enterpriseSubmitRecruitForm.companyaddress = successResponse.data.companyInfo.companyaddress,
            this.enterpriseSubmitRecruitForm.presentationtime = successResponse.data.companyInfo.presentationtime,
            this.enterpriseSubmitRecruitForm.presentationaddress = successResponse.data.companyInfo.presentationaddress,
            this.enterpriseSubmitRecruitForm.recruitmenttype = successResponse.data.companyInfo.recruitmenttype,
            this.enterpriseSubmitRecruitForm.recruitmentobject = successResponse.data.companyInfo.recruitmentobject,
            this.enterpriseSubmitRecruitForm.recruitingdepartment = successResponse.data.companyInfo.recruitingdepartment,
            this.enterpriseSubmitRecruitForm.recruitingprofession = successResponse.data.companyInfo.recruitingprofession,
            this.enterpriseSubmitRecruitForm.recruitingposition = successResponse.data.companyInfo.recruitingposition,
            this.enterpriseSubmitRecruitForm.plannumber = successResponse.data.companyInfo.plannumber,
            this.enterpriseSubmitRecruitForm.introduction = successResponse.data.companyInfo.introduction,
            this.enterpriseSubmitRecruitForm.isCompleted = true
          }else if (successResponse.data.code == 500){
            this.enterpriseSubmitRecruitForm.isCompleted = false
          }
        })
      },
      submit() {
        // console.log(this.studentMakeForm.englishCertificate);
        this.$confirm('是否保存信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // console.log(this.enterpriseSubmitRecruitForm);
          //这里发送axios请求
          // eslint-disable-next-line no-undef
          let date = new Date()
          let dateString = date.toLocaleDateString().split('/')
          let dateStr = dateString[0]+'-'+(dateString[1]>=10?dateString[1]:'0'+dateString[1])+'-'+
              (dateString[2]>=10?dateString[2]:'0'+dateString[2])+' '+(date.getHours()>=10?date.getHours():'0'+date.getHours())+':'+
              (date.getMinutes()>=10?date.getMinutes():'0'+date.getMinutes())
          axiosRequest({
            method:'post',
            url:'/enterpriseSubmitRecruit',
            data:{
              recruitername:this.$route.query.username,
              companyname: this.enterpriseSubmitRecruitForm.companyname,
              companyaddress: this.enterpriseSubmitRecruitForm.companyaddress,
              presentationtime: this.enterpriseSubmitRecruitForm.presentationtime,
              presentationaddress: this.enterpriseSubmitRecruitForm.presentationaddress,
              recruitmenttype: this.enterpriseSubmitRecruitForm.recruitmenttype,
              recruitmentobject: this.enterpriseSubmitRecruitForm.recruitmentobject,
              recruitingdepartment: this.enterpriseSubmitRecruitForm.recruitingdepartment,
              recruitingprofession: this.enterpriseSubmitRecruitForm.recruitingprofession,
              recruitingposition: this.enterpriseSubmitRecruitForm.recruitingposition,
              plannumber: this.enterpriseSubmitRecruitForm.plannumber,
              introduction: this.enterpriseSubmitRecruitForm.introduction,
              isreviewed:'false',
              applytime:dateStr
            }
          }).then(successResponse => {
            if (successResponse.data.code == 200){
              this.$message({
                type: 'success',
                message: '保存成功!'
              })
              this.enterpriseSubmitRecruitForm.isCompleted = true
            }else if (successResponse.data.code == 202){
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
              this.enterpriseSubmitRecruitForm.isCompleted = true
            }
          }).catch(failResponse => {
            console.log(failResponse);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消保存'
          });
          this.enterpriseSubmitRecruitForm.isCompleted = false
        });

      },
      revise(){
        this.enterpriseSubmitRecruitForm.isCompleted = false
      }
    }
  }
</script>

<style scoped>
  .enterpriseSubmitRecruit{
    display: flex;
    flex-direction:column;
    align-items: center;
  }

  .recruitContainer{
    width: 1300px;
    margin-top: 6%;
    margin-bottom: 2%;
    box-shadow: 0 0 25px #cac6c6;
  }

  .recruit_head{
    display: flex;
    flex-direction:column;
    align-items: center;
    font-size: 100px;
    color: #909399;
    background-color: rgba(255,198,128,1);
  }

  .recruit_body{
    display: flex;
    flex-direction:column;
  }

  .formStyle{
    margin: 20px;
  }

  .el-input{
    width: 77%;
  }

</style>
