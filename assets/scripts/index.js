import Vue from '../../node_modules/vue/dist/vue.esm.js'
import VueRouter from '../../node_modules/vue-router'

// page
import indexPage from '../pages/index.vue'
import aboutPage from '../pages/about.vue'
import contactPage from '../pages/contact.vue'
import topics01Page from '../pages/topics/topics01.vue'
import topics02Page from '../pages/topics/topics02.vue'
import topics03Page from '../pages/topics/topics03.vue'
import topics04Page from '../pages/topics/topics04.vue'
import topics05Page from '../pages/topics/topics05.vue'
import topics06Page from '../pages/topics/topics06.vue'
import topics07Page from '../pages/topics/topics07.vue'


document.addEventListener('DOMContentLoaded', () => {
	obkt.vue()
})


const obkt = {
	vue: () => {
		// VueRouterを使用
		Vue.use(VueRouter)

		const routes = [
			{ path: '/', component: indexPage },
			{ path: '/about', component: aboutPage },
			{ path: '/contact', component: contactPage },
			{ path: '/topics01', component: topics01Page },
			{ path: '/topics02', component: topics02Page },
			{ path: '/topics03', component: topics03Page },
			{ path: '/topics04', component: topics04Page },
			{ path: '/topics05', component: topics05Page },
			{ path: '/topics06', component: topics06Page },
			{ path: '/topics07', component: topics07Page },
		]

		const router = new VueRouter({
			mode: 'history',
			routes,
		})

		const app = new Vue({
			el: '#app',
			router,
			data: {
				spnav: {
					status: true,
					class: 'is--close'
				}
			},
			methods: {
				navigation: function() {
					this.spnav.status = !this.spnav.status
					if(this.spnav.status) {
						this.spnav.class = 'is--open'
					}else {
						this.spnav.class = 'is--close'
					}
				}
			}
		})
	},


}