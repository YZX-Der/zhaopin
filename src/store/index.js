import Vue from 'vue'
import Vuex from 'vuex'

//1.安装插件
Vue.use(Vuex)

//2.创建对象
const store = new Vuex.Store({
  state:{
    user:{
      username:window.sessionStorage.getItem('user' || '') == null ? '' :JSON.parse(window.sessionStorage.getItem('user' || '')).username
    }
  },
  mutations:{//方法
    login(state,user){
      state.user = user;
      window.sessionStorage.setItem('user', JSON.stringify(user))
    }
  }
})

//3.导出store对象
export default store
