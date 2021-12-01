import { domAnimation, LazyMotion } from 'framer-motion';

export default function Layout({ children }) {
  return (
    <LazyMotion features={domAnimation}>
      <main className="px-10 phone:px-5" style={{ minHeight: 'calc(100vh - 216px)' }}>
        {children}
      </main>
    </LazyMotion>
  );
}
