import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
			path: '*',
			redirect: {
				name: 'index'
			}
		}, {
			path: '/login',
			name: 'login',
			meta: {
				requireAuth: false
			},
			component: () =>
				import ( /* webpackChunkName: "about" */ 'views/Login.vue')
		},
		{
			path: '/',
			name: 'index',
			meta: {
				requireAuth: true
			},
			component: () =>
				import ( /* webpackChunkName: "about" */ 'views/Index.vue')
		},
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () =>
				import ( /* webpackChunkName: "about" */ 'views/About.vue')
		}
	]
})