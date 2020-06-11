<template>
  <div class="about">
    <div class="constructionedit-left">
      <el-button type="primary" size="small" class="addxinz" @click="dialogVisible = true">新增</el-button>
      <el-button type="primary" size="small" class="addxinz" @click="tableUpdate()">编辑</el-button>
      <el-button type="danger" size="small" class="addxinz" @click="handleDelete()">删除</el-button>
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
    <div class="constructionedit-right">
      <el-button type="primary" class="addxinz" size="small" @click="add">新增字段</el-button>
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
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
        <el-table-column prop="name" label="长度">
          <template slot-scope="scope">
            <el-input v-model="scope.row.length"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="不是null" width="50">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.Null"></el-checkbox>
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
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <div>
        <div class="demo-input-suffix">
          <label for>表名称:</label>
          <el-input v-model="nameBiao" placeholder="请输入内容"></el-input>
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
      value: "",
      dialogVisible: false,
      PhysicalTypevalue: "",
      nameBiao: "",
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
      surfaceList: [],
      multipleSelection: [],
      tableData: [],
      name: "",
      update: "",
      tagIndex: 0
    };
  },
  watch: {
    name() {
      this.tables();
    }
  },
  methods: {
    async tableUpdate() {
      this.update = this.surfaceList[this.tagIndex];
      this.dialogVisible = true;
    },
    async handleDelete() {
      var data = {
        name: this.surfaceList[this.tagIndex].name
      };
      var httpData = await this.$http({ url: "tables/delete", data: data });
      if (httpData.status === 200) {
        this.tablesSurface();
        this.dialogVisible = false;
      }
    },
    async dialogVisibleClick() {
      if (!this.nameBiao) {
        alert("请输入表名称！");
      }
      if (this.update) {
        this.$confirm("请谨慎编辑操作！", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(async () => {
          var dataV = {
            name: this.nameBiao,
            yuanName: this.update.name
          };
          var httpDatas = await this.$http({
            url: "tables/update",
            data: dataV
          });
          if (httpDatas.status === 200) {
            this.tablesSurface();
            this.update = "";
            this.dialogVisible = false;
          }
        });
        return;
      }
      var data = {
        name: this.nameBiao
      };
      var httpData = await this.$http({ url: "tables/add", data: data });
      if (httpData.status === 200) {
        this.tablesSurface();
        this.dialogVisible = false;
      }
    },
    handleClick(row) {
      console.log(row);
    },
    add() {
      this.tableData.push({
        add: true,
        surface: this.name
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
    tagClick(item, index) {
      this.name = item.name;
      this.tagIndex = index;
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
    handleEdit() {
      //   this.$router.push({ path: "/constructionedit" });
    },
    async tablesSurface() {
      var list = await this.$http({ url: "tables/surface", data: {} });
      this.surfaceList = list.data;
      if (this.surfaceList[0]) {
        this.name = this.surfaceList[0].name;
      }
    },
    async tables() {
      var list = await this.$http({ url: "tables", data: {} });
      this.tableData = list.data[this.name];
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
        s.surface = this.name;
        s.length = s.Type.match(/\((.+?)\)/)
          ? s.Type.match(/\((.+?)\)/)[1]
          : "";
        s.Type = s.Type.split("(")[0];
      });
    }
  },
  async created() {
    this.tablesSurface();
  }
};
</script>

<style lang="scss" scoped="scoped">
.addxinz {
  margin-bottom: 20px;
}
.f1f1f1 {
  background: #f1f1f1;
}
.about {
  height: 100%;
}
.constructionedit-left {
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
.constructionedit-right {
  width: calc(99% - 250px);
  margin-left: 1%;
  height: 100%;
  overflow: auto;
  background-color: #ffffff;
  float: left;
}
</style>
<style>
.about .cell {
  text-align: center;
}
</style>