import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _948827de = () => import('../pages/download.vue' /* webpackChunkName: "pages/download" */).then(m => m.default || m)
const _026f365a = () => import('../pages/wall.vue' /* webpackChunkName: "pages/wall" */).then(m => m.default || m)
const _5c910739 = () => import('../pages/think.vue' /* webpackChunkName: "pages/think" */).then(m => m.default || m)
const _543625bc = () => import('../pages/sitemap.vue' /* webpackChunkName: "pages/sitemap" */).then(m => m.default || m)
const _90829114 = () => import('../pages/code.vue' /* webpackChunkName: "pages/code" */).then(m => m.default || m)
const _2b675600 = () => import('../pages/fuck.vue' /* webpackChunkName: "pages/fuck" */).then(m => m.default || m)
const _62f76672 = () => import('../pages/book.vue' /* webpackChunkName: "pages/book" */).then(m => m.default || m)
const _360be054 = () => import('../pages/about.vue' /* webpackChunkName: "pages/about" */).then(m => m.default || m)
const _0d203fb9 = () => import('../pages/tag/_tag.vue' /* webpackChunkName: "pages/tag/_tag" */).then(m => m.default || m)
const _6ad01938 = () => import('../pages/search/_keyword.vue' /* webpackChunkName: "pages/search/_keyword" */).then(m => m.default || m)
const _6db53c35 = () => import('../pages/date/_date.vue' /* webpackChunkName: "pages/date/_date" */).then(m => m.default || m)
const _05baf6b0 = () => import('../pages/article/_id.vue' /* webpackChunkName: "pages/article/_id" */).then(m => m.default || m)
const _55c3bb19 = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash && document.querySelector(to.hash)) {
        // scroll to anchor by returning the selector
        position = { selector: to.hash }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/download",
			component: _948827de,
			name: "download"
		},
		{
			path: "/wall",
			component: _026f365a,
			name: "wall"
		},
		{
			path: "/think",
			component: _5c910739,
			name: "think"
		},
		{
			path: "/sitemap",
			component: _543625bc,
			name: "sitemap"
		},
		{
			path: "/code",
			component: _90829114,
			name: "code"
		},
		{
			path: "/fuck",
			component: _2b675600,
			name: "fuck"
		},
		{
			path: "/book",
			component: _62f76672,
			name: "book"
		},
		{
			path: "/about",
			component: _360be054,
			name: "about"
		},
		{
			path: "/tag/:tag?",
			component: _0d203fb9,
			name: "tag-tag"
		},
		{
			path: "/search/:keyword?",
			component: _6ad01938,
			name: "search-keyword"
		},
		{
			path: "/date/:date?",
			component: _6db53c35,
			name: "date-date"
		},
		{
			path: "/article/:id?",
			component: _05baf6b0,
			name: "article-id"
		},
		{
			path: "/",
			component: _55c3bb19,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
