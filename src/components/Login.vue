<template>
  <div class="login">
    <div class="login_title">
      校园招聘平台
    </div>
    <div class="login_container">
      <div class="login_container_content">
        <el-form ref="form" :model="loginForm" :rules="rules" @keyup.enter.native="loginClick('form')">
          <el-form-item prop="username" label="用户名" class="item">
            <el-input placeholder="请输入用户名" v-model="loginForm.username" clearable></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input placeholder="请输入密码" v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item class="login_btn">
            <el-button type="primary" @click="loginClick('form')" :disabled="isCompleted">登陆</el-button>
            <el-button type="info" @click="resetClick('form')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {axiosRequest} from "../network/request";

  export default {
    name: "Login",
    data(){
      return{
        loginForm:{
          username:'',
          password:'',
        },
        rules:{
          username:[
            {
              required:true,
              message:'请输入用户名',
              trigger:'blur'
            }
          ],
          password:[
            {
              required:true,
              message:'未输入密码',
              trigger:'blur'
            }
          ]
        }
      }
    },
    computed:{
      isCompleted(){
        return !this.loginForm.username || !this.loginForm.password
      }
    },
    methods:{
      loginClick(form){
        axiosRequest({
          method:'post',
          url:'/login',
          data:{
            username: this.loginForm.username,
            password: this.loginForm.password
          }
        }).then(successResponse => {
          // console.log(successResponse)
          if (successResponse.data.code == 500){
            this.$refs[form].resetFields()
            this.$message({
              showClose: true,
              message: '用户名不存在，请重新输入！',
              type: 'error'
            })
          }else if (successResponse.data.code == 200 && successResponse.data.status == 'true') {
            this.$store.commit('login',this.loginForm)
            if (successResponse.data.type == 's'){
              this.$router.replace({path: '/student/studentRecruit',query:{username: this.loginForm.username}})
            } else if (successResponse.data.type == 'm'){
              this.$router.replace({path: '/manager/managerRecruitment',query:{username: this.loginForm.username}})
            } else if (successResponse.data.type == 'e'){
              this.$router.replace({path: '/enterprise/enterpriseGetResume',query:{username: this.loginForm.username}})
            }
            // const path = this.$route.query.redirect
            // this.$router.push({path: path === '/' || path === undefined ? '/student' : path,query:{username: this.loginForm.username}})

            // this.$router.push({path: '/student',query:{username: this.loginForm.username}})
            this.$message({
              message: '登陆成功',
              type: 'success'
            })
          } else if (successResponse.data.code == 200 && successResponse.data.status == 'false'){
            this.$message({
              showClose: true,
              message: '当前用户已被禁用，请联系管理员！',
              type: 'error'
            })
            this.$refs[form].resetFields()
          } else {
            this.$refs[form].resetFields()
            this.$message({
              showClose: true,
              message: '用户名或密码错误,请重新输入',
              type: 'error'
            })
          }
        }).catch(failResponse => {
          console.log(failResponse);
        })
      },
      resetClick(form){
        this.$refs[form].resetFields();
      }
    }
  }
</script>

<style scoped>
  .login{
    background: url("../assets/img/login.jpg") no-repeat;
    height: 100%;
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction:column
  }

  .login_container{
    width: 500px;
    height: 50%;
    border-radius: 50px;
    background:rgba(255,255,255,0.3);
    /*border: 2px solid #eaeaea;*/
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title{
    margin-top: -6%;
    width: 100%;
    height: 25%;
    border-radius: 10px 10px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 100px;
    color: #cac6c6;
  }

  .login_container_content{
    width: 100%;
    height: 100%;
    display: flex;
    border-radius: 0 0 10px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login_btn{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item{
    color: red;
  }

  .el-input{
    width: 300px;
  }

</style>
