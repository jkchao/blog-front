export default function ({ store, route }, next) {
  const isSide = ['index', 'code', 'think', 'date-date', 'tag-tag', 'search-keyword', 'fuck']
  const isAsidePage = isSide.includes(route.name)
  if (!Object.is(store.state.options.isAsidePage, isAsidePage)) {
    store.commit('options/CHANGE_ASIDE_PAGE', false)
  }
  store.commit('options/CHANGE_WEL_PAGE', route.name === 'index')
  next()
}
