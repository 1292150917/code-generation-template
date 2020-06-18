<!--
 * @Author: your name
 * @Date: 2020-06-04 18:31:33
 * @LastEditTime: 2020-06-18 21:08:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nodec:\Users\zhamgzifang\Desktop\code-generation-template\src\views\construction.vue
--> 
<template>
  <div class="about">
    <el-button size="small" type="primary" @click="generateCreate">生成选中文档</el-button>
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
      <el-table-column prop="msg.TABLE_COMMENT" label="表描述" show-overflow-tooltip></el-table-column>
      <!-- <el-table-column prop="address" label="实体" show-overflow-tooltip></el-table-column> -->
      <el-table-column prop="msg.CREATE_TIME" label="创建时间"></el-table-column>
      <el-table-column prop="msg.UPDATE_TIME" label="更新时间"></el-table-column>
      <!-- <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">预览</el-button>
          <el-button size="mini" @click="tableUpdate(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <!-- 预览代码 -->
    <el-dialog
      :visible.sync="previewhtml"
      custom-class="previewhtml_dialog"
      width="80%"
      :before-close="handleClose"
    >
      <div class="previewhtml">
        <div class="previewhtml-tag">
          <span
            :key="index"
            :class="tagIndex === index ? 'TagSelect' : ''"
            v-for="(item,index) in createList"
            @click="tagIndex = index"
          >{{item.name}}</span>
        </div>
        <template v-for="(item,index) in createList">
          <div v-if="tagIndex === index" :key="index">
            <pre class="previewhtml-main hljs">
              <code v-html="item.msg" class="javascript"></code>
            </pre>
          </div>
        </template>
      </div>
    </el-dialog>
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
import hljs from "highlight.js";
export default {
  name: "App",
  data() {
    return {
      createList: [],
      previewhtml: false,
      tagIndex: "",
      ORMlist: ["sequelize"],
      value: "",
      dialogVisible: false,
      describe: "",
      input: "",
      name: "",
      update: true,
      multipleSelection: [],
      tableData: []
    };
  },
  watch: {
    tagIndex() {
      this.$nextTick(() => {
        var pre = document.querySelector(".previewhtml-main");
        hljs.highlightBlock(pre);
      });
    }
  },
  methods: {
    generateCreate() {
      var name = [];
      this.multipleSelection.forEach(s => {
        name.push(s.name);
      });
      this.$http({
        url: "api/apiRender/render",
        method: "post",
        data: {
          name: name
        }
      }).then(async res => {
        console.log(res)
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async tableUpdate(_, item) {
      this.$root.TheInterToGnerateJSON = item;
      this.$router.push({ path: "/TheInterToGnerateJSON" });
    },
    handleClose() {
      this.previewhtml = false;
    },
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
    handleEdit(_, item) {
      this.$http({
        url: "generate/create",
        method: "post",
        data: {
          name: [item.name]
        }
      }).then(s => {
        if (s.status === 200) {
          this.createList = s.msg;
          this.tagIndex = 0;
          this.previewhtml = true;
        }
      });
    },
    async table() {
      var list = await this.$http({ url: "tables/surface", data: {} });
      list.data.filter(s => {
        if (s.msg.TABLE_COMMENT.split(";").length >= 2) {
          s.msg.TABLE_COMMENT = s.msg.TABLE_COMMENT.split(";")[0];
        } else {
          s.msg.TABLE_COMMENT = "";
        }
        return s;
      });
      this.tableData = list.data;
    }
  },
  async created() {
    this.table();
  }
};
</script>
<style lang="scss">
.previewhtml_dialog {
  background: #f8f8f8;
  height: calc(92% - 54px);
  overflow: auto;
  margin-top: 54px !important;
  box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.4);
  .TagSelect {
    background: #fff;
  }
  .el-dialog__body {
    height: 97%;
    padding-top: 0;
    padding-bottom: 0;
  }
  .el-dialog__header {
    padding-top: 0;
  }
}
.previewhtml > div:nth-of-type(2) {
  height: calc(100% - 64px);
  overflow: auto;
}
</style>
<style lang="scss" scoped="scoped">
.previewhtml {
  height: 100%;
}
.previewhtml-tag {
  border-bottom: 1px solid #eee;
  span {
    padding: 0px 15px;
    display: inline-block;
    height: 38px;
    line-height: 38px;
    text-align: center;
  }
}
.ORMSELECT {
  color: #999;
  margin-top: 15px;
  margin-bottom: 15px;
}
.marg {
  margin-bottom: 10px;
}
.demo-input-suffix {
  font-size: 15px;
  line-height: 37px;
}
</style>
