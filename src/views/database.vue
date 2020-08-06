<!--
 * @Author: your name
 * @Date: 2020-06-04 18:31:33
 * @LastEditTime: 2020-08-06 17:00:30
 * @LastEditors: zhang zi fang
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
      <el-button style="margin-bottom:20px" @click="addClick()">新增数据</el-button>
      <el-table  v-loading="loading" :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column :key="index" v-for="(item,index) in tableColumn" :label="item.Field">
          <template slot-scope="scope">
            <span>{{scope.row[item.Field]}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="操作">
          <template slot-scope="scope">
            <el-button @click="updateClick(scope,scope.$index)">修改数据</el-button>
            <el-button @click="deleteClick(scope,scope.$index)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="40%">
      <div>
        <div class="demo-input-suffix">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item
              :label="item.Field + ':'"
              :key="index"
              v-for="(item,index) in tableColumn"
              v-show="item.Extra !== 'auto_increment'"
            >
              <el-input v-model="form[item.Field]"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">{{update ? '更新数据' : '立即创建'}}</el-button>
              <el-button @click="dialogVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      surfaceList: [],
      dialogVisible: false,
      tables: {},
      form: {},
      tableDataKey: [],
      tagIndex: "",
      tableColumn: [],
      tableData: [],
      update: false,
      loading:false,
      itemList: [],
      name: ""
    };
  },
  watch: {
    tagIndex(res) {
      var name = this.surfaceList[res].name;
      this.name = name;
      this.tableColumn = this.tables[name];
      this.listPage(this.name);
    }
  },
  methods: {
    onSubmit() {
      this.$http({
        url: this.update ? "surface/curd/update" : "surface/curd/add",
        data: { form: this.form, name: this.name },
        method: "post"
      }).then(s => {
        if (s.status === 200) {
          this.update = false;
          this.$alert(this.update ? "数据更新成功" : "新增数据成功");
          this.dialogVisible = false;
          this.listPage(this.name);
        }
      });
    },
    addClick() {
      this.dialogVisible = true;
    },
    updateClick(_, index) {
      // 回显数据
      this.form = this.tableData[index];
      this.update = true;
      this.dialogVisible = true;
    },
    deleteClick(_, index) {
      this.$confirm(
        "将执行delete语句，是否确认删除数据数据",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(async () => {
        this.$http({
          url: "surface/curd/delete",
          method: "post",
          data: {
            id: this.tableData[index].id,
            name: this.name
          }
        }).then(() => {
          this.$alert("数据删除成功");
          this.listPage(this.name);
        });
      });
    },
    async tablesSurface() {
      // 获取所有的字段
      var list = await this.$http({ url: "tables/surface", data: {} });
      this.surfaceList = list.data;
    },
    async listPage(name) {
      var listPage = await this.$http({
        url: "tables/listPage",
        data: { name }
      });
      this.tableData = listPage.data;
    },
    tagClick(_, index) {
      this.tagIndex = index;
    },
    handleClick(row) {
      console.log(row);
    }
  },
  async created() {
    // 获取所有的表
    this.loading = true
    var tables = await this.$http({ url: "tables", data: {} });
    this.tables = tables.data;
    await this.tablesSurface();
    this.loading = false
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
