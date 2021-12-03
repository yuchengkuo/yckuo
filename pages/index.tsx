import Layout from '@components/layout/Layout';

export default function Home() {
  return (
    <Layout title="YuCheng Kuo" subtitle="Digital Designer, Engineer" animateChildren>
      <p className="text-base font-freak mt-4 text-gray8 dark:text-gray6">
        Currently @{' '}
        <a href="https://oen.tw" className="hover:bg-gray7 hover:bg-opacity-30">
          Oen.tw
        </a>
      </p>
    </Layout>
  );
}
