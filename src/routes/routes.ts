import LandingPage from '../pages/Landing/landing-page.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: LandingPage,
	},
	{
		path: '/products',
		name: 'Products',
		component: () => import('../pages/Category/category-page.vue'),
		props: (route: any) => ({ category: route.query.category }),
	},
	{
		path: '/product/:sku',
		name: 'Product',
		component: () => import('../pages/Product/product-page.vue'),
		props: (route: any) => ({ sku: route.params.sku }),
	},
	{
		path: '/all',
		name: 'All',
		component: () => import('../pages/Category/products-page.vue'),
	},
	{
		path: '/checkout',
		component: () => import('../pages/Checkout/checkout-page.vue'),
	},
	{
		path: '/404',
		component: () => import('../pages/404/404-page.vue'),
	},
	{
		path: '/:pathMatch(.*)',
		component: () => import('../pages/404/404-page.vue'),
	},
]

const Router = createRouter({
	history: createWebHistory(),
	routes,

	scrollBehavior(_1, _2, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { top: 0 }
		}
	},
})

export default Router
