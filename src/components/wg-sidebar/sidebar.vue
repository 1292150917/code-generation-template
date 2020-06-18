<!--
 * @Author: your name
 * @Date: 2020-06-03 21:25:25
 * @LastEditTime: 2020-06-18 21:08:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nodec:\Users\zhamgzifang\Desktop\app\src\views\Home.vue
-->
<template>
  <div class="sidebar">
    <div>
      <el-menu
        :collapse="collapse"
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="99" @click="routerLink('homePage','公告','99')">
          <i class="el-icon-menu"></i>
          <span slot="title">公告</span>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>数据库操作</span>
          </template>
          <el-menu-item-group>
            <el-menu-item @click="routerLink('databaseCreate','数据库连接','1-1')" index="1-1">数据库连接</el-menu-item>
            <el-menu-item @click="routerLink('constructionedit','数据库结构','1-2')" index="1-2">数据库结构</el-menu-item>
            <el-menu-item @click="routerLink('database','数据库数据','1-3')" index="1-3">数据库数据</el-menu-item>
            <!-- <el-menu-item @click="routerLink('sql','本地sql查询','1-4')" index="1-4">本地sql查询</el-menu-item> -->
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>API操作</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              index="2-1"
              @click="routerLink('TheInterfaceToGenerate','接口生成','2-1')"
            >接口生成</el-menu-item>
            <el-menu-item index="2-2" @click="routerLink('documentgeneration','文档生成','2-2')">文档生成</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>高级用法</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-2">代码关联</el-menu-item>
            <el-menu-item index="3-3">接口查看</el-menu-item>
            <el-menu-item index="3-4">路由配置</el-menu-item>
            <el-menu-item index="3-5">文档说明</el-menu-item>
            <el-menu-item index="3-6">其他操作</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="4" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">定时任务</span>
        </el-menu-item>
        <el-menu-item index="4" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">微信公众号专区</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-setting"></i>
          <span slot="title">操作监控</span>
        </el-menu-item>
        <el-menu-item index="6" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">微信小程序专区</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div>
      <div class="nav-title">
        <svg
          @click="collapse = !collapse"
          data-v-4e6f274c
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          class="hamburger"
        >
          <path
            data-v-4e6f274c
            d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
          />
        </svg>
        Dashboard
      </div>
      <div class="nav-biaoqian">
        <el-tag
          class="biaqoian"
          closable
          color="#fff"
          @close="tagClose(index)"
          :type="typeWarning(item)"
          :key="index"
          @click="routerLink(item.router,item.name,item.index)"
          v-for="(item,index) in taglist"
        >{{item.name}}</el-tag>
      </div>
      <div class="routerView">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sidebar",
  data() {
    return {
      collapse: false,
      defaultActive: "0",
      taglist: []
    };
  },
  watch: {
    taglist() {
      sessionStorage.taglist = JSON.stringify(this.taglist);
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    tagClose(index) {
      this.taglist.splice(index, 1);
    },
    typeWarning(item) {
      if ("/" + item.router !== this.$route.path) {
        return "warning";
      }
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    routerLink(item, name, index) {
      if (this.$route.path === `/${item}`) {
        return;
      }
      this.defaultActive = index;
      var v = this.taglist.filter(s => s.name === name);
      if (v.length === 0) {
        this.taglist.push({
          name: name,
          router: item,
          index
        });
      }
      sessionStorage.defaultActive = index;
      this.$router.push({ path: item });
    }
  },
  created() {
    if (sessionStorage.taglist) {
      this.taglist = JSON.parse(sessionStorage.taglist);
      this.defaultActive = sessionStorage.defaultActive;
    }
  },
  components: {}
};
</script>
<style  lang="scss">
.nav-biaoqian {
  background: #ffffff;
  border-top: 1px solid #d8dce5;
  border-bottom: 1px solid #d8dce5;
  padding-left: 15px;
  .biaqoian {
    margin-top: 5px;
    margin-bottom: 5px;
    margin-right: 8px;
  }
}
.routerView {
  background: #fff;
  height: calc(100vh - 135px);
  margin: 10px;
  padding: 16px;
  padding-bottom: 0;
}
.nav-title {
  height: 50px;
  background: #ffffff;
  color: #ddd;
}
.hamburger {
  margin-top: 15px;
  margin-left: 15px;
}
.sidebar > div:nth-of-type(1) {
  width: 224px;
  float: left;
  height: 100vh;
  background: #545c64;
}
.sidebar > div:nth-of-type(2) {
  width: calc(100% - 224px);
  float: left;
}
</style>
