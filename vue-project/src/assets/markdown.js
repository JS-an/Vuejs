import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

let rendererMD = new marked.Renderer()
rendererMD.code = function (code) {
  return `<pre class="hljs"><code>${hljs.highlightAuto(code).value}</code></pre>`
}
const md = (msg) => {
  marked.setOptions({
    renderer: rendererMD,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  })
  return marked(msg, {sanitize: true})
}
export default md
