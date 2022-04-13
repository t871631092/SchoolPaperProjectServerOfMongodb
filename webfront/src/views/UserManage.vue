<template>
  <div class="user">
    <el-collapse>
      <el-collapse-item title="筛选条件">
        <el-row>
          <el-col :span="2">
            <label>用户名</label>
          </el-col>
          <el-col :span="6">
            <el-input v-model="form.name" />
          </el-col>
          <el-col :span="2"> 用户名</el-col>
          <el-col :span="6">
            <el-input v-model="form.name" />
          </el-col>
          <el-col :span="2"> 用户名</el-col>
          <el-col :span="6">
            <el-input v-model="form.name" />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <label>用户名</label>
          </el-col>
          <el-col :span="6">
            <el-input v-model="form.name" />
          </el-col>
          <el-col :span="2"> 用户名</el-col>
          <el-col :span="6">
            <el-input v-model="form.name" />
          </el-col>
          <el-col :span="2"> 用户名</el-col>
          <el-col :span="6">
            <el-input v-model="form.name" />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2"> </el-col>
          <el-col :span="22" style="text-align: left">
            <el-button @click="getUsers">搜索</el-button>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
    <el-table :data="users" style="width: 100%">
      <el-table-column label="用户名" prop="userName"></el-table-column>
      <el-table-column label="昵称" prop="nickName"></el-table-column>
      <el-table-column label="地址" prop="address"></el-table-column>
      <el-table-column label="创建时间" prop="addDate"></el-table-column>
      <el-table-column label="登陆时间" prop="lastLogin"></el-table-column>
      <el-table-column label="地址收藏" prop="locations"></el-table-column>
      <el-table-column label="定位" prop="gps"></el-table-column>
      <el-table-column label="" prop="gps">
        <template #default="props">
          <el-button @click="delUser(props.row._id)" type="danger">
            重置密码
            </el-button>
        </template>
      </el-table-column>
      <el-table-column label="" prop="gps">
        <template #default="props">
          <el-button @click="delUser(props.row._id)" type="danger">
            注销
            </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
      },
      users: [],
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      this.post("user/getuser", { page: 1, limit: 20 }, (res, err) => {
        console.log(res);
        if (res.success) {
          console.log(res);
          this.users = res.data;
        }
      });
    },
    delUser(id) {
      this.post("user/del", { id }, (res, err) => {
        console.log(res);
        if (res.success) {
          this.getUsers();
        }
      });
    },
  },
};
</script>
<style>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
</style>