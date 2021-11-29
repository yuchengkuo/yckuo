export default function Layout({ children }) {
  return (
    <main className="px-10 phone:px-5" style={{ minHeight: 'calc(100vh - 216px)' }}>
      {children}
    </main>
  );
}
