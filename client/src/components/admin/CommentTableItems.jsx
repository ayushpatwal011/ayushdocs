import React from 'react';
import { useAppContext } from '../../../context/AppContext';  // Make sure this path is correct
import toast from 'react-hot-toast';
import { assets } from "../../assets/assets";

const CommentTableItems = ({ comment, fetchComments }) => {
  const { axios } = useAppContext();
  const { blog, createdAt, _id, isApproved } = comment;
  const blogDate = new Date(createdAt);

  const approveComment = async () => {
    try {
      const { data } = await axios.post("/api/admin/approve-comment", { id: _id });
      if (data.success) {
        toast.success(data.message);
        await fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteComment = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmDelete) return;

    try {
      const { data } = await axios.post("/api/admin/delete-comment", { id: _id });
      if (data.success) {
        toast.success(data.message);
        await fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <p><b className="text-primary">Blog:</b> {blog?.title || "Unknown"}</p>
        <p className="mt-1"><b className="text-primary">Name:</b> {comment.name}</p>
        <p className="mt-1"><b className="text-primary">Comment:</b> {comment.content}</p>
      </td>
      <td className="px-6 py-4 max-sm:hidden">{blogDate.toLocaleDateString()}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {!isApproved ? (
            <img
              src={assets.tick_icon}
              alt="approve"
              className="w-5 cursor-pointer hover:scale-110 transition-transform"
              onClick={approveComment}
              title="Approve comment"
            />
          ) : (
            <span className="text-xs border border-green-500 bg-green-100 text-green-600 rounded-full px-3 py-1">
              Approved
            </span>
          )}
          <img
            src={assets.bin_icon}
            alt="delete"
            className="w-5 cursor-pointer hover:scale-110 transition-transform"
            onClick={deleteComment}
            title="Delete comment"
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItems;
