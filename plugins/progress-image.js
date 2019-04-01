/**
 * 渐进式图片处理
 */

function loadedSmallImg(e) {
  const fillElement = e.previousElementSibling;
  const width = e.width;
  const height = e.height;

  fillElement.style.paddingTop = ((height / width) * 100).toFixed(2) + '%';
  e.classList.add('loaded');
}

if (process.browser) {
  window.loadedSmallImg = loadedSmallImg;
}
