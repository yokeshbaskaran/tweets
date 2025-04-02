import { IoTrashOutline } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { IoHeart } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL, useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Notifications = () => {
  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      try {
        const res = await axios.get(API_URL + "/notifications", {
          withCredentials: true,
        });
        const data = res.data;
        return data;
      } catch (error) {
        console.log("notification", error);
      }
    },
  });
  const queryClient = useQueryClient();

  const { mutate: deleteNotifications } = useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.delete(API_URL + "/notifications", {
          withCredentials: true,
        });
        const data = res.data;
        return data;
      } catch (error) {
        console.log("delete Notifications", error);
      }
    },
    onSuccess: () => {
      toast.error("all notifications Deleted");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const handleDeleteNotifications = () => {
    if (confirm("Are you sure want to delete allnotifications! ")) {
      deleteNotifications();
    }
  };

  // console.log("notifications", notifications);

  return (
    <section className="px-2">
      <div className="flex justify-between items-center border-b border-gray-400">
        <h2 className="py-3 pb-4 text-2xl font-semibold">Notifications</h2>

        <button
          className="p-1 rounded-full hover:bg-gray-200"
          onClick={handleDeleteNotifications}
        >
          <IoTrashOutline size={22} color="red" />
        </button>
      </div>

      {notifications?.map((notification) => (
        <SingleNotification
          key={notification._id}
          notification={notification}
        />
      ))}
      {notifications?.length === 0 && (
        <div className="py-10 text-center">
          <span className="text-lg text-gray-500">No Notifications yet!</span>
        </div>
      )}
    </section>
  );
};

export default Notifications;

export const SingleNotification = ({ notification }) => {
  const { authUser } = useAppContext();

  const isMyProfile = authUser?.username === notification?.from?.username;
  // console.log("notification", notification);
  return (
    <div>
      <div className="py-1 border-b border-gray-300">
        <div className="flex justify-between items-center gap-2 py-2">
          <Link
            className="max-md:hidden"
            to={`/user/profile/${notification.from.username}`}
          >
            {/* Profile Image Container */}
            <div className="size-14 object-cover rounded-full">
              {notification.from?.profileImg ? (
                <img
                  src={notification.from?.profileImg}
                  alt="user-pic"
                  className="size-full object-contain"
                />
              ) : (
                <RxAvatar className="size-full px-2" />
              )}
            </div>
          </Link>

          <div className="flex items-center mr-auto gap-2">
            {isMyProfile ? (
              ""
            ) : (
              <Link
                to={`/user/profile/${notification.from.username}`}
                className="text-lg font-bold"
              >
                @{notification.from?.username}
              </Link>
            )}

            <span className="text-gray-500">
              {" "}
              {notification.type === "like"
                ? isMyProfile
                  ? "you liked your post"
                  : "liked your post"
                : "followed you"}
            </span>
          </div>

          <div>
            {notification.type === "follow" && (
              <FaUserAlt className="size-7 p-1" color="#1d9bf0" />
            )}

            {notification.type === "like" && (
              <IoHeart className="size-7" color="red" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
