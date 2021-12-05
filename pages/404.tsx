import Layout from '@components/layout/Layout'
import Link from 'next/link'

const NotFoundPage = () => {
  return (
    <Layout title="404" subtitle="The page doesn't exit. :(">
      <button className="mt-6 px-3 py-2 rounded bg-gray7 bg-opacity-10 hover:scale-110 hover:bg-opacity-20 transition-all duration-200 ease-out active:scale-95">
        <Link href="/" passHref>
          <a>&#8592; Home Page</a>
        </Link>
      </button>
    </Layout>
  )
}

export default NotFoundPage
