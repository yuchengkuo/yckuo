<script lang="ts">
  import { onMount } from 'svelte'

  let dark = false
  let color = false
  let theme = ''

  onMount(() => {
    dark = document.documentElement.classList.contains('dark')
    color = document.documentElement.classList.contains('decolorize')
    const callback: MutationCallback = function (list) {
      for (const mutation of list) {
        if (mutation.attributeName === 'class') {
          dark = document.documentElement.classList.contains('dark')
          color = document.documentElement.classList.contains('decolorize')
        }
        if (mutation.attributeName === 'data-theme')
          theme = document.documentElement.getAttribute('data-theme') || ''
      }
    }
    const observer = new MutationObserver(callback)
    observer.observe(document.documentElement, {
      attributeFilter: ['class', 'data-theme'],
    })
    return () => {
      observer.disconnect()
    }
  })
</script>

{#key dark + theme + color}
  <div
    role="presentation"
    class="fixed inset-0 pointer-events-none select-none z-0 no-js:hidden"
    before="content-none fixed inset-0 h-5% bg-bg/1 backdrop-blur-md"
    after="content-none fixed inset-x-0 bottom-0 h-5% bg-bg/1 backdrop-blur-md"
  />
{/key}

<style>
  div[role='presentation'] {
    animation: 1000ms scale;
    background-image: linear-gradient(
      rgba(var(--colors-bg), 0.4) 2%,
      transparent 4%,
      transparent 96%,
      rgba(var(--colors-bg), 0.4) 98%
    );
  }
  div[role='presentation']::before {
    mask: linear-gradient(black, transparent);
    -webkit-mask: linear-gradient(black, transparent);
  }
  div[role='presentation']::after {
    mask: linear-gradient(transparent, black);
    -webkit-mask: linear-gradient(transparent, black);
  }
  @keyframes scale {
    from {
      transform: scaleY(120%);
    }
    to {
      transform: scaleY(100%);
    }
  }
</style>
