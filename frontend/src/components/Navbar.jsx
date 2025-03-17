import { Link, useLocation } from "react-router-dom";
import { RxHamburgerMenu, RxAvatar } from "react-icons/rx";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaUserPlus, FaUsers } from "react-icons/fa";
import { MdLockPerson } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const navDetails = [
    { link: "/", icon: <IoHomeOutline size={25} />, linkName: "Home" },
    { link: "/profile", icon: <CgProfile size={25} />, linkName: "Profile" },
    { link: "/followers", icon: <FaUsers size={25} />, linkName: "Followers" },
    {
      link: "/following",
      icon: <FaUserPlus size={25} />,
      linkName: "Following",
    },
    {
      link: "/settings",
      icon: <IoSettingsOutline size={25} />,
      linkName: "Settings",
    },
    {
      link: "/auth",
      icon: <MdLockPerson size={25} />,
      linkName: "Login/Signup",
    },
  ];

  const { pathname } = useLocation();
  const { mobileNav, setMobileNav } = useAppContext();

  return (
    <>
      {/* Backdrop Overlay (like YouTube's) */}
      {mobileNav && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileNav(false)}
        ></div>
      )}

      {/* Desktop Sidebar */}
      <header className="hidden fixed top-0 left-0 h-screen w-[220px] bg-white px-2 py-1 md:flex flex-col">
        <div className="px-2 py-3 flex items-center gap-2">
          <img src="logo.png" alt="logo" width={30} height={30} />
          <h2 className="text-2xl font-medium text-app">Tweets</h2>
        </div>

        <nav className="mb-auto">
          <ul className="flex flex-col gap-2">
            {navDetails.map((item, idx) => {
              const isActive = pathname === item.link;
              return (
                <li key={idx}>
                  <Link
                    to={item.link}
                    className={`px-2 py-2 flex items-center gap-3 rounded transition-colors duration-300 ${
                      isActive
                        ? "bg-appColor text-white"
                        : "hover:text-appColor text-black"
                    }`}
                  >
                    {item.icon}
                    <span className="text-lg">{item.linkName}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="my-5 px-2">
          <div className="flex items-center gap-2">
            <RxAvatar className="size-10" />
            <div className="flex flex-col">
              <span className="text-lg font-semibold">@username</span>
              <span className="text-gray-500">@username</span>
            </div>
          </div>
          <button className="w-full my-1 py-2 flex justify-center items-center gap-3 rounded-4xl bg-appColor text-white hover:scale-105 transition-transform cursor-pointer">
            <span className="text-lg font-semibold">Logout</span>
            <LuLogOut size={20} />
          </button>
        </div>
      </header>

      {/* Mobile Topbar */}
      {!mobileNav && (
        <header className="md:hidden fixed top-0 left-0 w-full py-2 flex justify-between select-none z-50 shadow-md backdrop-blur-lg bg-white/30 border-b border-white/20">
          <div className="px-2 flex items-center gap-3">
            <RxHamburgerMenu
              size={40}
              onClick={() => {
                setMobileNav(!mobileNav);
              }}
              className="p-2 rounded-full transition-transform duration-300 hover:scale-105 hover:bg-neutral-200"
            />
            <div className="flex items-center gap-1 cursor-pointer">
              <img src="logo.png" alt="logo" width={30} height={30} />
              <h2 className="text-2xl font-medium text-app">Tweets</h2>
            </div>
          </div>

          {/* <div className="px-2 flex justify-center items-center gap-3">
            <RxAvatar size={35} />
            <button className="px-2 py-2 flex justify-center items-center gap-2 rounded-4xl bg-appColor text-white hover:scale-105 transition-transform cursor-pointer">
              <span className="text-md font-semibold">Logout</span>
              <LuLogOut size={20} />
            </button>
          </div> */}
        </header>
      )}

      {/* Mobile Sidebar */}
      {mobileNav && (
        <header
          className={`md:hidden fixed top-0 left-0 w-[220px] h-screen px-2 py-2 flex flex-col justify-between select-none bg-white z-50 shadow-md transition-all duration-300 ${
            mobileNav ? "animate-slide-in" : "animate-slide-out"
          }`}
        >
          <div className="flex items-center gap-3">
            <RxHamburgerMenu
              size={40}
              onClick={() => {
                setMobileNav(!mobileNav);
              }}
              className="p-2 rounded-full hover:bg-neutral-200"
            />
            <div className="flex items-center gap-1 cursor-pointer">
              <img src="logo.png" alt="logo" width={30} height={30} />
              <h2 className="text-2xl font-medium text-app">Tweets</h2>
            </div>
          </div>

          <nav className="mb-auto py-5">
            <ul className="flex flex-col gap-4">
              {navDetails.map((item, idx) => {
                const isActive = pathname === item.link;
                return (
                  <li key={idx}>
                    <Link
                      to={item.link}
                      className={`px-2 py-2 flex items-center gap-3 rounded transition-colors duration-300 ${
                        isActive
                          ? "bg-appColor text-white"
                          : "hover:text-appColor text-black"
                      }`}
                    >
                      {item.icon}
                      <span className="text-lg">{item.linkName}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="my-5 px-2">
            <div className="flex items-center gap-2">
              <RxAvatar className="size-10" />
              <div className="flex flex-col">
                <span className="text-lg font-semibold">@username</span>
                <span className="text-gray-500">@username</span>
              </div>
            </div>
            <button className="w-full my-1 py-2 flex justify-center items-center gap-3 rounded-4xl bg-appColor text-white hover:scale-105 transition-transform cursor-pointer">
              <span className="text-lg font-semibold">Logout</span>
              <LuLogOut size={20} />
            </button>
          </div>
        </header>
      )}
    </>
  );
};

export default Navbar;
