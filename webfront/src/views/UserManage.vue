<template>
  <div class="user">
    <el-collapse class="query">
      <el-collapse-item title="筛选条件">
        <el-row>
          <el-col :span="2">
            <label>用户名</label>
          </el-col>
          <el-col :span="6">
            <el-input v-model="form.name" />
          </el-col>
          <el-col :span="2"> 地址</el-col>
          <el-col :span="6">
            <el-input v-model="form.address" />
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
    <el-table :data="users" style="width: 100%" class="userlist">
      <el-table-column label="用户名" prop="userName"></el-table-column>
      <el-table-column label="昵称" prop="nickName"></el-table-column>
      <el-table-column label="地址" prop="address"></el-table-column>
      <el-table-column label="创建时间" prop="addDate"></el-table-column>
      <el-table-column label="登陆时间" prop="lastLogin"></el-table-column>
      <el-table-column label="地址收藏" prop="locations"></el-table-column>
      <el-table-column label="定位" prop="gps"></el-table-column>
      <el-table-column label="" prop="gps">
        <template #default="props">
          <el-button @click="changepw(props.row._id)" type="danger">
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
    <div><el-pagination background layout="prev, pager, next" :total="count" :page-size="param.limit" :current-page="param.page" @update:current-page="pageChange"/></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        address: "",
      },
      param :{
        page: 1,
        limit: 10,
      },
      count:0,
      users: [],
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    search(){
      this.param.page = 1;
      this.param.limit= 10;
      this.getUsers();
    },
    getUsers() {
      let param = {
        page: this.param.page,
        limit: this.param.limit,
      };
      if (this.form.name) {
        param.name = this.form.name;
      }
      if (this.form.address) {
        param.address = this.form.address;
      }
      this.post("user/getuser", param, (res, err) => {
        console.log(res);
        if (res.success) {
          console.log(res);
          this.users = res.data;
          this.count = res.count;
        }
      });
    },
    delUser(id) {
      this.post("user/del", { id }, (res, err) => {
        console.log(res);
        if (res.success) {
          this.$message('注销')
          this.getUsers();
        }
      });
    },
    changepw(id) {
      this.post("user/changpw", { id }, (res, err) => {
        console.log(res);
        if (res.success) {
          this.$message('重置成功')
          this.getUsers();
        }
      });
    },
    pageChange(value){
      this.param.page = value;
      this.getUsers();
    }
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
.query {
  margin: 25px 0;
  padding: 25px;
  margin-top: 0;
  border-radius: 25px;
  box-shadow: 0 0 3px 1px lightgray;
}
.userlist {
  padding: 25px;
  margin-top: 0;
  border-radius: 25px;
  box-shadow: 0 0 5px 1px lightgray;
}.el-pagination{
  text-align:center;
  margin-top:20px;
  justify-content: center;
} 
</style>