/*
 * @Author: your name
 * @Date: 2020-06-04 18:31:33
 * @LastEditTime: 2020-06-29 22:37:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nodec:\Users\zhamgzifang\Desktop\code-generation-template\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import wgSidebar from '../components/wg-sidebar/sidebar.vue'
Vue.use(VueRouter)

const routes = [{
	path: '/',
	name: 'Home',
	component: wgSidebar,
	redirect: "/homePage",
	children: [{
		path: '/homePage',
		component: () => import('@/views/homePage')
	}, {
		path: '/TheInterfaceToGenerate',
		component: () => import('@/views/TheInterfaceToGenerate')
	}, {
		path: '/sql',
		component: () => import('@/views/sql')
	}, {
		path: '/documentgeneration',
		component: () => import('@/views/documentgeneration')
	},
	{
		path: '/databaseCreate',
		component: () => import('@/views/databaseCreate')
	},
	{
		path: '/InterfaceView',
		component: () => import('@/views/InterfaceView')
	},
	{
		path: '/codeAssociated',
		component: () => import('@/views/codeAssociated')
	},
	{
		path: '/database',
		component: () => import('@/views/database')
	},
	{
		path: '/constructionedit',
		component: () => import('@/views/constructionedit')
	},
	{
		path: '/appletOfWeChat',
		component: () => import('@/views/appletOfWeChat')
	},
	{
		path: '/TheInterToGnerateJSON',
		component: () => import('@/views/TheInterToGnerateJSON')
	}
	]
}]

const router = new VueRouter({
	// mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
