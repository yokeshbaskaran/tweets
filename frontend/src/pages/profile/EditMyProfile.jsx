import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const EditMyProfile = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
    socialLinks: "",
    profileImage: null,
    coverImage: null,
  });

  const navigate = useNavigate();
  const { authUser } = useAppContext();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setFormData({
      username: authUser?.username,
      fullName: "",
      email: authUser?.email,
      password: "",
      confirmPassword: "",
      bio: authUser?.bio,
      socialLinks: "",
      profileImage: null,
      coverImage: null,
    });
  }, [authUser]);

  //   const handleFileChange = (e) => {
  //     setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  //   };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="px-2">
      <div className="w-full">
        <h2 className="py-3 pb-5 text-2xl font-semibold">Edit Your Profile</h2>
        <div>
          <h3 className="font-normal">Username</h3>

          <input
            type="text"
            name="username"
            placeholder="Username"
            className="input-form"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <h3 className="font-normal">Full Name</h3>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="input-form"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div>
          <h3 className="font-normal">Email</h3>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input-form"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <h3 className="font-normal">Password</h3>
          <input
            type="password"
            name="password"
            placeholder="........"
            className="input-form"
            value={formData.password}
            onChange={handleChange}
            disabled
          />
        </div>
        <div>
          <h3 className="font-normal">Confirm Password</h3>
          <input
            type="password"
            name="confirmPassword"
            placeholder="........"
            className="input-form"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled
          />
        </div>

        <div>
          <h3 className="font-normal">Bio</h3>
          <textarea
            name="bio"
            placeholder="Bio"
            className="input-form h-24"
            rows="3"
            value={formData.bio}
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <h3 className="font-normal">Links</h3>
          <input
            type="text"
            name="socialLinks"
            placeholder="Social Links"
            className="input-form"
            value={formData.socialLinks}
            onChange={handleChange}
          />
        </div>

        <div>
          <h3 className="font-normal"> Profile Image</h3>
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            // onChange={handleFileChange}
          />
        </div>
        <br />
        <div>
          <h3 className="font-normal"> Cover Image</h3>
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            // onChange={handleFileChange}
          />
        </div>
        <br />

        <div className="py-1 pb-5 flex justify-start gap-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-500 hover:opacity-80 text-white rounded"
          >
            Cancel
          </button>

          <button className="px-4 py-2 bg-appColor hover:opacity-80 text-white rounded">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMyProfile;
