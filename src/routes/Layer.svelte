<script lang="ts">
  import useTheme from '$lib/theme/useTheme'

  const { dark } = useTheme()
</script>

{#key $dark}
  <div
    role="presentation"
    class="fixed inset-0 pointer-events-none select-none z-0 no-js:hidden"
    before="content-none fixed inset-0 h-4% bg-bg/1 backdrop-blur-md"
    after="content-none fixed inset-x-0 bottom-0 h-4% bg-bg/1 backdrop-blur-md"
  />
{/key}

<style>
  div[role='presentation'] {
    animation: 1000ms scale;
    background-image: linear-gradient(
      rgba(var(--colors-bg), 0.1) 1%,
      transparent 2%,
      transparent 98%,
      rgba(var(--colors-bg), 0.1) 99%
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
  /* Workaround for hiding gradient when change color or mode */
  @keyframes scale {
    from {
      transform: scaleY(120%);
    }
    to {
      transform: scaleY(100%);
    }
  }
</style>
