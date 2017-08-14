export default function ({ store, route }, next) {
  const asidePage = ['about', 'music', 'heroes']
  const isAsidePage = !asidePage.includes(route.name)
  if (!Object.is(store.state.options.isAsidePage, isAsidePage)) {
    store.commit('options/CHANGE_ASIDE_PAGE', isAsidePage)
  }
  next()
}
