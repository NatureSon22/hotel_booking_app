import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import SearchField from "../components/SearchField";

const Layout = () => {
  const location = useLocation();
  const pathsWithHero = ["/", "/sign-in", "/sign-up"];

  return (
    <div className="flex min-h-screen flex-col">
      <Toast />
      <div className="relative">
        <Header />
        {pathsWithHero.includes(location.pathname) && <Hero />}
        <SearchField />
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
