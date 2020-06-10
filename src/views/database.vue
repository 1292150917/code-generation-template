<template>
  <div class="database">
    <div class="database-left">
      <div v-for="(item,index) in 10" :key="index">
        <img src="../assets/table.png" alt />
        {{item}}
      </div>
    </div>
    <div class="database-right">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="date" label="日期" width="150"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="province" label="省份" width="120"></el-table-column>
        <el-table-column prop="city" label="市区" width="120"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="zip" label="邮编"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333
        }
      ]
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    }
  },
  async created() {}
};
</script>
<style lang="scss" scoped="scoped">
.database{
    height: 100%;
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
