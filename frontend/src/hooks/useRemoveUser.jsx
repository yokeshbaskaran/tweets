import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../context/AppContext";
import toast from "react-hot-toast";

const useRemoveUser = () => {
  const queryClient = useQueryClient();

  const { mutate: remove, isPending } = useMutation({
    mutationFn: async (userId) => {
      // console.log("inside remove", userId);
      try {
        const response = await axios.delete(
          API_URL + `/users/remove/${userId}`,
          {
            withCredentials: true,
          }
        );

        const data = response.data;
        return data;
      } catch (error) {
        console.log("Error in useFollow", error);
      }
    },

    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] }),
        queryClient.invalidateQueries({ queryKey: ["authUser"] }),
        queryClient.invalidateQueries({ queryKey: ["userFollow"] }),
        queryClient.invalidateQueries({ queryKey: ["userProfile"] }),
      ]);
    },
    onError: (error) => {
      console.log("Error", error);
      toast.error(error.message);
    },
  });

  return { remove, isPending };
};

export default useRemoveUser;
