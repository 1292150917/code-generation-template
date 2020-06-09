/*
 * @Author: your name
 * @Date: 2020-06-04 18:31:33
 * @LastEditTime: 2020-06-09 19:38:27
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
		path: '/databaseCreate',
		component: () => import('@/views/databaseCreate')
	},
	{
		path: '/database',
		component: () => import('@/views/database')
	},
	{
		path: '/construction',
		component: () => import('@/views/construction')
	},
	{
		path: '/constructionedit',
		component: () => import('@/views/constructionedit')
	}
	]
}]

const router = new VueRouter({
	// mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
