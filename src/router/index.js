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
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
