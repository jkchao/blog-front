import marked from 'marked'
import Hljs from '~/plugins/highlight.js'
const languages = ['cpp', 'xml', 'bash', 'coffeescript', 'css', 'markdown', 'http', 'java', 'javascript', 'json', 'less', 'makefile', 'nginx', 'php', 'python', 'scss', 'sql', 'stylus']
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
  highlight (code, lang) {
    if (!~languages.indexOf(lang)) {
      return Hljs.highlightAuto(code).value
    }
    return Hljs.highlight(lang, code).value
  }
})

// 段落解析
const paragraphParse = text => {
  const textIsImage = text.includes('<img')
  if (textIsImage) return `<div class="image-package">${text}</div>`
  return `<p>${text}</p>`
}

// 对图片进行弹窗处理, 及懒加载处理
const imageParse = (src, title, alt) => {
  return `<img
            src="${src}?imageMogr2/auto-orient/interlace/1/blur/1x0/quality/75|watermark/2/text/amtjaGFvLmNu/font/5qW35L2T/fontsize/720/fill/I0ZERkRGRA==/dissolve/100/gravity/SouthEast/dx/10/dy/10|imageslim"
            title="${title || alt || 'jkchao.cn'}"
            data-src="${src}"
            class="img-pop"/>
          <div class="img-caption">${title || alt || ''}</div>
          `
}

// 外链
const linkParse = (href, title, text) => {
  return `<a href="${href}"
             target="${href.substr(0, 1) === '#' ? '_self' : '_blank'}" 
             class="${href.substr(0, 1) === '#' ? '' : 'c-link'}">
             ${
                href.substr(0, 1) === '#'
                ? text
                : text.length > 40
                  ? text.slice(0, 40) + '...'
                  : text
              }
          </a>`.replace(/\s+/g, ' ').replace('\n', '')
}

renderer.link = linkParse
renderer.paragraph = paragraphParse
renderer.image = imageParse

export default (content, tags, parseHtml = false) => {
  if (typeof content !== 'string') {
    return ''
  }

  // 生成目录树
  var toc = []

  const headingParse = function (text, level, raw) {
    var anchor = this.options.headerPrefix + raw.toLowerCase().replace(/[^\w]+/g, '-')
    if (level >= 4 || level === 1) return `<h${level} id="${anchor}">${text}</h${level}>\n`
    toc.push({
      anchor: `#header-${toc.length}`,
      level: level,
      text: text
    })
    return `<h${level} id="header-${toc.length - 1}">${text}</h${level}>\n`
  }

  marked.setOptions({ sanitize: !parseHtml })

  renderer.heading = headingParse

  let html = marked(content, { renderer })

  // 返回解析内容
  return { html, toc }
}
