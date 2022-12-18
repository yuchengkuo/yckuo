/* eslint-disable */
/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces

import type { AttributifyAttributes } from 'unocss/preset-attributify'
import type { MotionEventNames } from 'motion'

type SvelteMotionEventNames = `on:${MotionEventNames}`
type MotionEvnet<T> = (event: CustomEvent<any> & { target: EventTarget & T }) => any

interface MotionEvents<T> extends Partial<Record<SvelteMotionEventNames, MotionEvnet<T>>> {}

declare global {
  namespace App {
    // interface Locals {}
    // interface Platform {}
    // interface Session {}
    // interface Stuff {}
  }
  namespace svelteHTML {
    interface HTMLAttributes<T> extends MotionEvents<T> {}
    interface HTMLAttributes extends AttributifyAttributes {}
  }
}
