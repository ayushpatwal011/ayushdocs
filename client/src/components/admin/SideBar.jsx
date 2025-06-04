import React from "react";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const sidebarLinks = [
    { name: "Dashboard", path: "/admin", icon: assets.home_icon },
    {
      name: "Add Blog",
      path: "/admin/addBlog",
      icon: assets.add_icon,
    },
    { name: "List Blog", path: "/admin/listBlog", icon: assets.list_icon },
    { name: "Comments", path: "/admin/comments", icon: assets.comment_icon },
  ];

  return (
    <div className="flex flex-col border-r border-gray-200 min-h-full pt-6 ">
      {sidebarLinks.map((item) => (
        <NavLink
        key={item.name}
          end={item.path === "/admin"}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center py-4 px-4 gap-3 md:px-9 md:min-w-64 cursor-pointer transition-all duration-200 
                ${
                  isActive
                    ? "border-r-4 md:border-r-[6px] bg-primary/40 border-primary text-primary font-medium"
                    : "hover:bg-primary-dull/10 text-gray-600"
                }`
          }
        >
          <img src={item.icon} alt="home" className="min-w-4 w-5" />
          <p className="hidden md:inline-block">{item.name}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default SideBar;
