import Layout from '@components/layout/Layout'
import Link from 'next/link'

const NotFoundPage = () => {
  return (
    <Layout title="404" subtitle="The page doesn't exit. :(">
      <Link href="/" passHref>
        <a>
          <button className="font-apfel px-4 py-2 text-base rounded bg-gray/10 hover:-translate-y-1 hover:bg-gray/20 transition-all duration-200 ease-out active:scale-95">
            Home page
          </button>
        </a>
      </Link>
    </Layout>
  )
}

export default NotFoundPage
