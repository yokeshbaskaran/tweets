import "./App.css";
import { AppContextProvider, useAppContext } from "./context/AppContext";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Layout from "./pages/home/Layout";
import Homepage from "./pages/home/Homepage";
import Profile from "./pages/profile/Profile";
import Followers from "./pages/common/Followers";
import Following from "./pages/common/Following";
import CreatePost from "./pages/common/CreatePost";
import Search from "./pages/common/Search";
import Notifications from "./pages/common/Notifications";
import UserProfile from "./pages/profile/UserProfile";
import EditMyProfile from "./pages/profile/EditMyProfile";

const App = () => {
  const ProtectedRoute = ({ children }) => {
    const { authUser } = useAppContext();
    return authUser ? children : <Navigate to="/login" />;
    // return children;
  };

  const AuthRedirect = ({ children }) => {
    const { authUser } = useAppContext();
    return authUser ? <Navigate to="/" /> : children;
  };

  return (
    <>
      <AppContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Homepage  */}
            <Route
              index
              element={
                <>
                  <Homepage />
                </>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile/edit"
              element={
                <ProtectedRoute>
                  <EditMyProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/profile/:username"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="search"
              element={
                <ProtectedRoute>
                  <Search />
                </ProtectedRoute>
              }
            />
            <Route
              path="notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />
            <Route
              path="create"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
            />
            <Route
              path="followers"
              element={
                <ProtectedRoute>
                  <Followers />
                </ProtectedRoute>
              }
            />
            <Route
              path="following"
              element={
                <ProtectedRoute>
                  <Following />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Authentication  */}
          <Route
            path="login"
            element={
              <AuthRedirect>
                <Login />
              </AuthRedirect>
            }
          />
          <Route
            path="signup"
            element={
              <AuthRedirect>
                <Signup />
              </AuthRedirect>
            }
          />
        </Routes>
        <Toaster />
      </AppContextProvider>
    </>
  );
};

export default App;
