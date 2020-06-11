<!--
 * @Author: your name
 * @Date: 2020-06-09 19:38:15
 * @LastEditTime: 2020-06-11 22:16:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nodec:\Users\zhamgzifang\Desktop\code-generation-template\src\views\databaseCreate.vue
--> 
<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="数据库：">
      <el-select v-model="form.type" placeholder="请选择数据库">
        <el-option label="mysql" value="mysql"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="主机名/IP地址">
      <el-input v-model="form.host"></el-input>
    </el-form-item>
    <el-form-item label="端口：">
      <el-input v-model="form.port"></el-input>
    </el-form-item>
    <el-form-item label="用户名：">
      <el-input v-model="form.user"></el-input>
    </el-form-item>
    <el-form-item label="密码：">
      <el-input v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item label="连接名：">
      <el-input v-model="form.database"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">链接库</el-button>
      <el-button @click="cretedSubmit">创建并连接库</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      form: {
        user: "root",
        port: 3306,
        host: "localhost"
      }
    };
  },
  methods: {
    verification() {
      if (this.form.database === undefined || this.form.database === "") {
        alert("请输入连接名");
        return false;
      } else if (
        this.form.password === undefined ||
        this.form.database === ""
      ) {
        alert("请输入密码");
        return false;
      } else if (this.form.type === undefined || this.form.database === "") {
        alert("请选择数据库类型");
        return false;
      }
      return true;
    },
    async cretedSubmit() {
      if (!this.verification()) {
        return;
      }
      this.$confirm(
        "本操作会创建一个新库进行连接，请确认操作，如已有版本库，可以尝试直接链接。",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(async () => {
        // 创建数据库
        this.form.create = true;
        var httpData = await this.$http({
          url: "database/create",
          data: this.form
        });
        if (httpData.status === 200 && !httpData.msgData) {
          alert("已成功链接数据库");
        } else {
          this.$alert(JSON.stringify(httpData.msgData), "链接失败");
        }
        this.form.create = "";
      });
    },
    async onSubmit() {
      if (!this.verification()) {
        return;
      }
      var httpData = await this.$http({
        url: "database/create",
        data: this.form
      });
      if (httpData.status === 200 && !httpData.msgData) {
        alert("已成功链接数据库");
      } else {
        this.$alert(JSON.stringify(httpData.msgData), "链接失败");
      }
    }
  }
};
</script>