import Layout from '@components/layout/Layout'

export default function Home() {
  return (
    <Layout title="YuCheng Kuo" subtitle="Digital Designer, Engineer" animateChildren>
      <p className="max-w-[500px] body-font-settings">
        Hey, I&apos;m YuCheng. I am a self-taught designer and engineer from Taiwan. I&apos;m
        currently helping building{' '}
        <a
          href="https://oen.tw"
          className="decoration-gray-9 dark:decoration-grayDark-9 underline transition-all duration-200 ease-out hover:decoration-inherit"
        >
          Oen.tw
        </a>
      </p>
    </Layout>
  )
}
