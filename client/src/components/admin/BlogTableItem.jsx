import React from "react";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import { useAppContext } from "../../../context/AppContext";

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { axios } = useAppContext();
  const { title, createdAt, isPublished, _id } = blog;
  const formattedDate = new Date(createdAt).toDateString();

  const deleteBlog = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      const { data } = await axios.post("/api/blog/delete", { id: _id });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const togglePublished = async () => {
    try {
      const { data } = await axios.post("/api/blog/toggle-publish", { id: _id });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className="border-y border-gray-400">
      <th className="px-2 py-4">{index}</th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">{formattedDate}</td>
      <td className="px-2 py-4 max-sm:hidden">
        <span className={isPublished ? "text-green-600" : "text-orange-700"}>
          {isPublished ? "Published" : "Unpublished"}
        </span>
      </td>
      <td className="px-2 py-4 flex gap-3 items-center text-xs">
        <button
          onClick={togglePublished}
          className="bg-primary text-white hover:bg-primary-dull px-2 py-1 rounded"
        >
          {isPublished ? "Unpublish" : "Publish"}
        </button>
        <img
          onClick={deleteBlog}
          src={assets.cross_icon}
          alt="delete"
          className="w-6 cursor-pointer hover:scale-110 transition-transform"
        />
      </td>
    </tr>
  );
};

export default BlogTableItem;
