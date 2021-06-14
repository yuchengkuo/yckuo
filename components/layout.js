import Header from "./header";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <h1>Layout page</h1>
      {children}
    </div>
  );
};

export default Layout;
