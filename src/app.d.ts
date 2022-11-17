/* eslint-disable */
/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces

import type { AttributifyAttributes } from 'unocss/preset-attributify'
declare global {
  namespace App {
    // interface Locals {}
    // interface Platform {}
    // interface Session {}
    // interface Stuff {}
  }
  namespace svelteHTML {
    interface HTMLAttributes<T> extends AttributifyAttributes {}
  }
}
