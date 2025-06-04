import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";
import Moment from "moment";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Blog = () => {
  const { id } = useParams();
  const { axios } = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      data.success ? setData(data.blog) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.post("/api/blog/comments", { blogId: id });
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) {
      return toast.error("Fields cannot be empty!");
    }

    try {
      const { data } = await axios.post("/api/blog/add-comment", {
        blog: id,
        name: name.trim(),
        content: content.trim(),
      });

      if (data.success) {
        toast.success(data.message);
        setName("");
        setContent("");
        fetchComments(); // Refresh comments after submission
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [id]);

  return data ? (
    <div className="sm:px-3 ">
      <Navbar />

      <div className="text-center mt-10 text-gray-800">
        <p className="text-primary py-4 font-medium">
          Published on {Moment(data.createdAt).format("MMMM Do YYYY")}
        </p>
        <h1 className="text-3xl sm:text-5xl font-semibold sm:max-w-2xl mx-5 sm:mx-auto text-gray-800">
          {data.title}
        </h1>
        <h2 className="my-5 max-w-lg truncate mx-auto">{data.subTitle}</h2>
        <p className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary-dull/10 rounded-full text-sm">
          AyushDocs
        </p>
      </div>

      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img src={data.image} alt="img" className="rounded-3xl mb-5" />
        <div
          className="rich-text max-w-3xl "
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        {/* Comments */}
        <div className="mt-14 mb-10 max-w-3xl">
          <p className="font-semibold mb-4">Comments ({comments.length})</p>
          <div className="flex flex-col gap-4">
            {comments.length === 0 ? (
              <p className="text-gray-500 italic">No comments yet.</p>
            ) : (
              comments.map((item, index) => (
                <div key={index} className="max-w-xl px-4 py-2 text-gray-800">
                  <div className="flex items-center gap-2 mb-2">
                    <img src={assets.user_icon} alt="user" className="w-6" />
                    <p className="font-medium">{item.name}</p>
                  </div>
                  <p className="text-sm max-w-md ml-8">{item.content}</p>
                  <div className="text-sm ml-8 text-primary-dull">
                    {Moment(item.createdAt).fromNow()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Add Comment */}
        <div className="max-w-3xl">
          <p className="font-semibold mb-4">Add your comment</p>
          <form
            onSubmit={addComment}
            className="flex flex-col items-start gap-4 max-w-lg"
          >
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Name"
              required
              className="w-full p-2 border border-gray-400 rounded outline-none"
            />
            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className="w-full p-2 border border-gray-400 rounded outline-none h-48"
              required
              placeholder="Comment"
            ></textarea>
            <button
              type="submit"
              disabled={!name.trim() || !content.trim()}
              className="bg-primary text-white px-6 py-2 rounded disabled:opacity-50"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Share Buttons */}
        <div className="my-24 max-w-3xl">
          <p className="font-semibold my-4">Share this article on social media</p>
          <div className="flex gap-4">
            <img src={assets.facebook_icon} alt="facebook" width={50} />
            <img src={assets.twitter_icon} alt="twitter" width={50} />
            <img src={assets.googleplus_icon} alt="google plus" width={50} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  ) : (
    <Loading />
  );
};

export default Blog;
