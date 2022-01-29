export default function Tag({ label }: { label: string }) {
  return (
    <>
      <div className="inline-block rounded-md px-0.5 py-px text-xs font-medium bg-gray5 border-gray6 border-[1px] text-gray9 dark:text-gray5 dark:border-gray8 dark:bg-gray9">
        {label}
      </div>
    </>
  )
}
