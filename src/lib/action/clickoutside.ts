export default function clickOutside(element: Element, callback: () => void) {
  function onClick(event: Event) {
    if (!element.contains(event.target as Node)) {
      event.stopPropagation()
      callback.call(this)
    }
  }

  document.body.addEventListener('click', onClick, true)
  document.body.addEventListener('contextmenu', onClick, true)

  return {
    update(newCallback: () => void) {
      callback = newCallback
    },
    destroy() {
      document.body.removeEventListener('click', onClick, true)
      document.body.removeEventListener('contextmenu', onClick, true)
    },
  }
}
