<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <el-container direction="horizontal">
    <el-aside width="200px">
123
    </el-aside>
    <el-container>
      <el-header height="80px">
        header
        </el-header>
      <el-main :style="{ height: AppHeight + 'px' }"> 
        <router-view />
        </el-main>
      <el-footer height="60px">
        footer
        </el-footer>
    </el-container>
  </el-container>
</template>
<script>
export default {
  setup() {
    return {
      AppHeight: 200,
    };
  },
  created() {
    this.AppHeight = window.innerHeight - 140;
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
</style>
