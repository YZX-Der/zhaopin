<template>
  <div class="studentMake">
    <div class="resumeContainer">
      <div class="resume_head">
        简历录入
      </div>
      <div class="resume_body">

        <el-form ref="form" :model="studentMakeForm" :rules="rules" label-width="180px" class="formStyle">

          <el-row >
            <el-col :span="12">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="studentMakeForm.name" :readonly ="studentMakeForm.isCompleted"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别">
                <el-radio v-model="studentMakeForm.sex" label="男" :disabled="studentMakeForm.isCompleted">男</el-radio>
                <el-radio v-model="studentMakeForm.sex" label="女" :disabled="studentMakeForm.isCompleted">女</el-radio>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="出生日期">
                <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="studentMakeForm.birthday" @input="birthdayChange" style="width: 60%;" :readonly="studentMakeForm.isCompleted"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="年龄" prop="age">
                <el-input v-model="studentMakeForm.age" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row >
            <el-col :span="12">
              <el-form-item label="手机号码" prop="phone">
                <el-input v-model="studentMakeForm.phone" :readonly="studentMakeForm.isCompleted"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="家庭地址" prop="address">
                <el-input v-model="studentMakeForm.address" :readonly="studentMakeForm.isCompleted"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row >
            <el-col :span="12">
              <el-form-item label="QQ号" prop="number">
                <el-input v-model="studentMakeForm.number" :readonly="studentMakeForm.isCompleted"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="studentMakeForm.email" :readonly="studentMakeForm.isCompleted"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="专业" prop="profession">
                <el-input v-model="studentMakeForm.profession" :readonly="studentMakeForm.isCompleted"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row >
            <el-col :span="9">
              <el-form-item label="英语证书">
                <el-radio v-model="studentMakeForm.englishcertificate" label="无" :disabled="studentMakeForm.isCompleted">无</el-radio>
                <el-radio v-model="studentMakeForm.englishcertificate" label="英语四级" :disabled="studentMakeForm.isCompleted">英语四级</el-radio>
                <el-radio v-model="studentMakeForm.englishcertificate" label="英语六级" :disabled="studentMakeForm.isCompleted">英语六级</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="15">
              <el-form-item label="计算机证书">
                <el-radio v-model="studentMakeForm.calculatorcertificate" label="无" :disabled="studentMakeForm.isCompleted">无</el-radio>
                <el-radio v-model="studentMakeForm.calculatorcertificate" label="计算机二级" :disabled="studentMakeForm.isCompleted">计算机二级</el-radio>
                <el-radio v-model="studentMakeForm.calculatorcertificate" label="计算机三级" :disabled="studentMakeForm.isCompleted">计算机三级</el-radio>
                <el-radio v-model="studentMakeForm.calculatorcertificate" label="计算机四级" :disabled="studentMakeForm.isCompleted">计算机四级</el-radio>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="20">
              <el-form-item label="个人经历" prop="experience">
                <el-input type="textarea" :autosize="{ minRows: 5}" v-model="studentMakeForm.experience" :readonly="studentMakeForm.isCompleted"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item style="margin-left: 27%">
            <el-button type="primary" @click="submit" :disabled="studentMakeForm.isCompleted">完成简历</el-button>
            <el-button type="info" @click="revise">修改简历</el-button>
          </el-form-item>
        </el-form>

      </div>
    </div>

  </div>
</template>

