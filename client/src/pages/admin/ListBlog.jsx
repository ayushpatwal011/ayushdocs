import React, { useEffect, useState } from "react";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

const ListBlog = () => {
  const { axios } = useAppContext();
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/admin/blogs");
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-5 px-4 sm:pt-12 sm:px-10"> {/* same container padding as Comments */}
      <h1 className="font-semibold text-lg text-primary mb-4">Latest Blogs</h1>

      <div className="max-w-3xl mt-6 shadow-md scrollbar-hide overflow-x-auto rounded-lg bg-white">
        {/* max-w-3xl matches Comments, added bg-white for consistent background */}
        <table className="w-full text-sm text-gray-600">
          <thead className="text-xs uppercase bg-gray-200 text-gray-800">
            <tr>
              <th className="px-6 py-3 text-left rounded-tl-lg">#</th>
              <th className="px-6 py-3 text-left">Blog Title</th>
              <th className="px-6 py-3 text-left max-sm:hidden">Date</th>
              <th className="px-6 py-3 text-left max-sm:hidden">Status</th>
              <th className="px-6 py-3 text-left rounded-tr-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8">
                  No blogs found.
                </td>
              </tr>
            ) : (
              blogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchBlogs}
                  index={index + 1}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBlog;
