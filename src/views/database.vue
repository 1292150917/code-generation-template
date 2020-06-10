<!--
 * @Author: your name
 * @Date: 2020-06-04 18:31:33
 * @LastEditTime: 2020-06-10 22:03:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nodec:\Users\zhamgzifang\Desktop\code-generation-template\src\views\database.vue
--> 
<template>
  <div class="database">
    <div class="database-left">
      <div
        v-for="(item,index) in surfaceList"
        :class="tagIndex === index ? 'f1f1f1' : ''"
        @click="tagClick(item,index)"
        :key="index"
      >
        <img src="../assets/table.png" alt />
        {{item.name}}
      </div>
    </div>
    <div class="database-right">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column :prop="item.Field" :key="index" v-for="(item,index) in tableColumn" :label="item.Field"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      surfaceList: [],
      tables: {},
      tableDataKey: [],
      tagIndex: "",
      tableColumn:[],
      tableData: []
    };
  },
  watch: {
    tagIndex(res) {
      var name = this.surfaceList[res].name
      this.tableColumn = this.tables[name]
    }
  },
  methods: {
    async tablesSurface() {
      var list = await this.$http({ url: "tables/surface", data: {} });
      this.surfaceList = list.data;
      if (list.data) {
        this.listPage(list.data[0].name);
      }
    },
    async listPage(name) {
      var listPage = await this.$http({
        url: "tables/listPage",
        data: { name }
      });
      this.tableData = listPage.data
    },
    tagClick(_, index) {
      this.tagIndex = index;
    },
    handleClick(row) {
      console.log(row);
    }
  },
  async created() {
    var tables = await this.$http({ url: "tables", data: {} });
    this.tables = tables.data;
    await this.tablesSurface();
    this.tagIndex = 0;
  }
};
</script>
<style lang="scss" scoped="scoped">
.database {
  height: 100%;
}
.f1f1f1 {
  background: #f1f1f1;
}
.database-left {
  line-height: 40px;
  width: 250px;
  text-indent: 14px;
  float: left;
  background-color: #ffffff;
  height: 100%;
  border-right: 1px solid #fff4f4;
  box-sizing: border-box;
  img {
    width: 16px;
    position: relative;
    top: 2px;
    margin-right: 3px;
  }
}
.database-right {
  width: calc(99% - 250px);
  margin-left: 1%;
  background-color: #ffffff;
  float: left;
}
</style>
