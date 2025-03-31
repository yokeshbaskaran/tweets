import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../context/AppContext";

const useFollow = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (userId) => {
      const response = await axios.post(API_URL + `/users/follow/${userId}`, {
        withCredentials: true,
      });

      const data = response.data;
      console.log(data);
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["suggested"] });
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      console.log("Error", error);
    },
  });

  return <div>useFollow</div>;
};

export default useFollow;
