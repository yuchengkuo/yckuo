import Layout from '@components/layout/Layout'
import Link from 'next/link'

const NotFoundPage = () => {
  return (
    <Layout title="404" subtitle="The page doesn't exit. :(">
      <Link href="/" passHref>
        <a>
          <button className="bg-gray/10 hover:bg-gray/20 rounded px-4 py-2 font-apfel text-base transition-all duration-200 ease-out hover:-translate-y-1 active:scale-95">
            Home page
          </button>
        </a>
      </Link>
    </Layout>
  )
}

export default NotFoundPage
