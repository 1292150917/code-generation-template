<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="数据库：">
      <el-select v-model="form.type" placeholder="请选择数据库">
        <el-option label="mysql" value="mysql"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="host：">
      <el-input v-model="form.host"></el-input>
    </el-form-item>
    <el-form-item label="port：">
      <el-input v-model="form.port"></el-input>
    </el-form-item>
    <el-form-item label="user：">
      <el-input v-model="form.user"></el-input>
    </el-form-item>
    <el-form-item label="password：">
      <el-input v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item label="database：">
      <el-input v-model="form.database"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      form: {
          port:3306
      }
    };
  },
  methods: {
    async onSubmit() {
      var httpData = await this.$http({
        url: "database/create",
        data: this.form
      });
      if (httpData.status === 200) {
        alert("已成功链接数据库");
      }
    }
  }
};
</script>