<!--
 * @Author: your name
 * @Date: 2020-06-11 22:26:46
 * @LastEditTime: 2020-06-11 22:31:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nodec:\Users\zhamgzifang\Desktop\code-generation-template\src\views\sql.vue
--> 
<template>
  <div class="sql">
    <h3>sql查询工具 --请输入原生sql</h3>
    <textarea name id cols="30" v-model="name" rows="10"></textarea>
    <el-button type="primary" @click="dialogVisibleClick">提交</el-button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      name: ""
    };
  },
  watch: {},
  methods: {
    dialogVisibleClick() {
      this.$http({ url: "tables/sql", data: { sql: this.name } });
    }
  }
};
</script>

<style lang="scss" scoped="scoped">
.sql {
}
</style>