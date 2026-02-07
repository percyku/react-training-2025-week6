import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

const FrontendLayout = () => {
  return (
    <div className="container">
      <header>
        <Nav />
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="mt-5 text-center">
        <p>© 2026 我的練習網站</p>
      </footer>
    </div>
  );
};

export default FrontendLayout;
