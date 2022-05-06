<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <el-container direction="horizontal">
    <el-aside width="200px">
      <h4 class="nav-title">Weather Management System</h4>
      <h4 class="nav-title-none">Weather Management System</h4>
      <el-menu
        default-active="2"
        class="nav-menu"
        :collapse="isCollapse"
        @open="handleOpen"
        router="true"
        @close="handleClose"
      >
        <el-menu-item index="user">
          <el-icon>
            <icon-menu />
          </el-icon>
          <template #title> 用户管理 </template>
        </el-menu-item>
        <el-menu-item index="info">
          <el-icon><document /></el-icon>
          <template #title> 数据报表 </template>
        </el-menu-item>
        <el-menu-item @click="logout" index="/">
          <el-icon><document /></el-icon>
          <template #title> 注销 </template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header height="60px">
        <div class="header">
          <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
            <el-radio-button :label="false"> expand </el-radio-button>
            <el-radio-button :label="true"> collapse </el-radio-button>
          </el-radio-group> -->
          <div></div>
        </div>
      </el-header>
      <el-main :style="{ height: AppHeight + 'px' }">
        <router-view />
      </el-main>
      <!-- <el-footer height="40px"> footer </el-footer> -->
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      AppHeight: 200,
      isCollapse: false,
    };
  },
  mounted() {
    this.AppHeight = window.innerHeight - 140;
    window.onresize = () => {
      console.log("rea");
      this.AppHeight = window.innerHeight - 140;
    };
    // this.post('http://localhost:8088/account/changepassword',{},(res,err)=>{
    //   console.log(res,err)
    // })
  },
  methods: {
    andleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    logout(){
      this.get('account/logout',result=>{
        this.get('account/islogin',res=>{
          if(!res.success){
            this.$router.replace({name:'login'})
          }
        })
      })
    }
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.nav-title {
  position: fixed;
  height: 40px;
  width: 200px;
  background: #42b983;
  font-size: 20px;
  color: white;
  padding: 20px 0 0 20px;
  margin: 0 0 20px 0;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  white-space: nowrap;
  z-index: 999;
}
.nav-menu {
  height: calc(100% - 160px);
}
.header {
  display: flex;
  justify-content: space-between;
}
.el-header{
  background: #42b983;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
}
</style>
