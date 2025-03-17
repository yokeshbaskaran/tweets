import "./App.css";
import { Route, Routes } from "react-router-dom";
import Authpage from "./pages/auth/Authpage";
import NotFound from "./pages/auth/NotFound";
import Homepage from "./pages/home/Homepage";
import Layout from "./pages/home/Layout";
import { AppContextProvider } from "./context/AppContext";

const App = () => {
  return (
    <>
      <AppContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="/profile" element={<p>Profile page</p>} />
            <Route path="/followers" element={<p>followers page</p>} />
            <Route path="/following" element={<p>following page</p>} />
            <Route path="/settings" element={<p>settings page</p>} />
            <Route
              path="*"
              element={
                <p className="py-10 text-xl text-center">
                  Login or Register to view this page!
                </p>
              }
            />
          </Route>
          {/* <Route path="/nav" element={<Navbar />} /> */}
          <Route path="/auth" element={<Authpage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppContextProvider>
    </>
  );
};

export default App;
