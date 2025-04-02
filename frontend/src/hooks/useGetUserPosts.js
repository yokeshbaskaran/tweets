import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../context/AppContext";

//posts by username
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
  });
};

// all-posts
const getAllPosts = async () => {
  try {
    const res = await axios.get(API_URL + "/posts/all", {
      withCredentials: true,
    });
    const data = res.data;
    return data;
  } catch (error) {
    console.log("get posts", error);
  }
};

export const useGetAllPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });
};
