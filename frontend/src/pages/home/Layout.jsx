import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Layout = () => {
  return (
    <div className="w-full h-screen md:flex px-2">
      <Navbar />

      <div className="md:ml-[220px] px-2 py-2 flex-1">
        <div className={`max-md:py-15`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
