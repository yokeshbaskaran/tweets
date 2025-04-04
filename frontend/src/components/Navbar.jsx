import { Link, useLocation, useNavigate } from "react-router-dom";
import { RxHamburgerMenu, RxAvatar } from "react-icons/rx";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaUserPlus, FaUsers } from "react-icons/fa";
import { MdLockPerson } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { TbBellRinging } from "react-icons/tb";
import { IoSearch } from "react-icons/io5";
import { BiMessageRoundedAdd } from "react-icons/bi";
import { API_URL, useAppContext } from "../context/AppContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { mobileNav, setMobileNav, refetch } = useAppContext();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      await axios.post(
        API_URL + "/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
    },
    onSuccess: async () => {
      toast.success("User logout!");
      queryClient.removeQueries({ queryKey: ["authUser"] });
      await refetch();
      navigate("/login");
    },
    onError: (error) => {
      console.error("Logout failed:", error.message);
      toast.error("Failed to log out. Please try again.");
    },
  });

  const handleLogout = () => {
    if (confirm("Are you sure want to logout!")) {
      mutate();
      toast.success("Logout Success");
      // location.reload();
    }
  };

  //data from context
  const { authUser } = useAppContext();

  //Nav-Links
  const authenticatedNav = [
    {
      link: "/",
      icon: <IoHomeOutline size={25} />,
      linkName: "Home",
    },
    {
      link: "/myprofile",
      icon: <CgProfile size={25} />,
      linkName: "Profile",
    },
    {
      link: "/search",
      icon: <IoSearch size={25} />,
      linkName: "Search",
    },
    {
      link: "/notifications",
      icon: <TbBellRinging size={25} />,
      linkName: "Notifications",
    },
    {
      link: "/create",
      icon: <BiMessageRoundedAdd size={25} />,
      linkName: "Create Post",
    },
    // {
    //   link: "/followers",
    //   icon: <FaUsers size={25} />,
    //   linkName: "Followers",
    // },
    // {
    //   link: "/following",
    //   icon: <FaUserPlus size={25} />,
    //   linkName: "Following",
    // },
  ];

  const unauthenticatedNav = [
    {
      link: "/",
      icon: <IoHomeOutline size={25} />,
      linkName: "Home",
    },
    {
      link: "/login",
      icon: <MdLockPerson size={25} />,
      linkName: "Login/Signup",
    },
  ];

  const navDetails = authUser ? authenticatedNav : unauthenticatedNav;

  return (
    <div>
      {/* Backdrop Overlay */}
      {mobileNav && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileNav(false)}
        ></div>
      )}

      {/* Desktop Sidebar */}
      <header className="hidden fixed top-0 left-0 h-screen w-[220px] bg-white px-2 py-1 md:flex flex-col">
        <Link to="/" className="px-2 py-3 flex items-center gap-2">
          <img src="/logo.png" alt="logo" width={30} height={30} />
          <h2 className="text-2xl font-medium text-app">Tweets</h2>
        </Link>

        <nav className="mb-auto mt-2">
          <ul className="flex flex-col gap-3">
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

        {/* User profile  */}
        {authUser && (
          <div className="my-5 px-2">
            <div className="flex items-center gap-0">
              <Link
                to="myprofile"
                className="size-14 -mt-1 object-cover rounded-full"
              >
                {/* Profile Image Container */}
                {authUser?.profileImg ? (
                  <img
                    src={authUser?.profileImg}
                    alt="user-pic"
                    className="size-full object-contain"
                  />
                ) : (
                  <RxAvatar className="size-full px-2" />
                )}
              </Link>

              <div className="flex flex-col">
                <Link
                  to="myprofile"
                  className="text-lg font-semibold capitalize"
                >
                  {authUser?.username}
                </Link>
                <Link to="myprofile" className="text-gray-500">
                  @{authUser?.username}
                </Link>
              </div>
            </div>

            {/* Logout button  */}
            <button
              className="w-full my-2 py-2 flex justify-center items-center gap-3 rounded-4xl bg-appColor text-white hover:scale-105 transition-transform cursor-pointer"
              onClick={handleLogout}
            >
              <span className="text-lg font-semibold">Logout</span>
              <LuLogOut size={20} />
            </button>
          </div>
        )}
      </header>

      {/* Mobile Topbar */}
      {!mobileNav && (
        <header className="md:hidden fixed top-0 left-0 w-full py-1 flex justify-between select-none z-50 shadow-md backdrop-blur-lg bg-white/30 border-b border-white/20">
          <div className="px-2 flex items-center gap-3">
            <RxHamburgerMenu
              size={40}
              onClick={() => {
                setMobileNav(!mobileNav);
              }}
              className="p-2 rounded-full transition-transform duration-300 hover:scale-105 hover:bg-neutral-200"
            />
            <Link to="/" className="flex items-center gap-1 cursor-pointer">
              <img src="/logo.png" alt="logo" width={30} height={30} />
              <h2 className="text-2xl font-medium text-app">Tweets</h2>
            </Link>
          </div>

          {!authUser ? (
            <div className="px-2 py-1">
              <Link
                to="/login"
                className="w-full px-5 py-1 flex justify-center items-center gap-3 rounded-4xl bg-appColor text-white hover:scale-105 transition-transform cursor-pointer"
              >
                <span className="text-lg font-medium">Login</span>
              </Link>
            </div>
          ) : (
            <div className="px-2">
              <Link to="myprofile">
                {authUser?.profileImg ? (
                  <img
                    src={authUser.profileImg}
                    alt="user-profile"
                    className="size-12"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <RxAvatar size={30} color="#1d9bf0" />
                    <span className="text-[12px]">My Profile</span>
                  </div>
                )}
              </Link>
            </div>
          )}
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
            <Link to="/" className="flex items-center gap-1 cursor-pointer">
              <img src="/logo.png" alt="logo" width={30} height={30} />
              <h2 className="text-2xl font-medium text-app">Tweets</h2>
            </Link>
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

          {authUser && (
            <div className="my-5 px-2">
              <div className="flex items-start gap-2">
                <Link to="myprofile">
                  {authUser?.profileImg ? (
                    <img
                      src={authUser.profileImg}
                      alt="user-profile"
                      className="size-14"
                    />
                  ) : (
                    <>
                      <RxAvatar size={40} color="#1d9bf0" />
                    </>
                  )}
                </Link>

                <div className="flex flex-col items-start">
                  <span className="text-lg font-semibold capitalize">
                    {authUser?.username}
                  </span>
                  <Link to="myprofile" className="text-gray-500">
                    @{authUser?.username}
                  </Link>
                </div>
              </div>

              <button
                className="w-full my-2 py-2 flex justify-center items-center gap-3 rounded-4xl bg-appColor text-white hover:scale-105 transition-transform cursor-pointer"
                onClick={handleLogout}
              >
                <span className="text-lg font-semibold">Logout</span>
                <LuLogOut size={20} />
              </button>
            </div>
          )}
        </header>
      )}
    </div>
  );
};

export default Navbar;
