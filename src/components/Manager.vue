<template>
  <div>
    <div class="tabbar">
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1" @click="manageRecruitmentClick">招聘信息管理</el-menu-item>
        <el-menu-item index="2" @click="manageUserClick">用户账号管理</el-menu-item>

        <el-menu-item class="user_option">
          <el-dropdown trigger="click">
            <el-avatar>{{this.$route.query.username}}</el-avatar>
            <el-dropdown-menu>
              <div @click="changePassword">
                <el-dropdown-item>修改密码</el-dropdown-item>
              </div>
              <div @click="exitClick">
                <el-dropdown-item>退出登录</el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </div>
    <el-dialog title="密码修改" width="450px" :visible.sync="dialogFormVisible" :show-close="false">
      <el-form ref="form" :model="changePasswordForm" :rules="rules" status-icon label-width="80px">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input type="password" v-model="changePasswordForm.oldPassword" auto-complete="false"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="changePasswordForm.newPassword" auto-complete="false"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkNewPassword">
          <el-input type="password" v-model="changePasswordForm.checkNewPassword" auto-complete="false"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelChange('form')">取 消</el-button>
        <el-button type="primary" @click="confirmChange('form')" :disabled="isCompleted">确 定</el-button>
      </div>
    </el-dialog>
    <router-view></router-view>
  </div>
</template>

<script>
  import {axiosRequest} from "../network/request";

  export default {
    name: "Manager",
    data(){
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.changePasswordForm.checkNewPassword !== '') {
            this.$refs.form.validateField('checkNewPassword');
          }
          callback();
        }
      }
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.changePasswordForm.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
      return{
        username:this.$route.query.username,
        changePasswordForm:{
          oldPassword:'',
          newPassword:'',
          checkNewPassword:''
        },
        rules:{
          oldPassword: [
            {
              required:true,
              message:'请输入原密码',
              trigger:'blur'
            }
          ],
          newPassword: [
            {
              required:true,
              validator: validatePass,
              trigger: 'blur'
            }
          ],
          checkNewPassword: [
            {
              required:true,
              validator: validatePass2,
              trigger: 'blur'
            }
          ]
        },
        dialogFormVisible:false,
      }
    },
    created() {

    },
    computed:{
      isCompleted(){
        return !this.changePasswordForm.oldPassword || !this.changePasswordForm.newPassword || !this.changePasswordForm.checkNewPassword
            || (this.changePasswordForm.newPassword !== this.changePasswordForm.checkNewPassword)
      }
    },
    methods:{
      manageRecruitmentClick(){
        this.$router.replace({path:'managerRecruitment',query:{username:this.username}})
      },
      manageUserClick(){
        this.$router.replace({path:'managerUser',query:{username:this.username}})
      },
      changePassword(){
        this.dialogFormVisible = true
      },
      exitClick(){
        this.$router.replace({path:'/login'})
      },
      cancelChange(form){
        this.$refs[form].resetFields()
        this.dialogFormVisible = false
        this.$message({
          type: 'info',
          message: '已取消修改'
        })
      },
      confirmChange(form){
        this.$confirm('是否确认修改密码?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axiosRequest({
            method:'post',
            url:'/changePassword',
            data:{
              username: this.$route.query.username,
              oldPassword:this.changePasswordForm.oldPassword,
              newPassword:this.changePasswordForm.newPassword,
            }
          }).then(successResponse => {
            if (successResponse.data.code == 200){
              this.$message({
                type: 'success',
                message: '修改成功! 请重新登录！'
              })
              this.$refs[form].resetFields()
              this.dialogFormVisible = false
              this.$router.replace({path:'/login'})
            }else if (successResponse.data.code == 500){
              this.$message({
                type: 'error',
                message: '原密码错误，请重新输入!'
              })
              this.$refs[form].resetFields()
            }
          }).catch(failResponse => {
            console.log(failResponse)
          })
        }).catch(() => {
          this.$refs[form].resetFields()
          this.dialogFormVisible = false
          this.$message({
            type: 'info',
            message: '已取消修改'
          })
        })
      }
    }
  }
</script>

<style scoped>
  .tabbar{
    position: fixed;
    z-index: 99;
    margin-top: 10px;
    width: 100%;
    box-shadow: 0 0 25px #cac6c6;
  }

  .el-menu-demo{
    position: relative;
  }

  .user_option{
    position: absolute;
    right: 0px;
    cursor:pointer;
  }

</style>
