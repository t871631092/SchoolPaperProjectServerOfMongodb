
<template>
  <div
    v-loading="loading"
    element-loading-text="登录中..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
    class="login-container"
  >
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <!-- 头像区域 -->
      <div v-if="TxStatus" class="avatar-box">
        <!-- <img src="../../assets/touxiang.jpg" alt=""> -->
      </div>

      <div class="title-container">
        <h3 class="title">后台管理系统</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <div>
        <el-button
          type="primary"
          style="width: 100%; margin-bottom: 20px"
          @click.native.prevent="handleLogin"
          >登录</el-button
        >
      </div>
    </el-form>
  </div>
</template>
 
<script>
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value.trim()) {
        callback(new Error("用户名不能为空！"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error("密码最少为6位字符！"));
      } else {
        callback();
      }
    };
    return {
      // 头像状态
      TxStatus: true,
      loginForm: {
        username: "",
        password: "",
      },
      // 登录规则
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    // 登录业务
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        // 如果符合验证规则
        if (valid) {
          this.loading = true;
          this.post(
            "account/login",
            { username: this.loginForm.username, password: this.loginForm.password },
            (res, err) => {
              this.loading = false;
              console.log(res);
              if (res.success) {
                  this.$router.push({name:'Home'})
              } else {
                this.$message.error("仅限管理员登录！");
              }
            }
          );
        } else {
          console.log("error submit!!");
          this.loading = false;
          return false;
        }
      });
    },
    // 注册业务
    register() {
      console.log("123");
      this.$router.push({ name: "register" });
    },
  },
};
</script>
<style>
html,
body {
  height: 100%;
  overflow: hidden;
}
.login-container {
  width: 400px;
  box-shadow: 0 0 10px 1px grey;
  padding: 20px;
  border-radius: 25px;
  position: absolute;
  left: calc(50% - 200px);
  top: calc(50% - 200px);
}
</style>
