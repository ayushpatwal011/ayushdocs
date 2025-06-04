import React, { useState } from "react";
import { blogCategories } from "../assets/assets";
import BlogCard from "./BlogCard";
import { useAppContext } from "../../context/AppContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blog: blogs, input } = useAppContext(); // note: context uses 'blog', not 'blogs'

  const filterBlogs = () => {
    if (input.trim() === "") return blogs;

    const query = input.toLowerCase();

    return blogs.filter((blog) =>
      blog.title.toLowerCase().includes(query) ||
      blog.category.toLowerCase().includes(query) ||
      blog.subTitle.toLowerCase().includes(query)
    );
  };

  return (
    <div>
      <menu className="flex justify-center items-center gap-4 sm:gap-8 my-10">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer sm:text-lg px-3 py-1.5 rounded-xl transition-all duration-200 ${
                menu === item ? "text-white bg-primary" : ""
              }`}
            >
              {item}
            </button>
          </div>
        ))}
      </menu>

      {/* blog cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 mb-24 sm:mx-16 xl:mx-40">
        {filterBlogs()
          .filter((blog) => (menu === "All" ? true : blog.category === menu))
          .map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
