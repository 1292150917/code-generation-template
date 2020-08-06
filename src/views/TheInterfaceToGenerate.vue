<!--
 * @Author: your name
 * @Date: 2020-06-04 18:31:33
 * @LastEditTime: 2020-08-06 17:23:39
 * @LastEditors: zhang zi fang
 * @Description: In User Settings Edit
 * @FilePath: \nodec:\Users\zhamgzifang\Desktop\code-generation-template\src\views\construction.vue
--> 
<template>
  <div class="about">
    <el-button size="small" type="primary" @click="generateCreate(true)">生成可部署项目</el-button>
    <el-button size="small" type="primary" @click="generateCreate">生成选中局部代码</el-button>
    <el-button
      type="danger"
      size="small"
      style="
    margin-left: 13px;
    margin-top: 7px;"
      class="addxinz"
      @click="SynchronousModel"
    >数据库同步模型</el-button>
    <div class="ORMSELECT">
      选择ORM：
      <el-select size="small" v-model="ormvalue" placeholder="请选择">
        <el-option v-for="item in ORMlist" :key="item" :label="item" :value="item"></el-option>
      </el-select>
    </div>
    <div class="search">
      搜索接口：
      <el-input
        size="small"
        @change="changeValue"
        v-model="sousuo"
        placeholder="输入完成请敲回车进行搜索"
        style="width:50%;margin-left: 11px;"
      ></el-input>
    </div>
    <el-collapse style="margin-top: 13px;" v-model="activeName" accordion>
      <el-collapse-item title="接口通用信息设置" name="1">
        <div style="margin-bottom:10px;">此数据会通用与所有接口</div>
        <div style="line-height: 54px;">
          <div class="tonyon_list">
            伪删除字段：
            <el-input size="small" v-model="fakef" placeholder style="width:50%;margin-left: 11px;"></el-input>
          </div>
          <div class="tonyon_list">
            伪删除默认值：
            <el-input
              size="small"
              v-model="fakefValue"
              placeholder
              style="width:50%;margin-left: 11px;"
            ></el-input>
          </div>
          <div class="tonyon_list">
            删除成为的值：
            <el-input
              size="small"
              v-model="deleteValue"
              placeholder
              style="width:50%;margin-left: 11px;"
            ></el-input>
          </div>
          <div class="tonyon_list">
            数据创建时间字段：
            <el-input
              size="small"
              v-model="creationTime"
              placeholder
              style="width:50%;margin-left: 11px;"
            ></el-input>
          </div>
          <div class="tonyon_list">
            数据更新时间字段：
            <el-input
              size="small"
              v-model="updateTime"
              placeholder
              style="width:50%;margin-left: 11px;"
            ></el-input>
          </div>
          <el-button size="mini" type="primary" class="gogeneral" @click="fakeGo()">保存</el-button>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-table
      v-loading="loading"
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
      <el-table-column prop="tableinterface.name" label="接口名字" show-overflow-tooltip></el-table-column>
      <!-- <el-table-column prop="address" label="实体" show-overflow-tooltip></el-table-column> -->
      <el-table-column prop="msg.CREATE_TIME" label="创建时间"></el-table-column>
      <el-table-column prop="msg.UPDATE_TIME" label="更新时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">预览</el-button>
          <el-button size="mini" @click="tableUpdate(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteClick()">删除</el-button>
          <el-button size="mini" @click="handleClick(scope.$index, scope.row)">生成代码</el-button>
        </template>
      </el-table-column>
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
import JSZip from "jszip";
import { saveAs } from "file-saver";
export default {
  name: "App",
  data() {
    return {
      createList: [],
      ormvalue: "sequelize",
      previewhtml: false,
      tagIndex: "",
      sousuo: "",
      ORMlist: ["sequelize"],
      activeName: "",
      loading: false,
      deleteValue: "",
      value: "",
      dialogVisible: false,
      describe: "",
      fakef: "",
      fakefValue: "",
      creationTime: "",
      updateTime: "",
      input: "",
      name: "",
      resDate: [],
      update: true,
      multipleSelection: [],
      tableData: [],
    };
  },
  watch: {
    tagIndex() {
      this.$nextTick(() => {
        var pre = document.querySelector(".previewhtml-main");
        hljs.highlightBlock(pre);
      });
    },
  },
  methods: {
    fakeGo() {
      var { fakef, fakefValue, creationTime, updateTime, deleteValue } = this;
      this.$http({
        url: "api/generalSettings",
        data: {
          fakef,
          fakefValue,
          creationTime,
          deleteValue,
          updateTime,
        },
      }).then(()=>{
        this.$message({
          message: '默认值 保存成功',
          type: 'success'
        });
      });
    },
    async SynchronousModel() {
      await this.$http({
        url: "tables/surface",
        data: {
          update: true,
        },
      });
      this.$alert("已经成功将数据库数据同步到模型中", "提示", {
        confirmButtonText: "确定",
        callback: () => {
          // location.reload();
          this.table();
        },
      });
    },
    async handleClick(_, item) {
      this.$http({
        url: "generate/create",
        method: "post",
        data: {
          name: [item.name],
          ORM: this.ormvalue,
          download: true,
        },
      }).then(async (res) => {
        var zip = new JSZip();
        for (var index in res.msg) {
          zip.file(res.msg[index].name, res.msg[index].msg);
          var s = await zip.generateAsync({ type: "blob" });
        }
        saveAs(s, item.name);
      });
    },
    changeValue() {
      if (!this.sousuo) {
        this.tableData = this.resDate;
        return;
      }
      this.tableData = this.resDate.filter((s) => s.name.includes(this.sousuo));
    },
    generateCreate(deploy) {
      var name = [];
      this.multipleSelection.forEach((s) => {
        name.push(s.name);
      });
      this.$http({
        url: "generate/create",
        method: "post",
        data: {
          name: name,
          ORM: this.ormvalue,
          download: true,
          deploy
        }
      }).then(async res => {
        var zip = new JSZip();
        for (var index in res.msg) {
          zip.file(res.msg[index].name, res.msg[index].msg);
          var s = await zip.generateAsync({ type: "blob" });
        }
        if (name.length === 1) {
          saveAs(s, name[0].name);
        } else {
          saveAs(s, "Dave_download");
        }
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
    deleteClick() {
      this.$alert("该版本暂无法删除");
    },
    async dialogVisibleClick() {
      if (this.update) {
        var dataV = {
          name: this.name,
          yuanName: this.update.name,
        };
        var httpDatas = await this.$http({
          url: "tables/update",
          data: dataV,
        });
        if (httpDatas.status === 200) {
          this.table();
          this.dialogVisible = false;
        }
        return;
      }
      var data = {
        describe: this.describe,
        name: this.name,
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
          name: [item.name],
          ORM: this.ormvalue,
        },
      }).then((s) => {
        if (s.status === 200) {
          this.createList = s.msg;
          this.tagIndex = 0;
          this.previewhtml = true;
        }
      });
    },
    async table() {
      var list = await this.$http({ url: "tables/surface", data: {} });
      list.data.filter((s) => {
        if (s.msg.TABLE_COMMENT.split(";").length >= 2) {
          s.msg.TABLE_COMMENT = s.msg.TABLE_COMMENT.split(";")[0];
        } else {
          s.msg.TABLE_COMMENT = "";
        }
        return s;
      });
      this.resDate = list.data;
      this.tableData = this.resDate;
      this.$root.surfaceList = this.tableData;
      this.loading = false;
    },
  },
  async created() {
    this.loading = true;
    this.table();
    // 获取默认数据
    this.$http({
      url: "api/generalSettings",
      data: {
        type: "query",
      },
      success: (res) => {
        Object.keys(res.data).map((s) => {
          this[s] = res.data[s];
        });
      },
    });
  },
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
.gogeneral {
  float: right;
  margin-top: 15px;
  margin-bottom: 20px;
  margin-right: 49px;
}
.tonyon_list {
  width: 33.3%;
  display: inline-block;
}
.search {
  font-size: 15px;
  color: #999;
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
