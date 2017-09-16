import marked from 'marked'
import Hljs from 'highlight.js'
const renderer = new marked.Renderer()

marked.setOptions({
  renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight (code) {
    return Hljs.highlightAuto(code).value
  }
})

// 段落解析
const paragraphParse = text => `<p>${text}</p>`

// 外链
const linkParse = (href, title, text) => {
  return `<a href="${href}" 
             target="_blank" >${text}</a>`.replace(/\s+/g, ' ').replace('\n', '')
}

renderer.link = linkParse
renderer.paragraph = paragraphParse

export default (content, tags, parseHtml = false) => {
  if (typeof content !== 'string') {
    return ''
  }

  // 返回解析内容
  return marked(content, { renderer })
}
