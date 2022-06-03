import * as Select from '@radix-ui/react-select'
import { useRef, useState } from 'react'
import {
  useIsomorphicLayoutEffect,
  useLocalStorage,
  useMediaQuery,
  useReadLocalStorage,
  useUpdateEffect,
} from 'usehooks-ts'
import { LaptopIcon, MoonIcon, SelectIcon, SunIcon } from './Icons'

export const themeList = ['dark', 'light'] as const
export type ThemeList = typeof themeList[number]

export function useTheme() {
  const [prefer, setPrefer] = useState<ThemeList | 'system'>('system')
  const isFirst = useRef(true)

  const isDarkOS = useMediaQuery('(prefers-color-scheme: dark)')

  const storageTheme = useReadLocalStorage<ThemeList>('theme')
  useIsomorphicLayoutEffect(() => {
    if (storageTheme) setPrefer(storageTheme)
  }, [])

  const [theme, setTheme] = useLocalStorage<ThemeList>('theme', themeList[0])
  useIsomorphicLayoutEffect(() => {
    if (prefer === 'system') {
      localStorage.removeItem('theme')
    } else if (themeList.includes(prefer)) setTheme(prefer)
    if (isFirst.current) {
      isFirst.current = false
    } else {
      updateStyle()
    }
  }, [prefer])

  useUpdateEffect(() => {
    updateStyle()
  }, [isDarkOS])

  return { prefer, setPrefer }
}

function updateStyle() {
  if (
    localStorage.theme === '"dark"' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark', 'changing-theme')
  } else {
    document.documentElement.classList.remove('dark', 'changing-theme')
  }
  window.setTimeout(() => {
    document.documentElement.classList.remove('changing-theme')
  })
}

function SelectItem(props: Select.SelectItemProps) {
  return (
    <Select.Item
      {...props}
      className="hover:bg-gray-7 dark:hover:bg-grayDark-7 focus:bg-gray-7 dark:focus:bg-grayDark-7 flex cursor-pointer items-center justify-start gap-1 rounded px-2 py-0.5 text-base body-font-settings focus:outline-none"
    >
      {props.children}
    </Select.Item>
  )
}

export default function ThemeSelect() {
  const { prefer, setPrefer } = useTheme()
  type Prefer = typeof prefer
  return (
    <Select.Root value={prefer} onValueChange={(val: Prefer) => setPrefer(val)}>
      <Select.Trigger className="bg-gray-3 border-gray-6 hover:bg-gray-5 hover:border-gray-8 dark:bg-grayDark-3 dark:border-grayDark-6 dark:hover:bg-grayDark-5 dark:hover:border-grayDark-8 flex w-28 items-center justify-between gap-2 rounded border px-2 py-px text-sm transition-all duration-200 body-font-settings">
        <Select.Value />
        <Select.Icon>
          <SelectIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Content className="bg-gray-4 dark:bg-grayDark-4 border-gray-6 dark:border-grayDark-6 rounded-md border px-px py-1 shadow-xl">
        <Select.Viewport className="flex flex-col gap-1">
          <SelectItem value="system">
            <Select.Icon className="text-gray-11 dark:text-grayDark-11">
              <LaptopIcon />
            </Select.Icon>
            <Select.ItemText>System</Select.ItemText>
          </SelectItem>

          <SelectItem value="light">
            <Select.Icon className="text-gray-11 dark:text-grayDark-11">
              <SunIcon />
            </Select.Icon>
            <Select.ItemText>Light</Select.ItemText>
          </SelectItem>

          <SelectItem value="dark">
            <Select.Icon className="text-gray-11 dark:text-grayDark-11">
              <MoonIcon />
            </Select.Icon>
            <Select.ItemText>Dark</Select.ItemText>
          </SelectItem>
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  )
}
