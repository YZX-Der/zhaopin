import Vue from 'vue'
import VueRouter from "vue-router";


const Login = () => import('components/Login')
const Student = () => import('components/Student')
const Manager = () => import('components/Manager')
const Enterprise = () => import('components/Enterprise')
const StudentRecruit = () => import('components/StudentRecruit')
const StudentMake = () => import('components/StudentMake')
const StudentDeliver = () => import('components/StudentDeliver')
const StudentMessage = () => import('components/StudentMessage')
const StudentChat = () => import('components/StudentChat')
const EnterpriseGetResume = () => import('components/EnterpriseGetResume')
const EnterpriseSubmitRecruit = () => import('components/EnterpriseSubmitRecruit')
const EnterpriseChat = () => import('components/EnterpriseChat')
const ManagerRecruitment = () => import('components/ManagerRecruitment')
const ManagerUser = () => import('components/ManagerUser')

Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect:'/login'
  },
  {
    path: '/login',
    component:Login,
    meta: {
      title:'登录页'
    }
  },
  {
    path: '/student',
    component:Student,
    children:[
      {
        path: '',
        redirect:'studentRecruit'
      },
      {
        path: 'studentRecruit',
        component:StudentRecruit,
        meta: {
          title:'宣讲信息'
        }
      },
      {
        path: 'studentMake',
        component:StudentMake,
        meta: {
          title:'简历制作'
        }
      },
      {
        path: 'studentDeliver',
        component:StudentDeliver,
        meta: {
          title:'招聘单位'
        }
      },
      {
        path: 'studentMessage',
        component:StudentMessage,
        meta: {
          title:'消息通知'
        }
      },
      {
        path: 'studentChat',
        component:StudentChat,
        meta: {
          title:'聊天信息'
        }
      }
    ],
    meta:{
      requireAuth:true
    }
  },
  {
    path: '/manager',
    component:Manager,
    children:[
      {
        path: '',
        redirect:'managerRecruitment'
      },
      {
        path: 'managerRecruitment',
        component:ManagerRecruitment,
        meta: {
          title:'招聘信息管理'
        }
      },
      {
        path: 'managerUser',
        component:ManagerUser,
        meta: {
          title:'用户管理'
        }
      }
    ],
    meta:{
      requireAuth:true
    }
  },
  {
    path: '/enterprise',
    component:Enterprise,
    children:[
      {
        path: '',
        redirect:'enterpriseGetResume'
      },
      {
        path: 'enterpriseGetResume',
        component:EnterpriseGetResume,
        meta: {
          title:'简历信息'
        }
      },
      {
        path: 'enterpriseSubmitRecruit',
        component:EnterpriseSubmitRecruit,
        meta: {
          title:'单位信息'
        }
      },
      {
        path: 'enterpriseChat',
        component:EnterpriseChat,
        meta: {
          title:'聊天信息'
        }
      }
    ],
    meta:{
      requireAuth:true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
