import { tick } from 'svelte'

export default function portal(
  element: Element,
  target: string | Element = 'body'
): SvelteActionReturnType {
  async function update(newTarget: string | Element) {
    target = newTarget

    await tick()
    const targetEl = typeof target === 'string' ? document.querySelector(target) : target

    if (targetEl) targetEl.appendChild(element)
    element.removeAttribute('data-portal-hidden')
  }

  function destroy() {
    if (element.parentElement) {
      element.parentElement.removeChild(element)
    }
  }

  update(target)
  return {
    update,
    destroy,
  }
}
