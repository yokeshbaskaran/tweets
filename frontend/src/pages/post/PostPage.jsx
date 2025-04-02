import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../context/AppContext";

const PostPage = () => {
  const { id } = useParams();
  const postId = id;
  // console.log("post id", postId);
  const navigate = useNavigate();

  // const { data: singlePost } = useQuery({
  //   queryKey: ["userSinglePost"],
  //   queryFn: async () => {
  //     try {
  //       const res = await axios.get(API_URL + `/posts/user/${postId}`, {
  //         withCredentials: true,
  //       });
  //       const data = res.data;
  //       return data;
  //     } catch (error) {
  //       console.log("like-post", error);
  //     }
  //   },
  // });
  // console.log("singlePost", singlePost);

  return (
    <div>
      <button
        className="py-2 flex items-center gap-1 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <IoArrowBackOutline size={19} />
        <span className="text-lg">Back</span>
      </button>
    </div>
  );
};

export default PostPage;
