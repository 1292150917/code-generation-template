<!--
 * @Author: your name
 * @Date: 2020-06-03 21:25:25
 * @LastEditTime: 2020-06-03 21:53:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nodec:\Users\zhamgzifang\Desktop\app\src\views\Home.vue
-->
<template>
	<div class="sidebar">
		<div>
			<el-menu
				default-active="2"
				class="el-menu-vertical-demo"
				@open="handleOpen"
				@close="handleClose"
				background-color="#545c64"
				text-color="#fff"
				active-text-color="#ffd04b"
			>
				<el-menu-item index="0">
					<i class="el-icon-menu"></i>
					<span slot="title">公告</span>
				</el-menu-item>
				<el-submenu index="1">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>数据库操作</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="1-1">数据库连接</el-menu-item>
						<el-menu-item @click="routerLink('construction')" index="1-2">数据库结构</el-menu-item>
						<el-menu-item @click="routerLink('database')" index="1-3">数据库数据</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="2">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>API操作</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="2-1">接口生成</el-menu-item>
						<el-menu-item index="2-2">文档生成</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="3">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>高级用法</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="3-1">创建代码</el-menu-item>
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
		<div><router-view></router-view></div>
	</div>
</template>

<script>
export default {
	name: 'sidebar',
	data() {
		return {};
	},
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		},
		routerLink(item){
			this.$router.push({path:item})
		}
	},
	created() {},
	components: {}
};
</script>
<style lang="scss">
.sidebar >div:nth-of-type(1) {
	width: 224px;
	float: left;
	height: 100vh;
	background: #545C64;
}
.sidebar >div:nth-of-type(2) {
	width: calc(100% - 224px);
	float: left;
}
</style>