<script>
  import {axiosRequest} from "../network/request";

  export default {
    name: "StudentMake",
    data(){
      return {
        studentMakeForm: {
          name: '',
          sex:'男',
          birthday: '',
          age:'',
          phone:'',
          address:'',
          number:'',
          email:'',
          profession:'',
          englishcertificate:'无',
          calculatorcertificate:'无',
          experience: '',
          isCompleted:false
        },
        rules:{
          name: [
            {
              required:true,
              message:'姓名不能为空',
              trigger:'blur'
            },
            {
              min:2,
              max:4,
              message: '长度为2-4个汉字'
            },
            {
              pattern: /^[\u4E00-\u9FA5]+$/,
              message: '姓名只能为中文'
            }
          ],
          birthday:[
            {
              required:true,
              message:'出生日期不能为空',
              trigger:'blur'
            }
          ],
          age: [
            {
              pattern:/^(?:[1-9][0-9]?|1[01][0-9]|120)$/,
              message:'年龄范围为1-120岁'
            }
          ],
          phone: [
            {
              required:true,
              message:'手机号码不能为空',
              trigger:'blur'
            },
            {
              pattern:/^1[3456789]\d{9}$/,
              message: '联系方式为以1开头的11位数字'
            }
          ],
          address: [
            {
              required:true,
              message:'地址不能为空',
              trigger:'blur'
            }
          ],
          number:[
            {
              pattern:/^[1-9][0-9]{4,11}$/,
              message:'请输入正确QQ号码'
            }
          ],
          email: [
            {
              required:true,
              message:'邮箱不能为空',
              trigger:'blur'
            },
            {
              pattern:/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
              message:'邮箱不正确'
            }
          ],
          profession:[
            {
              required:true,
              message:'专业名称不能为空',
              trigger:'blur'
            }
          ]
        }
      }
    },
    created(){
      this.getStudentMakeInfo()
    },
    methods: {
      birthdayChange(){
        this.studentMakeForm.age = new Date().getFullYear() - this.studentMakeForm.birthday.split('-')[0]
            - (new Date().getMonth() < this.studentMakeForm.birthday.split('-')[1] ||
            (new Date().getMonth() == this.studentMakeForm.birthday.split('-')[2] &&
                new Date().getDate() < this.studentMakeForm.birthday.split('-')[2]) ? 1 : 0)
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
            this.studentMakeForm.name = successResponse.data.studentMakeInfo.name,
            this.studentMakeForm.sex = successResponse.data.studentMakeInfo.sex,
            this.studentMakeForm.birthday = successResponse.data.studentMakeInfo.birthday,
            this.studentMakeForm.age = successResponse.data.studentMakeInfo.age,
            this.studentMakeForm.phone = successResponse.data.studentMakeInfo.phone,
            this.studentMakeForm.address = successResponse.data.studentMakeInfo.address,
            this.studentMakeForm.number = successResponse.data.studentMakeInfo.number,
            this.studentMakeForm.email = successResponse.data.studentMakeInfo.email,
            this.studentMakeForm.profession = successResponse.data.studentMakeInfo.profession,
            this.studentMakeForm.englishcertificate = successResponse.data.studentMakeInfo.englishcertificate,
            this.studentMakeForm.calculatorcertificate = successResponse.data.studentMakeInfo.calculatorcertificate,
            this.studentMakeForm.experience = successResponse.data.studentMakeInfo.experience,
            this.studentMakeForm.isCompleted = true
          }else if (successResponse.data.code == 500){
            this.studentMakeForm.isCompleted = false
          }
        })
      },
      submit() {
        // console.log(this.studentMakeForm.englishCertificate);
        // console.log(this.studentMakeForm.birthday);
        this.$confirm('是否保存简历?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // console.log(this.studentMakeForm);
          //这里发送axios请求
          axiosRequest({
            method:'post',
            url:'/studentMake',
            data:{
              username: this.$route.query.username,
              name: this.studentMakeForm.name,
              sex: this.studentMakeForm.sex,
              birthday: this.studentMakeForm.birthday,
              age: this.studentMakeForm.age,
              phone: this.studentMakeForm.phone,
              address: this.studentMakeForm.address,
              number: this.studentMakeForm.number,
              email: this.studentMakeForm.email,
              profession: this.studentMakeForm.profession,
              englishcertificate: this.studentMakeForm.englishcertificate,
              calculatorcertificate: this.studentMakeForm.calculatorcertificate,
              // certificate: this.studentMakeForm.certificate,
              experience: this.studentMakeForm.experience,
            }
          }).then(successResponse => {
            if (successResponse.data.code == 200){
              this.$message({
                type: 'success',
                message: '保存成功!'
              })
              this.studentMakeForm.isCompleted = true
            }else if (successResponse.data.code == 202){
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
              this.studentMakeForm.isCompleted = true
            }
          }).catch(failResponse => {
            console.log(failResponse);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消保存'
          });
          this.studentMakeForm.isCompleted = false
        })

      },
      revise(){
        this.studentMakeForm.isCompleted = false
      }
    }
  }
</script>

<style scoped>
  .studentMake{
    display: flex;
    flex-direction:column;
    align-items: center;
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
    background-color: rgba(209,223,250,1);
  }

  .resume_body{
    display: flex;
    flex-direction:column;
  }

  .formStyle{
    margin: 20px;
  }

  .el-input{
    width: 60%;
  }



</style>
