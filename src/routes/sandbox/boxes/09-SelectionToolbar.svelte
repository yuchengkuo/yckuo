<script lang="ts">
  import clickOutside from '$lib/action/clickoutside'
  import placePopover from '$lib/action/placePopover'
  import portal from '$lib/action/portal/action'
  import { motion } from '$lib/animation/motion'
  import { outro } from '$lib/animation/out'
  import { tick } from 'svelte'

  let textarea: HTMLTextAreaElement
  let menu: HTMLElement
  let selectionStart = 0
  let selectionEnd = 0
  let value = 'Select text to show toolbar.'

  const items = [
    {
      icon: 'i-ri-bold',
      label: 'Add bold text',
      onClick: async () => {
        value =
          value.slice(0, selectionStart) +
          '**' +
          value.slice(selectionStart, selectionEnd) +
          '**' +
          value.slice(selectionEnd)

        await tick()
        textarea.focus()
        textarea.selectionStart = selectionStart + 2
        textarea.selectionEnd = selectionEnd + 2
      },
    },
    {
      icon: 'i-ri-italic',
      label: 'Add italic text',
      onClick: async () => {
        value =
          value.slice(0, selectionStart) +
          '_' +
          value.slice(selectionStart, selectionEnd) +
          '_' +
          value.slice(selectionEnd)

        await tick()
        textarea.focus()
        textarea.selectionStart = selectionStart + 1
        textarea.selectionEnd = selectionEnd + 1
      },
    },
    {
      icon: 'i-ri-code-view',
      label: 'Add code',
      onClick: async () => {
        value =
          value.slice(0, selectionStart) +
          '`' +
          value.slice(selectionStart, selectionEnd) +
          '`' +
          value.slice(selectionEnd)

        await tick()
        textarea.focus()
        textarea.selectionStart = selectionStart + 1
        textarea.selectionEnd = selectionEnd + 1
      },
    },
    {
      icon: 'i-ri-heading',
      label: 'Add heading',
      onClick: async () => {
        value = value.slice(0, selectionStart) + '## ' + value.slice(selectionStart)

        await tick()
        textarea.focus()
        textarea.selectionStart = selectionStart + 3
        textarea.selectionEnd = selectionEnd + 3
      },
    },
  ]

  function onSelectionChange() {
    selectionStart = textarea.selectionStart
    selectionEnd = textarea.selectionEnd
  }

  function resetSelection(e: Event) {
    if (menu && !menu.contains(e.target as HTMLElement)) selectionEnd = selectionStart = 0
  }

  function onSend() {
    value = ''
    textarea.focus()
  }
</script>

<div>
  <div
    class="flex items-start gap-2"
    children="p-2 rounded bg-rx-gray-1 border-1 border-border outline-none transition focus:border-rx-gray-6"
  >
    <textarea
      class="resize-none selection-text-rx-gray-1 selection-bg-rx-gray-12"
      rows="3"
      cols="32"
      placeholder="Start typing..."
      bind:this={textarea}
      bind:value
      on:selectionchange={onSelectionChange}
      use:clickOutside={resetSelection}
    />
    <button
      class="leading-none"
      hover="bg-rx-gray-4 shadow-sm"
      active="translate-x-px"
      on:click={onSend}><span class="i-bxs-send align-mid" /></button
    >
  </div>
  <div class="font-500 text-xs text-fg-secondary mt-2">Only works on Firefox now...</div>
</div>

{#if selectionEnd - selectionStart !== 0}
  <div
    class="p-1 bg-rx-gray-2 border-1 border-rx-gray-5 rounded-md shadow-md"
    children="inline-block w-8 h-8 rounded leading-none hover:bg-rx-gray-6"
    role="menu"
    bind:this={menu}
    out:outro
    use:portal
    use:placePopover={{ trigger: textarea, placement: 'top', alignment: 'start' }}
    use:motion={{
      initial: { opacity: 0, transform: 'translateY(4px) scale(0.94)' },
      animate: { opacity: 1, transform: 'none' },
      exit: { opacity: 0, transform: 'translateY(4px) scale(0.94)' },
      transition: { duration: 0.1, allowWebkitAcceleration: true },
    }}
  >
    {#each items as item}
      <button on:click={item.onClick} title={item.label}
        ><span class="{item.icon} align-mid" /></button
      >
    {/each}
  </div>
{/if}
