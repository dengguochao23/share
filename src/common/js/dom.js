export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }
  let classArray = el.className.split(' ')
  classArray.push(className)
  el.className = classArray.join(' ')
}
export function removeClass (el, className) {
  if (!hasClass(el, className)) {
    return
  }
  let classArray = el.className.split(' ')
  let index = classArray.findIndex((c) => {
    return c === className
  })
  classArray.splice(index, 1)
  el.className = classArray.join(' ')
}

export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
