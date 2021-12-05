export default function ArticleLayout({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <main className="px-10 phone:px-5">
      {children}
      <div></div>
    </main>
  )
}
