import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../context/AppContext";

const getUserPosts = async (username) => {
  try {
    const response = await axios.get(API_URL + `/posts/user/${username}`, {
      withCredentials: true,
    });

    const data = await response.data;
    return data;
  } catch (error) {
    console.log("Error in useGetUserPosts:", error.message);
  }
};

export const useGetUserPosts = (username) => {
  return useQuery({
    queryKey: ["userAllPosts", username],
    queryFn: () => getUserPosts(username),
    retry: 1,
  });
};
