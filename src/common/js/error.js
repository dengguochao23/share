import { sendError } from '../../api/error'
// 定义的错误类型码
const ERROR_RUNTIME = 1
const ERROR_SCRIPT = 2
const ERROR_STYLE = 3
const ERROR_IMAGE = 4
const ERROR_AUDIO = 5
const ERROR_VIDEO = 6
const ERROR_CONSOLE = 7
const ERROR_TRY_CATCH = 8

const LOAD_ERROR_TYPE = {
  SCRIPT: ERROR_SCRIPT,
  LINK: ERROR_STYLE,
  IMG: ERROR_IMAGE,
  AUDIO: ERROR_AUDIO,
  VIDEO: ERROR_VIDEO,
  CONSOLE: ERROR_CONSOLE,
  TRY_CATCH: ERROR_TRY_CATCH
}

const MAX_ERROR = 20 // 最大存储错误的列表
export default class Error {
  constructor () {
    this.errorList = []
    this.timer = ''
  }
  async init () {
    await this.onError()
    await this.auto()
  }
  onError () {
    window.onerror = (message, source, lineno, colno, error) => {
      this.handleError(this.formatRuntimerError.apply(null, [message, source, lineno, colno, error]))
    }
    // 监听资源加载错误(JavaScript Scource failed to load)
    window.addEventListener('error', function (event) {
      // 过滤 target 为 window 的异常，避免与上面的 onerror 重复
      const errorTarget = event.target
      if (errorTarget !== window && errorTarget.nodeName && LOAD_ERROR_TYPE[errorTarget.nodeName.toUpperCase()]) {
        this.handleError(this.formatLoadError(errorTarget))
      }
    }, true)
  }
  formatLoadError (errorTarget) {
    return {
      type: LOAD_ERROR_TYPE[errorTarget.nodeName.toUpperCase()],
      desc: errorTarget.baseURI + '@' + (errorTarget.src || errorTarget.href),
      stack: 'no stack'
    }
  }
  formatRuntimerError (message, source, lineno, colno, error) {
    return {
      type: ERROR_RUNTIME,
      desc: message + ' at ' + source + ':' + lineno + ':' + colno,
      stack: error && error.stack ? error.stack : 'no stack' // IE <9, has no error stack
    }
  }

  handleError (errorLog) {
    this.pushError(errorLog)
  }
  pushError (errorLog) {
    if (this.errorList.length < MAX_ERROR) {
      this.errorList.push(errorLog)
    }
  }
  auto () {
    this.timer = setInterval(() => {
      this.report()
    }, 20000)
  }
  report () {
    if (this.errorList.length === 0) {
      return
    }
    sendError(this.errorList).then((res) => {
      this.errorList = []
    })
  }
}
