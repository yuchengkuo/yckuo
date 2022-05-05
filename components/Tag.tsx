export default function Tag({ label }: { label: string }) {
  return (
    <div
      className={`bg-violet-3 dark:bg-violetDark-3 text-violet-11 dark:text-violetDark-11 border-violet-5 dark:border-violetDark-5 w-fit rounded-full border px-2 py-px text-sm font-semibold body-font-settings`}
    >
      {label}
    </div>
  )
}
