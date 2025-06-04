import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CommentTableItems from '../../components/admin/CommentTableItems';
import { useAppContext } from '../../../context/AppContext';

const Comments = () => {
  const { axios } = useAppContext();
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");

  const fetchComments = async () => {
    try {
      const { data } = await axios.get("/api/admin/comments");
      if (data.success) {
        setComments(data.comments); // ✅ Corrected this line
      } else {
        toast.error(data.message || "Failed to load comments");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className='flex-1 pt-5 px-4 sm:pt-12 sm:px-10'>
      <div className='flex justify-between items-center max-w-2xl'>
        <h1 className='font-semibold text-lg text-primary'>Comments</h1>
        <div className='flex gap-2'>
          {["Approved", "Not Approved"].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                filter === status
                  ? 'bg-primary text-white shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className='max-w-3xl mt-6 shadow-md scrollbar-hide overflow-x-auto rounded-lg'>
        <table className='w-full text-sm text-gray-600 bg-white'>
          <thead className='text-xs uppercase bg-gray-200'>
            <tr>
              <th className='px-6 py-3 text-left rounded-tl-lg'>#Blog Title & Comment</th>
              <th className='px-6 py-3 text-left max-sm:hidden'>Date</th>
              <th className='px-6 py-3 text-left rounded-tr-lg'>Action</th>
            </tr>
          </thead>
          <tbody>
            {comments
              .filter(comment =>
                filter === "Approved" ? comment.isApproved : !comment.isApproved
              )
              .map((comment, index) => (
                <CommentTableItems
                  key={comment._id}
                  comment={comment}
                  index={index + 1}
                  fetchComments={fetchComments}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comments;
