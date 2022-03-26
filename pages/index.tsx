import Layout from '@components/layout/Layout'

export default function Home() {
  return (
    <Layout title="YuCheng Kuo" subtitle="Digital Designer, Engineer" animateChildren>
      <p className="body-font-settings max-w-[500px]">
        Hey, I'm YuCheng. I am a self-taught designer and engineer from Taiwan. I'm currently
        helping building{' '}
        <a
          href="https://oen.tw"
          className="underline decoration-gray-9 dark:decoration-grayDark-9 hover:decoration-inherit transition-all duration-200 ease-out"
        >
          Oen.tw
        </a>
      </p>
    </Layout>
  )
}
