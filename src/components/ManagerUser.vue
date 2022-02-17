<template>
  <div class="managerUser">

    <div class="userContainer">

      <div class="user_head">
        用户管理
      </div>

      <div class="user_body">

        <el-tabs v-model="type" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="学生用户" name="studentUser">
            <el-table
              :data="(studentUserList.filter(data => !searchInput || data.username.toLowerCase().includes(searchInput.toLowerCase()))).slice((currentPage-1)*pagesize,currentPage*pagesize)"
              stripe
              border
              style="width: 100%"
              :default-sort = "{prop: 'username', order: 'ascending'}">
              <el-table-column label="序号" type="index" width="100px"></el-table-column>
              <el-table-column label="用户名" prop="username" sortable width="300px"></el-table-column>
              <el-table-column label="用户密码" prop="password" width="500px"></el-table-column>
              <el-table-column align="center">
                <template slot="header" >
                  <input v-model="searchInput" placeholder="请输入关键字搜索用户" class="searchInput"/>
                  <el-button
                    size="middle"
                    type="primary"
                    @click="addStudentUser">添加学生用户</el-button>
                </template>
                <template slot-scope="scope">
                  <el-switch
                    v-model="studentUserList[scope.$index].status"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-text="已启用"
                    inactive-text="已禁用"
                    active-value="true"
                    inactive-value="false"
                    @change="changeStatus(scope.row)">
                  </el-switch>
                  <el-button
                    size="medium"
                    type="danger"
                    class="btnStyle"
                    @click="deleteStudentUser(scope.$index, scope.row)">删除</el-button>
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
              :total="studentUserList.length"
              align="center"
              background
              style="margin-top: 20px">
            </el-pagination>
          </el-tab-pane>

          <el-tab-pane label="企业用户" name="enterpriseUser">
            <el-table
              :data="(enterpriseUserList.filter(data => !searchInput || data.username.toLowerCase().includes(searchInput.toLowerCase()))).slice((currentPage-1)*pagesize,currentPage*pagesize)"
              stripe
              border
              style="width: 100%"
              :default-sort = "{prop: 'applytime', order: 'ascending'}">
              <el-table-column label="序号" type="index" width="100px"></el-table-column>
              <el-table-column label="用户名" prop="username" sortable width="300px"></el-table-column>
              <el-table-column label="用户密码" prop="password" width="500px"></el-table-column>
              <el-table-column align="center">
                <template slot="header" >
                  <input v-model="searchInput" placeholder="请输入关键字搜索用户" class="searchInput"/>
                  <el-button
                    size="middle"
                    type="primary"
                    @click="addEnterpriseUser">添加企业用户</el-button>
                </template>
                <template slot-scope="scope">
                  <el-switch
                    v-model="enterpriseUserList[scope.$index].status"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-text="已启用"
                    inactive-text="已禁用"
                    active-value="true"
                    inactive-value="false"
                    @change="changeStatus(scope.row)">
                  </el-switch>
                  <el-button
                    size="medium"
                    type="danger"
                    class="btnStyle"
                    @click="deleteEnterpriseUser(scope.$index, scope.row)">删除</el-button>
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
              :total="enterpriseUserList.length"
              align="center"
              background
              style="margin-top: 20px">
            </el-pagination>
          </el-tab-pane>
        </el-tabs>

        <el-dialog title="添加学生用户" width="450px" :visible.sync="dialogFormVisible_student" :show-close="false">
          <el-form ref="form" :model="addStudentUserForm" :rules="rules" status-icon label-width="80px">
            <el-form-item label="用户名" prop="username">
              <el-input type="text" v-model="addStudentUserForm.username" auto-complete="false"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="addStudentUserForm.password" placeholder="不设置则密码默认为“123456”" auto-complete="false"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-switch
                v-model="addStudentUserForm.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="启用"
                inactive-text="禁用"
                active-value="true"
                inactive-value="false">
              </el-switch>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelAddStudent('form')">取 消</el-button>
            <el-button type="primary" @click="confirmAddStudent('form')" :disabled="isCompletedStudent">添 加</el-button>
          </div>
        </el-dialog>

        <el-dialog title="添加企业用户" width="450px" :visible.sync="dialogFormVisible_enterprise" :show-close="false">
          <el-form ref="form" :model="addEnterpriseUserForm" :rules="rules" status-icon label-width="80px">
            <el-form-item label="用户名" prop="username">
              <el-input type="text" v-model="addEnterpriseUserForm.username" auto-complete="false"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="addEnterpriseUserForm.password" placeholder="不设置则密码默认为“123456”" auto-complete="false"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-switch
                v-model="addEnterpriseUserForm.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="启用"
                inactive-text="禁用"
                active-value="true"
                inactive-value="false">
              </el-switch>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelAddEnterprise('form')">取 消</el-button>
            <el-button type="primary" @click="confirmAddEnterprise('form')" :disabled="isCompletedEnterprise">添 加</el-button>
          </div>
        </el-dialog>

      </div>

    </div>

  </div>
</template>

