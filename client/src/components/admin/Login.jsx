import React, { useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {

  const { axios, setToken} = useAppContext()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e ) => {
    try {
      e.preventDefault()
      if (email.length < 1 || password.length <1) {
        toast.error("Enter complete credentials")
      }
      const {data} = await axios.post("/api/admin/login", {
        email, password
      })
      
      if (data.success) {
        setToken(data.token)
        localStorage.setItem("token", data.token)
        axios.defaults.headers.common['Authorization'] = data.token;
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen flex items-center justify-center  px-4"
    >
      <div className="flex flex-col gap-5 w-full max-w-sm bg-white shadow-lg p-8 rounded-xl text-sm ">
        <p className="text-2xl font-semibold text-center text-primary">
          Admin<span className="text-black"> Login</span>
        </p>

        <div className="w-full">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="w-full">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
