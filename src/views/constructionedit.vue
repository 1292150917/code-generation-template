<template>
  <div class="about">
    <el-button type="primary" class="addxinz" @click="add">新增字段</el-button>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="Field" label="字段名">
        <template slot-scope="scope">
          <el-input v-model="scope.row.Field"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="字段描述" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-input v-model="scope.row.Comment"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="物理类型">
        <template slot-scope="scope">
          <el-select v-model="scope.row.Type" placeholder="请选择">
            <el-option v-for="item in PhysicalType" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="不是null" width="50">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.Null"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="长度">
        <template slot-scope="scope">
          <el-input v-model="scope.row.length"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="主键" width="50">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.Key"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="自动递增" width="50">
        <template slot-scope="scope">
          <el-checkbox
            v-model="scope.row.Extra"
            :disabled="(!scope.row.Key || scope.row.Type !== 'int')"
          ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="默认值">
        <template slot-scope="scope">
          <el-input v-model="scope.row.Default" :disabled="scope.row.Extra" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作">
        <template slot-scope="scope">
          <div v-if="!scope.row.add">
            <el-button size="mini" @click="handleEditUpdate(scope.$index, scope.row)">确认修改</el-button>
            <el-button size="mini" type="danger" @click="alterDelete(scope.$index, scope.row)">删除</el-button>
          </div>
          <div v-if="scope.row.add" style="text-align: center;">
            <el-button size="mini" @click="handleEditAdd(scope.$index, scope.row)">新增字段</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleEditdelete(scope.$index, scope.row)"
            >取消</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      value: "",
      PhysicalTypevalue: "",
      tablesList: [],
      inquirywayvalue: "",
      inquiryway: [
        {
          value: "=",
          label: "="
        },
        {
          value: "!=",
          label: "!="
        },
        {
          value: ">",
          label: ">"
        },
        {
          value: ">=",
          label: ">="
        },
        {
          value: "<",
          label: "<"
        },
        {
          value: "<=",
          label: "<="
        },
        {
          value: "Link",
          label: "Link"
        },
        {
          value: "Between",
          label: "Between"
        }
      ],
      PhysicalType: ["varchar", "int", "datetime"],
      multipleSelection: [],
      tableData: []
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    add() {
      this.tableData.push({
        add: true,
        surface: this.$route.query.name
      });
    },
    handleEditdelete(index) {
      this.tableData.splice(index, 1);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdittype(item) {
      item = this.deepCopy(item);
      if (item.Type === "varchar" || item.Type === "int") {
        item.Type += `(${item.length})`;
      }
      return item;
    },
    deepCopy(s) {
      return JSON.parse(JSON.stringify(s));
    },
    async handleEditUpdate(index, item) {
      var data = this.handleEdittype(item);
      data.yuanField = this.tablesList[index].Field;
      // 获取原主键
      var v = this.tablesList.filter(s => s.Key === "PRI");
      data.yuanKey = v[0] ? v[0].Field : "";
      data.yuanExtra = v[0] ? v[0].Extra : "";
      if (data.Null && !data.Default && !data.Key) {
        this.$alert("选中不为null以后必须存在一个默认值。");
        return;
      }
      var httpData = await this.$http({ url: "alter/update", data: data });
      if (httpData.status === 200) {
        this.tables();
      }
    },
    async alterDelete(index, item) {
      var data = this.handleEdittype(item);
      await this.$http({ url: "alter/delete", data: data });
      this.tables();
    },
    async handleEditAdd(index, item) {
      var data = this.handleEdittype(item);
      // 获取原主键
      var v = this.tablesList.filter(s => s.Key === "PRI");
      data.yuanKey = v[0] ? v[0].Field : "";
      data.yuanExtra = v[0] ? v[0].Extra : "";
      if (data.Null && !data.Default && !data.Key) {
        this.$alert("选中不为null以后必须存在一个默认值。");
        return;
      }
      var httpData = await this.$http({ url: "alter/add", data: data });
      if (httpData.status === 200) {
        this.tables();
      }
    },
    handleDelete(res) {
      console.log(res);
    },
    handleEdit() {
      //   this.$router.push({ path: "/constructionedit" });
    },
    async tables() {
      var list = await this.$http({ url: "tables", data: {} });
      this.tableData = list.data[this.$route.query.name];
      this.tablesList = this.deepCopy(this.tableData);
      this.tableData.map(s => {
        if (s.Null == "YES") {
          s.Null = false;
        } else {
          s.Null = true;
        }
        if (s.Key === "PRI") {
          s.Key = true;
        } else {
          s.Key = false;
        }
        if (s.Extra === "auto_increment") {
          s.Extra = true;
        } else {
          s.Extra = false;
        }
        s.surface = this.$route.query.name;
        s.length = s.Type.match(/\((.+?)\)/)
          ? s.Type.match(/\((.+?)\)/)[1]
          : "";
        s.Type = s.Type.split("(")[0];
      });
    }
  },
  async created() {
    this.tables();
  }
};
</script>

<style>
.addxinz {
  margin-bottom: 20px;
}
</style>
