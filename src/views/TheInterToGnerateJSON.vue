<template>
  <div class="TheInterToGnerateJSON">
    <div class="TheInterToGnerateJSON-main">
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
            <el-input :disabled="true" v-model="scope.row.Field"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="字段描述" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-input :disabled="true" v-model="scope.row.Comment"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="物理类型">
          <template slot-scope="scope">
            <el-input :disabled="true" v-model="scope.row.Type"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="代码属性" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-input v-model="scope.row.attribute"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="插入" width="50">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.add"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="编辑" width="50">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.update"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="列表" width="50">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.querylist"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="查询" width="50">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.query"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="删除" width="50">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.delete"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="查询方式">
          <template slot-scope="scope">
            <el-select v-model="scope.row.inquirywayvalue" placeholder="请选择">
              <el-option
                v-for="item in inquiryway"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="必填" width="50">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.required"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="必填规则">
          <template slot-scope="scope">
            <el-select v-model="scope.row.rule" placeholder="请选择">
              <el-option v-for="item in ruleList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      <div class="but">
        <el-button size="small" type="primary" @click="add">保存</el-button>
        <el-button size="small" type="primary">返回</el-button>
      </div>
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
        <el-button type="primary" @click="add">确 定</el-button>
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
      nameBiao: "",
      inquirywayvalue: "",
      ruleList: ["不为空", "手机号", "身份证"],
      inquiryway: [
        {
          value: "="
        },
        {
          value: "!="
        },
        {
          value: ">"
        },
        {
          value: ">="
        },
        {
          value: "<"
        },
        {
          value: "<="
        },
        {
          value: "Link"
        },
        {
          value: "Between"
        }
      ],
      tableData: [],
      update: ""
    };
  },
  watch: {
    name() {}
  },
  methods: {
    add() {
      this.$http({
        url: "generate/json",
        method: "post",
        data: {
          datalist: this.tableData,
          name: this.$root.TheInterToGnerateJSON.name
        }
      }).then(s => {
        if (s.status === 200) {
          this.$router.go(-1);
          return 
        }
      });
    },
    handleSelectionChange() {}
  },
  async created() {
    if (!this.$root.TheInterToGnerateJSON) {
      this.$router.go(-1);
      return;
    }
    var httpDatas = await this.$http({
      url: "tables",
      data: {}
    });
    this.tableData = httpDatas.data[this.$root.TheInterToGnerateJSON.name];
    this.tableData.filter(s => {
      if (s.Extra === "auto_increment") {
        return;
      }
      s.attribute = s.Field;
      s.add = true;
      s.querylist = true;
      s.inquirywayvalue = "=";
      s.update = true;
      s.query = true;
      return s;
    });
  }
};
</script>
<style lang="scss">
.TheInterToGnerateJSON {
  .el-input.is-disabled .el-input__inner {
    background: none;
    border: 0;
  }
}
</style>
<style lang="scss" scoped="scoped">
.but {
  text-align: center;
  button {
    margin-top: 40px;
    margin-right: 20px;
  }
}
.addxinz {
  margin-bottom: 20px;
}
.f1f1f1 {
  background: #f1f1f1;
}
.TheInterToGnerateJSON {
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
.TheInterToGnerateJSON-main {
  width: 100%;
  margin-left: 1%;
  height: 100%;
  overflow: auto;
  background-color: #ffffff;
  float: left;
}
</style>
<style>
.TheInterToGnerateJSON .cell {
  text-align: center;
}
</style>