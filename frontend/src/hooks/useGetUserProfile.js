import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../context/AppContext";

const getUserProfile = async (username) => {
  try {
    // Fetch user profile
    const res = await axios.get(API_URL + `/users/profile/${username}`, {
      withCredentials: true,
    });
    const data = await res.data;
    return data;
  } catch (error) {
    console.log("Error in user profile", error);
  }
};

export const useGetUserProfile = (username) => {
  return useQuery({
    queryKey: ["userProfile", username],
    queryFn: () => getUserProfile(username),
    retry: 1,
  });
};

const getUserFollow = async () => {
  try {
    // Fetch user profile
    const res = await axios.get(API_URL + `/users/follow`, {
      withCredentials: true,
    });
    const data = await res.data;
    return data;
  } catch (error) {
    console.log("Error in getUserFollow", error);
  }
};

export const useGetUserFollow = () => {
  return useQuery({
    queryKey: ["userFollow"],
    queryFn: getUserFollow,
  });
};
