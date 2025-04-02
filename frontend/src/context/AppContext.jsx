import { createContext, useContext, useState } from "react";
import { useFetchUser } from "../hooks/useFetchUser";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export const API_URL = import.meta.env.VITE_SERVER_APP_URL;

export const AppContextProvider = ({ children }) => {
  const [mobileNav, setMobileNav] = useState(false);
  const { data: authUser, isLoading, refetch } = useFetchUser();

  const contextValues = {
    mobileNav,
    setMobileNav,
    authUser,
    isLoading,
    refetch,
  };

  return (
    <>
      <AppContext.Provider value={contextValues}>
        {isLoading ? (
          <div className="h-screen flex justify-center items-center">
            <div className="loader"></div>
            Loading...
          </div>
        ) : (
          children
        )}
      </AppContext.Provider>
    </>
  );
};
