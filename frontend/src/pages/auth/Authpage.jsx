import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../context/AppContext";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const Authpage = () => {
  const [auth, setauth] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    console.log("User logined");
  };

  const handleRegister = async ({ username, email, password }) => {
    try {
      const response = await axios.post(API_URL + "/auth/signup", {
        username,
        email,
        password,
      });

      const data = await response.data;
      if (!response.ok)
        throw new Error(data.error || "Failed to create account");
      console.log(data);
      return data;
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong. Please try again."
      );
    }
  };

  const { mutate, isError, error } = useMutation({
    mutationFn: auth ? handleLogin : handleRegister,
    onSuccess: (data) => {
      console.log("User registered success!", data);
    },
    onError: (err) => {
      toast.error("Not registered", err.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("formData", formData);
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
              {!auth ? "Create an account" : "Login to your account"}
            </h2>
            <p className="text-gray-500 text-lg">
              Enter your details to
              {!auth ? " create account" : " login"}
            </p>
          </div>

          <form className="lg:px-3">
            {auth ? (
              <div className="mt-5 flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-appColor">
                <input
                  name="username"
                  type="text"
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="block min-w-0 grow py-2 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                />
              </div>
            ) : (
              <>
                <div className="mt-5 flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-appColor">
                  <input
                    name="username"
                    type="text"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="block min-w-0 grow py-2 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>

                {/* <div className="mt-5 flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-appColor">
                        <input
                          name="fullname"
                          type="text"
                          placeholder="Enter username"
                          className="block min-w-0 grow py-2 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                        />
                      </div> */}

                <div className="mt-5 flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-appColor">
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block min-w-0 grow py-2 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </>
            )}

            <div className="mt-5 flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-appColor">
              <input
                name="password"
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleInputChange}
                className="block min-w-0 grow py-2 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full mt-5 my-2 p-2 text-white bg-appColor rounded capitalize"
            >
              {auth ? "login" : "register"}
            </button>
          </form>

          <div>
            {isError && error && (
              <p className="text-red-500 text-center">{error.message}</p>
            )}
          </div>

          {/* divider  */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-400"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>

          {/* Login/Signup button  */}
          <button
            className="text-center hover:underline hover:text-appColor"
            onClick={() => setauth(!auth)}
          >
            {!auth
              ? "Already having a account? Login here"
              : "Don't have an account? Sign up"}
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
