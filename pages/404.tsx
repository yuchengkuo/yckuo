import Layout from '@components/layout/Layout'
import Link from 'next/link'

const NotFoundPage = () => {
  return (
    <Layout title="404" subtitle="The page doesn't exit. :(">
      <Link href="/" passHref>
        <a>
          <button className="mt-6 px-3 py-2 rounded bg-gray7/10 hover:scale-[1.05] hover:bg-gray7/20 transition-all duration-200 ease-out active:scale-95">
            &#8592; Home Page
          </button>
        </a>
      </Link>
    </Layout>
  )
}

export default NotFoundPage
