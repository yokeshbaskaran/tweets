import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../context/AppContext";

const fetchUserDetails = async () => {
  try {
    const response = await axios.get(API_URL + "/auth/getme", {
      withCredentials: true,
    });

    const data = response.data;
    return data;
  } catch (error) {
    console.log("Error in getMe", error.message);
  }
};

export const useFetchUser = () => {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: fetchUserDetails,
    retry: 1,
  });
};
