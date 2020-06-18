<!--
 * @Author: your name
 * @Date: 2020-06-04 18:31:33
 * @LastEditTime: 2020-06-18 20:04:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nodec:\Users\zhamgzifang\Desktop\code-generation-template\src\views\homePage.vue
--> 
<template>
  <div class="homePage">
    <h1>代码生成器(框架生成说明介绍)</h1>
    <h3>介绍</h3>
    <p>该套代码生成器仅限于 node框架内的结构生成规则, 所有生成的实现统一在服务端进行处理, 然后返回, 如需要进行修改, 修改后台服务的接口实现即可。</p>
    <h3>内容</h3>
    <p>目前整套的生成内容主要围绕整套框架的设计结构进行, 覆盖后台(WCF接口、数据接口、业务层)、前台的代码生成(View 及ViewModel层), 如下所示。</p>
    <h3>在线解析</h3>
    <p class="jiexi">
      <span>在线解析</span>
      <ul>
        <li>自动生成接口文档，清晰可读永远最新</li>
        <li>自动校验与格式化，支持高亮和收展</li>
        <li>自动生成各种语言代码，一键下载</li>
        <li>自动管理与测试接口用例，一键共享</li>
        <li>自动给请求JSON加注释，一键切换</li>
      </ul>
      <span>对于前端</span>
      <ul>
        <li>不用再向后端催接口、求文档</li>
        <li>数据和结构完全定制，要啥有啥</li>
        <li>看请求知结果，所求即所得</li>
        <li>可一次获取任何数据、任何结构</li>
        <li>能去除重复数据，节省流量提高速度</li>
      </ul>
      <span>对于后端</span>
      <ul>
        <li>提供通用接口，大部分API不用再写</li>
        <li>自动生成文档，不用再编写和维护</li>
        <li>自动校验权限、自动管理版本、自动防SQL注入</li>
        <li>开放API无需划分版本，始终保持兼容</li>
        <li>支持增删改查、模糊搜索、正则匹配、远程函数等</li>
      </ul>
    </p>
  </div>
</template>
<style lang="scss">
.homePage {
  line-height: 40px;
  height: 100%;
  overflow: auto;
}
.jiexi{
  span{
    font-weight: 800;
  }
  ul{
    list-style: inside;
    text-indent: 26px;
  }
}
</style>