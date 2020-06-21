<!--
 * @Author: your name
 * @Date: 2020-06-04 18:31:33
 * @LastEditTime: 2020-06-21 16:47:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nodec:\Users\zhamgzifang\Desktop\code-generation-template\src\views\construction.vue
--> 
<template>
  <div class="codeAssociated">
    <p style="
    color: #8066d6;
    font-size: 13px;
    margin-bottom: 12px;">请首先把代码解压到文件夹 并选择文件夹位置</p>
    <el-form ref="form" label-width="100px">
      <el-form-item label="代码地址">
        <el-input type="test" placeholder="D:xxxx/Dave格式目录"  v-model="catalogue"></el-input>
      </el-form-item>
    </el-form>
    <p></p>
    <el-button type="primary" size="small" class="addxinz" @click="catalogueGo()">确定</el-button>
    <!-- <el-button type="primary" size="small" class="addxinz" @click="relyOn()">安装依赖</el-button> -->
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      catalogue: ""
    };
  },
  methods: {
    relyOn() {
      this.$http({
        url: "advanced/relyOn",
        data: {},
        method: "post"
      }).then(s => {
        if (s.status === 200) {
          console.log(s);
        }
      });
    },
    catalogueGo() {
      this.$http({
        url: "advanced/relevance",
        data: { catalogue: this.catalogue },
        method: "post"
      }).then(s => {
        if (s.status === 200) {
          console.log(s);
        }
      });
    }
  },
  async created() {}
};
</script>
<style lang="scss" scoped="scoped">
</style>