<script>
  import {axiosRequest} from "../network/request";

  export default {
    name: "ManagerUser",
    data(){
      return{
        studentUserList:[],
        enterpriseUserList:[],
        addStudentUserForm:{
          username:'',
          password:'',
          status: 'true'
        },
        addEnterpriseUserForm:{
          username:'',
          password:'',
          status: 'true'
        },
        searchInput:'',
        type:'studentUser',
        currentPage:1,
        pagesize:6,
        dialogFormVisible_student:false,
        dialogFormVisible_enterprise:false,
        rules:{
          username:[
            {
              required:true,
              message:'请填写用户名',
              trigger:'blur'
            }
          ]
        }
      }
    },
    created(){
      this.getStudentUser()
    },
    computed:{
      isCompletedStudent(){
        return !this.addStudentUserForm.username
      },
      isCompletedEnterprise(){
        return !this.addEnterpriseUserForm.username
      },
      dealStudentUserPassword(){
        return this.addStudentUserForm.password == '' ? '123456' : this.addStudentUserForm.password
      },
      dealEnterpriseUserPassword(){
        return this.addEnterpriseUserForm.password == '' ? '123456' : this.addEnterpriseUserForm.password
      }
    },
    methods:{
      handleSizeChange(size){
        this.pagesize = size
      },
      handleCurrentChange(currentPage){
        this.currentPage = currentPage
      },
      changeStatus(row){
        axiosRequest({
          method: 'post',
          url: '/changeUserStatus',
          data:{
            username:row.username,
            status:row.status
          }
        }).then(successResponse => {
          if (successResponse.data.code == 200){
            this.$message({
              type: 'success',
              message: '设置成功!'
            })
          }
        }).catch(failResponse => {
          console.log(failResponse);
          this.$message({
            type: 'error',
            message: '出错啦，请重试!'
          })
        })
      },
      addStudentUser(){
        this.dialogFormVisible_student = true
      },
      addEnterpriseUser(){
        this.dialogFormVisible_enterprise = true
      },
      cancelAddStudent(form){
        this.$refs[form].resetFields()
        this.dialogFormVisible_student = false
        this.$message({
          type: 'info',
          message: '已取消添加'
        })
      },
      cancelAddEnterprise(form){
        this.$refs[form].resetFields()
        this.dialogFormVisible_enterprise = false
        this.$message({
          type: 'info',
          message: '已取消添加'
        })
      },
      confirmAddStudent(form){
        // console.log(this.addStudentUserForm);
        axiosRequest({
          method:'post',
          url:'/addStudentUser',
          data:{
            username:this.addStudentUserForm.username,
            password:this.dealStudentUserPassword,
            type:'s',
            status:this.addStudentUserForm.status
          }
        }).then(successResponse => {
          if (successResponse.data.code == 200){
            this.$refs[form].resetFields()
            this.dialogFormVisible_student = false
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
          } else if (successResponse.data.code == 500){
            this.$refs[form].resetFields()
            this.dialogFormVisible_student = false
            this.$message({
              type: 'error',
              message: '该用户已存在，请勿重复添加！'
            })
          }
        })
      },
      confirmAddEnterprise(form){
        axiosRequest({
          method:'post',
          url:'/addEnterpriseUser',
          data:{
            username:this.addEnterpriseUserForm.username,
            password:this.dealEnterpriseUserPassword,
            type:'e',
            status:this.addEnterpriseUserForm.status
          }
        }).then(successResponse => {
          if (successResponse.data.code == 200){
            this.$refs[form].resetFields()
            this.dialogFormVisible_enterprise = false
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
          } else if (successResponse.data.code == 500){
            this.$refs[form].resetFields()
            this.dialogFormVisible_enterprise = false
            this.$message({
              type: 'error',
              message: '该用户已存在，请勿重复添加！'
            })
          }
        })
      },
      deleteStudentUser(index,row){
        this.$confirm('是否确认删除学生用户:'+row.username+'?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axiosRequest({
            method:'post',
            url:'/deleteStudentUser',
            data:{
              username:row.username
            }
          }).then(successResponse => {
            if (successResponse.data.code == 200){
              this.studentUserList.splice(index,1)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除！'
          })
        })
      },
      deleteEnterpriseUser(index,row){
        this.$confirm('是否确认删除企业用户:'+row.username+'?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axiosRequest({
            method:'post',
            url:'/deleteEnterpriseUser',
            data:{
              username:row.username
            }
          }).then(successResponse => {
            if (successResponse.data.code == 200){
              this.enterpriseUserList.splice(index,1)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除！'
          })
        })
      },
      getStudentUser(){
        axiosRequest({
          method:'get',
          url:'/getUserInfo',
          params:{
            type:'s'
          }
        }).then(successResponse => {
          // console.log(successResponse.data.userList);
          this.studentUserList = successResponse.data.userList
        })
      },
      handleClick(tab){
        if (tab.name == 'enterpriseUser'){
          axiosRequest({
            method:'get',
            url:'/getUserInfo',
            params:{
              type:'e'
            }
          }).then(successResponse => {
            // console.log(successResponse.data.userList);
            this.enterpriseUserList = successResponse.data.userList
          })
        }
      },

    }
  }
</script>

<style scoped>
  .managerUser{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .userContainer{
    width: 1300px;
    margin-top: 6%;
    margin-bottom: 2%;
    box-shadow: 0 0 25px #cac6c6;
  }

  .user_head{
    display: flex;
    flex-direction:column;
    align-items: center;
    font-size: 100px;
    color: #909399;
    background-color: rgba(193,230,198,1);
  }

  .user_body{
    display: flex;
    flex-direction:column;
    /*height: 485px;*/
    /*background-color: cornflowerblue;*/
  }

  .btnStyle{
    width: 150px;
    margin-left: 20px;
  }

  .el-input{
    width: 280px;
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
    width: 50%;
    margin-right: 20px;
  }

</style>
