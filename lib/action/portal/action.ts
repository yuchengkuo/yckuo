import { tick } from 'svelte'

export default function portal(
  element: HTMLElement,
  target: string | HTMLElement = 'body'
): SvelteActionReturnType {
  async function update(newTarget: string | HTMLElement) {
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
