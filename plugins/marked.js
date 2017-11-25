import marked from 'marked'
import Hljs from '~/plugins/highlight.js'
const renderer = new marked.Renderer()

marked.setOptions({
  renderer,
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight (code) {
    return Hljs.highlightAuto(code).value
  }
})

// 段落解析
const paragraphParse = text => {
  const textIsImage = text.includes('<img')
  if (textIsImage) return `<div class="image-package">${text}</div>`
  return `<p>${text}</pp>`
}

// 对图片进行弹窗处理, 及懒加载处理
const imageParse = (src, title, alt) => {
  return `<img
            src="${src}?watermark/2/text/amtjaGFvLmNu/font/Y2FuZGFyYQ==/fontsize/400/fill/I0ZGRkZGRg=="
            title="${title || alt || 'jkchao.cn'}"
            data-src="${src}?watermark/2/text/amtjaGFvLmNu/font/Y2FuZGFyYQ==/fontsize/400/fill/I0ZGRkZGRg=="
            class="img-pop"/>
          <div class="img-caption">${title || alt || ''}</div>
          `
}

// 外链
const linkParse = (href, title, text) => {
  return `<a href="${href}" 
             target="_blank" >${text.slice(0, 20) + '...'}</a>`.replace(/\s+/g, ' ').replace('\n', '')
}

renderer.link = linkParse
renderer.paragraph = paragraphParse
renderer.image = imageParse

export default (content, tags, parseHtml = false) => {
  if (typeof content !== 'string') {
    return ''
  }

  marked.setOptions({ sanitize: !parseHtml })

  // 返回解析内容
  return marked(content, { renderer })
}
