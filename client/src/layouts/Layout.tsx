import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Toast from "../components/Toast";

const Layout = () => {
  const location = useLocation();
  const pathsWithHero = ["/", "/sign-in", "/sign-up"];

  return (
    <div className="flex flex-col min-h-screen">
      <Toast />
      <Header />
      { pathsWithHero.includes(location.pathname) && <Hero /> }
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
