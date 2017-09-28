function checkImgs (el) {
  const imgs = Array.from(document.querySelectorAll(el))
  imgs.forEach(item => io.observe(item))
}

function loadImg (el) {
  if (!el.src) {
    const source = el.dataset.src
    el.src = source
  }
}

const io = new IntersectionObserver(ioes => {
  ioes.forEach(ioe => {
    const el = ioe.target
    const intersectionRatio = ioe.intersectionRatio
    if (intersectionRatio > 0 && intersectionRatio <= 1) {
      loadImg(el)
    }
    el.onload = el.onerror = () => io.unobserve(el)
  })
})

export default checkImgs
