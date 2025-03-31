import { createContext, useContext, useEffect, useState } from "react";
import { useFetchUser } from "../hooks/useFetchUser";
import axios from "axios";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export const API_URL = import.meta.env.VITE_SERVER_APP_URL;

export const AppContextProvider = ({ children }) => {
  const [mobileNav, setMobileNav] = useState(false);
  const { data: authUser, isLoading, refetch } = useFetchUser();

  // useEffect(() => {
  //   getUsers();
  // }, []);

  // const getUsers = async () => {
  //   const res = await axios.get(API_URL + "/users/suggested", {
  //     withCredentials: true,
  //   });
  //   const data = res.data;
  //   console.log(data);
  // };
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
