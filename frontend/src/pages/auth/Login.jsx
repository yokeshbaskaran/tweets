import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../context/AppContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Authpage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async ({ username, password }) => {
    try {
      const res = await axios.post(
        API_URL + "/auth/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      const data = await res.data;
      // console.log("dta", data);
      return data;
    } catch (error) {
      const errMessage =
        error.response?.data?.error || "Register Failed! Retry Again!";
      // console.error("Signup error:", errMessage);
      throw new Error(errMessage);
    }
  };

  const { mutate, isError, error } = useMutation({
    mutationFn: (formData) => handleLogin(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });

      toast.success("Login Success");
      navigate("/");
    },
    onError: (err) => {
      console.error("Login failed!", err.message);
      toast.error(err.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("formData", formData);

    if (formData.username === "" || formData.password === "") {
      toast.error("Enter details to login!");
      return null;
    }

    mutate(formData);
  };

  return (
    <section className="h-full px-3 flex">
      {/* left section */}
      <div className="hidden w-1/2 lg:flex">
        <img
          src="auth.png"
          alt="auth-logo"
          className="w-full max-w-[700px] mx-auto p-24"
        />
      </div>

      {/* right section */}
      <div className="w-full lg:w-1/2 py-8 lg:p-8">
        <div className="mx-auto max-w-md flex flex-col justify-center space-y-3">
          <div className="flex flex-col items-start lg:items-center justify-center">
            <img
              src="logo.png"
              alt="logo"
              width={40}
              height={40}
              className="my-7 lg:my-10 self-center"
            />

            <h2 className="my-1 font-semibold text-3xl">
              Login to your account
            </h2>
            <p className="text-gray-500 text-lg">Enter your details to login</p>
          </div>

          <form onSubmit={handleSubmit} className="lg:px-3">
            <div className="mt-5">
              <input
                name="username"
                type="text"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleInputChange}
                className="input-form  placeholder:text-gray-400"
              />
            </div>

            <div className="mt-2">
              <input
                name="password"
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleInputChange}
                className="input-form  placeholder:text-gray-400"
              />
            </div>

            <button className="w-full mt-5 p-2 text-white bg-appColor rounded capitalize">
              login
            </button>
          </form>

          {/* Error message  */}
          <div
            className={`py-1 transition-opacity duration-300 ${
              isError && error ? "block" : "hidden"
            }`}
          >
            {isError && error && (
              <p className="text-red-400 text-center">{error.message}</p>
            )}
          </div>

          {/* divider  */}
          <div className="relative mt-1 mb-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-400"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>

          {/*Redirect button  */}
          <button
            className="text-center hover:underline hover:text-appColor"
            onClick={() => navigate("/signup")}
          >
            Don't have an account? Sign up
          </button>

          <div className="my-2 text-center text-gray-500 text-sm">
            By continuing, you agree to our
            <span className="hover:text-appColor underline">
              Terms of Service
            </span>
            <span className="px-1">and</span>
            <span className="hover:text-appColor underline">
              Privacy Policy.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Authpage;
