<!--
 * @Author: your name
 * @Date: 2020-06-04 18:31:33
 * @LastEditTime: 2020-06-21 14:18:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nodec:\Users\zhamgzifang\Desktop\code-generation-template\src\views\construction.vue
--> 
<template>
  <div class="InterfaceView">
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;height:100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" width="120">
        <template slot-scope="scope">{{ scope.$index + 1}}</template>
      </el-table-column>
      <el-table-column prop="name" label="接口名字"></el-table-column>
      <el-table-column prop="method" label="请求方式"></el-table-column>
      <el-table-column prop="url" label="接口地址"></el-table-column>
      <!-- <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">预览</el-button>
          <el-button size="mini" @click="tableUpdate(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteClick()">删除</el-button>
          <el-button size="mini" @click="handleClick(scope.$index, scope.row)">生成代码</el-button>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      tableData: []
    };
  },
  watch: {},
  methods: {
    async table() {
      var list = await this.$http({ url: "advanced/connectorget", data: {},method:"post" });
      this.tableData = list.data;
    }
  },
  async created() {
    this.table();
  }
};
</script>
<style lang="scss">
.InterfaceView {
}
</style>