export default function clickOutside(element: Element, callback: (evnet?: Event) => void) {
  function onClick(event: Event) {
    if (!element.contains(event.target as Node)) {
      callback.call(this, event)
    }
  }

  const doc = element.ownerDocument ?? document
  doc.addEventListener('mousedown', onClick)

  return {
    update(newCallback: () => void) {
      callback = newCallback
    },
    destroy() {
      doc.removeEventListener('mousedown', onClick)
    }
  }
}
