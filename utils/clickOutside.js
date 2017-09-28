// https://github.com/vue-bulma/click-outside/blob/master/index.js

function validate (binding) {
  if (typeof binding.value !== 'function') {
    console.warn('[Vue-click-outside:] provided expression', binding.expression, 'is not a function.')
    return false
  }

  return true
}

function isPopup (popupItem, elements) {
  if (!popupItem || !elements) return false
  for (var i = 0, len = elements.length; i < len; i++) {
    try {
      if (popupItem.contains(elements[i])) {
        return true
      }
      if (elements[i].contains(popupItem)) {
        return false
      }
    } catch (e) {
      return false
    }
  }

  return false
}

module.exports = {
  bind: function (el, binding, vNode) {
    if (!validate(binding)) return

    function handler (e) {
      if (!vNode.context) return

      var elements = e.path || (e.composedPath && e.composedPath())
      elements && elements.length > 0 && elements.unshift(e.target)

      if (el.contains(e.target) || isPopup(vNode.context.popupItem, elements)) return
      el.__vueClickOutside__.callback(e)
    }
    el.__vueClickOutside__ = {
      handler: handler,
      callback: binding.value
    }
    document.addEventListener('click', handler)
  },

  update: function (el, binding) {
    if (validate(binding)) el.__vueClickOutside__.callback = binding.value
  },

  unbind: function (el, binding) {
    document.removeEventListener('click', el.__vueClickOutside__.handler)
    delete el.__vueClickOutside__
  }
}
