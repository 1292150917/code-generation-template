<!--
 * @Author: your name
 * @Date: 2020-06-04 18:31:33
 * @LastEditTime: 2020-06-08 23:06:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nodec:\Users\zhamgzifang\Desktop\code-generation-template\src\views\construction.vue
--> 
<template>
  <div class="about">
    <el-button type="primary" class="addxinz" @click="add">新增表</el-button>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" width="120">
        <template slot-scope="scope">{{ scope.row.index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="name" label="表名称" width="120"></el-table-column>
      <el-table-column prop="address" label="表描述" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="创建时间" width="120"></el-table-column>
      <el-table-column prop="name" label="更新时间" width="120"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="tableUpdate(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">字段编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div>
        <div class="demo-input-suffix">
          <label for>表名称:</label>
          <el-input v-model="name" placeholder="请输入内容"></el-input>
        </div>
        <div class="demo-input-suffix">
          <label for>表描述:</label>
          <el-input v-model="describe" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      dialogVisible: false,
      describe: "",
      input: "",
      name: "",
      update: true,
      multipleSelection: [],
      tableData: []
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async tableUpdate(_, item) {
      this.update = item;
      this.dialogVisible = true;
    },
    handleClose() {},
    async dialogVisibleClick() {
      if (this.update) {
        var dataV = {
          name: this.name,
          yuanName: this.update.name
        };
        var httpDatas = await this.$http({
          url: "tables/update",
          data: dataV
        });
        if (httpDatas.status === 200) {
          this.table();
          this.dialogVisible = false;
        }
        return;
      }
      var data = {
        describe: this.describe,
        name: this.name
      };
      var httpData = await this.$http({ url: "tables/add", data: data });
      if (httpData.status === 200) {
        this.table();
        this.dialogVisible = false;
      }
    },
    async handleDelete(res) {
      var data = {
        name: this.tableData[res].name
      };
      var httpData = await this.$http({ url: "tables/delete", data: data });
      if (httpData.status === 200) {
        this.table();
        this.dialogVisible = false;
      }
    },
    add() {
      this.dialogVisible = true;
    },
    handleEdit(index, item) {
      this.$router.push({ path: "/constructionedit?name=" + item.name });
    },
    async table() {
      var list = await this.$http({ url: "tables/surface", data: {} });
      this.tableData = list.data;
    }
  },
  async created() {
    this.table();
  }
};
</script>

<style lang="scss" scoped="scoped">
.marg {
  margin-bottom: 10px;
}
.demo-input-suffix {
  font-size: 15px;
  line-height: 37px;
}
</style>
