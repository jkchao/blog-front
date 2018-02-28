import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _27bad5f6 = () => import('../pages/wall.vue' /* webpackChunkName: "pages/wall" */).then(m => m.default || m)
const _1a7cdd47 = () => import('../pages/think.vue' /* webpackChunkName: "pages/think" */).then(m => m.default || m)
const _18c18632 = () => import('../pages/fuck.vue' /* webpackChunkName: "pages/fuck" */).then(m => m.default || m)
const _505196a4 = () => import('../pages/book.vue' /* webpackChunkName: "pages/book" */).then(m => m.default || m)
const _0d3eb343 = () => import('../pages/download.vue' /* webpackChunkName: "pages/download" */).then(m => m.default || m)
const _4684b04a = () => import('../pages/sitemap.vue' /* webpackChunkName: "pages/sitemap" */).then(m => m.default || m)
const _1810933c = () => import('../pages/about.vue' /* webpackChunkName: "pages/about" */).then(m => m.default || m)
const _64a306eb = () => import('../pages/tag/_tag.vue' /* webpackChunkName: "pages/tag/_tag" */).then(m => m.default || m)
const _50ea35c6 = () => import('../pages/search/_keyword.vue' /* webpackChunkName: "pages/search/_keyword" */).then(m => m.default || m)
const _20ba0232 = () => import('../pages/date/_date.vue' /* webpackChunkName: "pages/date/_date" */).then(m => m.default || m)
const _8e25cf94 = () => import('../pages/article/_id.vue' /* webpackChunkName: "pages/article/_id" */).then(m => m.default || m)
const _13af9127 = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



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
			path: "/wall",
			component: _27bad5f6,
			name: "wall"
		},
		{
			path: "/think",
			component: _1a7cdd47,
			name: "think"
		},
		{
			path: "/fuck",
			component: _18c18632,
			name: "fuck"
		},
		{
			path: "/book",
			component: _505196a4,
			name: "book"
		},
		{
			path: "/download",
			component: _0d3eb343,
			name: "download"
		},
		{
			path: "/sitemap",
			component: _4684b04a,
			name: "sitemap"
		},
		{
			path: "/about",
			component: _1810933c,
			name: "about"
		},
		{
			path: "/tag/:tag?",
			component: _64a306eb,
			name: "tag-tag"
		},
		{
			path: "/search/:keyword?",
			component: _50ea35c6,
			name: "search-keyword"
		},
		{
			path: "/date/:date?",
			component: _20ba0232,
			name: "date-date"
		},
		{
			path: "/article/:id?",
			component: _8e25cf94,
			name: "article-id"
		},
		{
			path: "/",
			component: _13af9127,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
