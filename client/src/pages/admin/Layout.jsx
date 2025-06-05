import React from "react";
import { assets } from "../../assets/assets";
import { Outlet, useNavigate } from "react-router-dom"; // added useNavigate import
import SideBar from "../../components/admin/SideBar";
import { useAppContext } from "../../../context/AppContext";

const Layout = () => {  // renamed to PascalCase
  const navigate = useNavigate();
  const { axios, setToken } = useAppContext(); // fixed typo

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];  // better to delete header
    setToken(null);
    navigate("/");
  };

  return (
    <>
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-2 border-b border-gray-300">
        <div className="flex gap-2 items-center text-2xl">
          <img
            src={assets.logo}
            alt="logo"
            className="w-6 sm:w-10 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <strong className="pt-1 text-xs sm:text-lg">AyushDocs</strong>
        </div>
        <button
          onClick={logout}
          className="cursor-pointer flex justify-center items-center gap-2 px-6 py-1.5 text-xs md:text-lg transition rounded-3xl text-white bg-primary hover:bg-primary-dull"
        >
          Logout
        </button>
      </nav>
      <div className="flex">
        <SideBar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
