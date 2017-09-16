export default function ({ store, route }, next) {
  const unside = ['about', 'music', 'heros', 'article-id']
  const isAsidePage = !unside.includes(route.name)
  if (!Object.is(store.state.options.isAsidePage, isAsidePage)) {
    store.commit('options/CHANGE_ASIDE_PAGE', isAsidePage)
  }
  next()
}
