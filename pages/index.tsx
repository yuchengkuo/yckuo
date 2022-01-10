import Layout from '@components/layout/Layout'

export default function Home() {
  return (
    <Layout title="YuCheng Kuo" subtitle="Digital Designer, Engineer" animateChildren>
      <p className="text-lg phone:text-base body-font-settings mt-4 max-w-[500px] text-gray9 dark:text-gray5">
        Hey, I'm YuCheng. I am a self-taught designer and engineer from Taiwan. I'm currently
        helping building{' '}
        <a
          href="https://oen.tw"
          className="underline decoration-gray7 hover:decoration-inherit transition-all duration-200 ease-out"
        >
          Oen.tw
        </a>
      </p>
    </Layout>
  )
}
