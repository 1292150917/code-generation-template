<!--
 * @Author: your name
 * @Date: 2020-06-04 18:31:33
 * @LastEditTime: 2020-06-30 20:56:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nodec:\Users\zhamgzifang\Desktop\code-generation-template\src\views\appletOfWeChat.vue
--> 
<template>
  <div class="appletOfWeChat">
    <div>
      <el-input placeholder="请输入内容" v-model="AppID">
        <template slot="prepend">AppID</template>
      </el-input>
    </div>
    <div style="margin-top:10px;margin-bottom:10px">
      <el-input placeholder="请输入内容" v-model="AppSecret">
        <template slot="prepend">AppSecret</template>
      </el-input>
    </div>
    <div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="name" label="方法" width="180"></el-table-column>
        <el-table-column prop="address" label="需要参数" width="180"></el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">生成</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 预览代码 -->
    <el-dialog :visible.sync="previewhtml" custom-class="previewhtml_dialog" width="80%">
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
  </div>
</template>

<script>
import hljs from "highlight.js";
export default {
  name: "App",
  data() {
    return {
      previewhtml: false,
      input1: "",
      AppID: "",
      AppSecret: "",
      tagIndex:'',
      createList: [],
      tableData: [
        {
          name: "code获取openid",
          address: ""
        },
        {
          name: "微信小程序支付生成",
          address: ""
        }
      ]
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
    handleEdit() {
      this.$http({
        url: "JApplet/code",
        data: {
          AppSecret: this.AppSecret,
          AppID: this.AppID
        },
        method: "get"
      }).then(s => {
        if (s.status === 200) {
          this.createList = s.data
          this.tagIndex = 0;
          this.previewhtml = true;
        }
      });
    }
  },
  async created() {}
};
</script>
<style lang="scss">
.appletOfWeChat {
  table {
    width: 100% !important;
  }
}
</style>

<style lang="scss">
.previewhtml_dialog {
  background: #f8f8f8;
  height: calc(92% - 54px);
  overflow: auto;
  margin-top: 54px !important;
  box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.4);
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