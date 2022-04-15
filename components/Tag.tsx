export default function Tag({ label }: { label: string }) {
  return (
    <div
      className={`body-font-settings font-semibold text-sm w-fit bg-violet-3 dark:bg-violetDark-3 text-violet-11 dark:text-violetDark-11 border border-violet-5 dark:border-violetDark-5 px-2 py-px rounded-full`}
    >
      {label}
    </div>
  )
}
