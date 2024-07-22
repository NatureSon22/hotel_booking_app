import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Toast from "../components/Toast";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Toast />
      <Header />
      <Hero />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
