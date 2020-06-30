<template>
  <div class="TheInterToGnerateJSON">
    <el-form ref="form" label-width="80px" v-if="element">
      <el-form-item label="关联表：">
        <el-select size="small" v-model="selectValue" placeholder="请选择活动区域">
          <template v-for="(item,index) in selectList">
            <el-option
              v-if="propsName !== item.name"
              :key="index"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </template>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="TheInterToGnerateJSON-main">
      <el-input
        v-if="!element"
        placeholder="请输入接口名字/默认为表描述"
        style="margin-bottom:10px"
        v-model="tabledescribes"
      >
        <template slot="prepend">接口名字</template>
      </el-input>
      <el-table
        :ref="'multipleTable' + comIndex"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column type="selection" width="70">
          <template slot-scope="scope">
            <el-radio v-model="multipleSelection" :label="scope.row.Field"></el-radio>
          </template>
        </el-table-column>
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
            <el-input :disabled="element" v-model="scope.row.attribute"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="插入" width="50">
          <template slot-scope="scope">
            <el-checkbox :disabled="element" v-model="scope.row.add"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="编辑" width="50">
          <template slot-scope="scope">
            <el-checkbox :disabled="element" v-model="scope.row.update"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="列表" width="50">
          <template slot-scope="scope">
            <el-checkbox :disabled="element" v-model="scope.row.querylist"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="查询" width="50">
          <template slot-scope="scope">
            <el-checkbox :disabled="element" v-model="scope.row.query"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="删除" width="50">
          <template slot-scope="scope">
            <el-checkbox :disabled="element" v-model="scope.row.delete"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="查询方式">
          <template slot-scope="scope">
            <el-select :disabled="element" v-model="scope.row.inquirywayvalue" placeholder="请选择">
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
            <el-checkbox :disabled="element" v-model="scope.row.required"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="必填规则">
          <template slot-scope="scope">
            <el-select :disabled="element" v-model="scope.row.rule" placeholder="请选择">
              <el-option v-for="item in ruleList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="关联表" v-if="!element">
          <template slot-scope="scope">
            <el-button size="mini" @click="relevance(scope.row,scope.$index)">关联表</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="but">
        <el-button size="small" type="primary" @click="add">保存</el-button>
        <el-button size="small" type="primary" @click="fanhuiClback">返回</el-button>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      append-to-body
      width="80%"
    >
      <!--    name表明  value表值 -->
      <div
        :is="is"
        :propsName="name"
        :proComIndex="comIndex"
        :propsValue="valueMsg"
        @callback="callbackSuc"
        :element="true"
      ></div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      is: "",
      name: "",
      valueMsg: "",
      selectValue: "",
      value: "",
      dialogVisible: false,
      inquirywayvalue: "",
      comIndex: 0,
      multipleSelection: "",
      tabledescribes: "",
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
      tableIndex: "",
      update: ""
    };
  },
  watch: {
    selectValue(res) {
      if (res) {
        this.generateQuery(res);
      }
    },
    propsTableData(res) {
      this.tableData = JSON.parse(JSON.stringify(res));
    }
  },
  props: ["element", "propsName", "propsValue", "proComIndex"],
  methods: {
    callbackSuc() {
      this.dialogVisible = false;
      this.tableData[this.tableIndex].relevance = JSON.parse(
        JSON.stringify(this.$root.surfaceRelevance)
      );
    },
    relevance(item, index) {
      if (!this.element) {
        this.$root.surfaceRelevance = [];
        if (item.relevance) {
          this.$root.surfaceRelevance = item.relevance;
        }
      }
      this.valueMsg = item.Field;
      this.tableIndex = index;
      this.is = "TheInterToGnerateJSON";
      this.dialogVisible = true;
    },
    add() {
      if (this.element) {
        this.$root.surfaceRelevance[this.proComIndex] = {
          berelevanceName: this.propsName,
          berelevancePrice: this.propsValue,
          elevancePrice: this.multipleSelection,
          elevanceName: this.name
        };
        this.fanhuiClback(true);
      } else {
        this.$http({
          url: "generate/json",
          method: "post",
          data: {
            tabledescribes: this.tabledescribes,
            datalist: this.tableData,
            name: this.$root.TheInterToGnerateJSON.name
          }
        }).then(s => {
          if (s.status === 200) {
            this.$router.go(-1);
            return;
          }
        });
      }
    },
    fanhuiClback(blo) {
      // 返回上一个组件
      if (this.element) {
        this.$emit("callback", blo);
        return;
      }
      this.$router.go(-1);
    },
    async generateQuery(name) {
      var generatequery = await this.$http({
        url: "generate/query",
        method: "post",
        data: {
          name: name
        }
      });
      this.tableData = generatequery.data;
      this.name = name;
      this.$nextTick(() => {
        var item = this.$root.surfaceRelevance[this.proComIndex];
        if (item) {
          this.multipleSelection = item.elevancePrice;
        }
      });
    }
  },
  computed: {
    selectList() {
      return this.$root.surfaceList;
    }
  },
  async created() {
    if (this.proComIndex !== undefined) {
      this.comIndex = this.proComIndex + 1;
    }
    if (!this.$root.TheInterToGnerateJSON) {
      this.$router.go(-1);
      return;
    }
    var item = this.$root.surfaceRelevance[this.proComIndex];
    if (item) {
      this.selectValue = item.elevanceName;
      return;
    }
    if (!this.element) {
      this.generateQuery(this.$root.TheInterToGnerateJSON.name);
    }
    // 接口名字
    if (this.$root.TheInterToGnerateJSON.tableinterface) {
      this.tabledescribes = this.$root.TheInterToGnerateJSON.tableinterface.name;
    }
  }
};
</script>
<style lang="scss">
.TheInterToGnerateJSON {
  overflow: hidden;
  .el-input.is-disabled .el-input__inner {
    background: none;
    border: 0;
  }
  .TheInterToGnerateJSON-main {
    .el-radio__label {
      display: none;
    }
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