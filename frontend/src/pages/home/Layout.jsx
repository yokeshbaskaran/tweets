import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Layout = () => {
  return (
    <div className="w-full h-screen md:flex px-2">
      <Navbar />

      <div className="w-full md:ml-[220px] md:px-2 py-1 flex-1">
        <div className="max-md:pt-15 pb-8 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
