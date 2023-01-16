<script lang="ts">
  import { page } from '$app/stores'
  import { motion } from '$lib/animation/motion'

  let pathnames: string[]

  $: pathnames = $page.url.pathname.split('/')

  const fadeInConfig = {
    initial: { opacity: 0.001 },
    animate: { opacity: 1 },
    transition: { delay: 0.4, duration: 0.4 },
  }
</script>

{#if $page.url.pathname !== '/'}
  <header
    class="pt-20 mb-4"
    data-sveltekit-preload-data
    data-sveltekit-preload-code
    use:motion={fadeInConfig}
  >
    <div class="w-full flex items-center gap-2 max-w-56ch mx-auto py-2" children="text-sm">
      {#each pathnames as path, index}
        <a
          class="h-fit attr font-Azeret font-500 tracking-tighter"
          href={index === 0 ? '/' : pathnames.slice(0, index + 1).join('/')}
        >
          {#if index === 0}
            <div class="h-4 w-4">
              <svg viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect
                  width="480"
                  height="480"
                  rx="120"
                  fill="fg/90"
                  class="transition-all transition"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M151.836 234.855C151.836 233.205 151.452 231.577 150.714 230.101L120.003 168.679C116.469 161.611 121.609 153.294 129.511 153.294H188.553H247.594C255.497 153.294 260.636 161.611 257.102 168.679L181.328 320.228C179.527 323.83 175.846 326.105 171.819 326.105H129.511C121.609 326.105 116.469 317.788 120.003 310.72L150.714 249.298C151.452 247.822 151.836 246.194 151.836 244.544V234.855ZM291.402 326.105H232.361C224.458 326.105 219.318 317.788 222.852 310.72L298.627 159.171C300.428 155.569 304.109 153.294 308.135 153.294H351.223C359.051 153.294 364.194 161.468 360.807 168.525L329.089 234.604C328.374 236.093 328.016 237.729 328.044 239.381L328.206 249.079C328.233 250.731 328.646 252.354 329.41 253.819L359.012 310.557C362.705 317.634 357.57 326.105 349.587 326.105H291.402Z"
                  fill="bg"
                />
                <g opacity="0.2" filter="url(#filter0_f_1138_2894)">
                  <path
                    d="M298.96 153.668H334.838L249.253 326.706H213.375L298.96 153.668Z"
                    fill="#050505"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_f_1138_2894"
                    x="153.577"
                    y="93.8707"
                    width="241.058"
                    height="292.633"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feGaussianBlur
                      stdDeviation="29.8986"
                      result="effect1_foregroundBlur_1138_2894"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
          {:else}
            {path}
          {/if}
        </a>
        {#if pathnames.length !== index + 1}
          <span opacity="50">/</span>
        {/if}
      {/each}
    </div>
  </header>
{/if}
