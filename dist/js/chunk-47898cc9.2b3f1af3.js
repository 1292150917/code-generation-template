(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-47898cc9"],{2030:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"about"},[a("p",{staticStyle:{color:"#8066d6","font-size":"13px","margin-bottom":"12px"}},[e._v("下载完成后请解压到您之前生成代码的apidoc文件夹，然后通过您的地址+/apidoc访问即可")]),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"下载完成后请解压到代码public/apidoc/代码下",placement:"top-start"}},[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.generateCreate}},[e._v("生成选中文档")])],1),a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,"tooltip-effect":"dark"},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),a("el-table-column",{attrs:{label:"序号",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.index+1))]}}])}),a("el-table-column",{attrs:{prop:"name",label:"表名称",width:"120"}}),a("el-table-column",{attrs:{prop:"msg.TABLE_COMMENT",label:"表描述","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{prop:"msg.CREATE_TIME",label:"创建时间"}}),a("el-table-column",{attrs:{prop:"msg.UPDATE_TIME",label:"更新时间"}})],1),a("el-dialog",{attrs:{visible:e.previewhtml,"custom-class":"previewhtml_dialog",width:"80%","before-close":e.handleClose},on:{"update:visible":function(t){e.previewhtml=t}}},[a("div",{staticClass:"previewhtml"},[a("div",{staticClass:"previewhtml-tag"},e._l(e.createList,(function(t,n){return a("span",{key:n,class:e.tagIndex===n?"TagSelect":"",on:{click:function(t){e.tagIndex=n}}},[e._v(e._s(t.name))])})),0),e._l(e.createList,(function(t,n){return[e.tagIndex===n?a("div",{key:n},[a("pre",{staticClass:"previewhtml-main hljs"},[e._v("            "),a("code",{staticClass:"javascript",domProps:{innerHTML:e._s(t.msg)}}),e._v("\n          ")])]):e._e()]}))],2)]),a("el-dialog",{attrs:{title:"提示",visible:e.dialogVisible,width:"30%","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("div",[a("div",{staticClass:"demo-input-suffix"},[a("label",{attrs:{for:""}},[e._v("表名称:")]),a("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),a("div",{staticClass:"demo-input-suffix"},[a("label",{attrs:{for:""}},[e._v("表描述:")]),a("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.describe,callback:function(t){e.describe=t},expression:"describe"}})],1)]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.dialogVisibleClick}},[e._v("确 定")])],1)])],1)},i=[],r=(a("4de4"),a("4160"),a("b0c0"),a("ac1f"),a("1276"),a("159b"),a("96cf"),a("1da1")),l=a("1487"),s=a.n(l),o={name:"App",data:function(){return{createList:[],previewhtml:!1,tagIndex:"",ORMlist:["sequelize"],value:"",dialogVisible:!1,describe:"",input:"",name:"",update:!0,multipleSelection:[],tableData:[]}},watch:{tagIndex:function(){this.$nextTick((function(){var e=document.querySelector(".previewhtml-main");s.a.highlightBlock(e)}))}},methods:{generateCreate:function(){var e=[];this.multipleSelection.forEach((function(t){e.push(t.name)})),this.$http({url:"api/apiRender/render",method:"post",data:{name:e}}).then(Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:window.open("/api/apiRender/download");case 1:case"end":return e.stop()}}),e)}))))},handleSelectionChange:function(e){this.multipleSelection=e},tableUpdate:function(e,t){var a=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:a.$root.TheInterToGnerateJSON=t,a.$router.push({path:"/TheInterToGnerateJSON"});case 2:case"end":return e.stop()}}),e)})))()},handleClose:function(){this.previewhtml=!1},dialogVisibleClick:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a,n,i,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.update){t.next=7;break}return a={name:e.name,yuanName:e.update.name},t.next=4,e.$http({url:"tables/update",data:a});case 4:return n=t.sent,200===n.status&&(e.table(),e.dialogVisible=!1),t.abrupt("return");case 7:return i={describe:e.describe,name:e.name},t.next=10,e.$http({url:"tables/add",data:i});case 10:r=t.sent,200===r.status&&(e.table(),e.dialogVisible=!1);case 12:case"end":return t.stop()}}),t)})))()},handleEdit:function(e,t){var a=this;this.$http({url:"generate/create",method:"post",data:{name:[t.name]}}).then((function(e){200===e.status&&(a.createList=e.msg,a.tagIndex=0,a.previewhtml=!0)}))},table:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http({url:"tables/surface",data:{}});case 2:a=t.sent,a.data.filter((function(e){return e.msg.TABLE_COMMENT.split(";").length>=2?e.msg.TABLE_COMMENT=e.msg.TABLE_COMMENT.split(";")[0]:e.msg.TABLE_COMMENT="",e})),e.tableData=a.data;case 5:case"end":return t.stop()}}),t)})))()}},created:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.table();case 1:case"end":return t.stop()}}),t)})))()}},c=o,u=(a("f00b"),a("42e9"),a("2877")),d=Object(u["a"])(c,n,i,!1,null,"4a3ef74e",null);t["default"]=d.exports},"42e9":function(e,t,a){"use strict";var n=a("5db1"),i=a.n(n);i.a},"5db1":function(e,t,a){},"5e8d":function(e,t,a){},f00b:function(e,t,a){"use strict";var n=a("5e8d"),i=a.n(n);i.a}}]);
//# sourceMappingURL=chunk-47898cc9.2b3f1af3.js.map