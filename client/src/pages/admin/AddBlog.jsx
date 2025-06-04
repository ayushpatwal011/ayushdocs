import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast"; 
import {parse} from 'marked'

const AddBlog = () => {
  const { axios } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("StartUp");
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!title || !subTitle || !category || !image || !quillRef.current) {
      return toast.error("Please fill in all required fields.");
    }

    try {
      setIsAdding(true);

      const blog = {
        title,
        subTitle,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished,
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      formData.append("image", image);

      const { data } = await axios.post("/api/blog/add", formData);

      if (data.success) {
        toast.success(data.message);
        // Reset fields
        setImage(null);
        setTitle("");
        setSubTitle("");
        quillRef.current.root.innerHTML = "";
        setCategory("StartUp");
        setIsPublished(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  const generateContent = async () => {
    if(!title){
      return toast.error("Please enter title")
    }
    try {
      setLoading(true)
      const { data} = await axios.post('/api/blog/generate', {
        prompt: title
      })
      if(data.success){
        quillRef.current.root.innerHTML = parse(data.content)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write your blog content here...",
      });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 text-primary h-full overflow-scroll"
    >
      <div className="w-full max-w-3xl p-4 md:p-10 shadow bg-white">
        <p className="font-medium">Upload Thumbnail</p>
        <label htmlFor="image">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt="thumbnail"
            className="mt-2 h-16 rounded cursor-pointer object-cover"
          />
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            required
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>

        <p className="mt-4 font-medium">Blog Title</p>
        <input
          type="text"
          required
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
        />

        <p className="mt-4 font-medium">Sub Title</p>
        <input
          type="text"
          required
          placeholder="Enter subtitle"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
        />

        <p className="mt-4 font-medium">Blog Description</p>
        <div className="max-w-lg h-72 pb-16 sm:pb-10 pt-2 relative border border-gray-300 rounded ">
          <div ref={editorRef} className="h-full"></div>
          {
            loading && (
              <div className="absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2 ">
                <div className="w-8 h-8 rounded-full border-2 border-t-white animate-spin">

                </div>
              </div>
            )
          }
          <button
            onClick={generateContent}
            type="button"
            disabled={loading}
            className="absolute bottom-2 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer"
          >
            Generate with AI
          </button>
        </div>

        <p className="mt-4 font-medium">Blog Category</p>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          required
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded"
        >
          <option value="">Select category</option>
          {blogCategories.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <div className="mt-4 flex items-center gap-3">
          <p className="font-medium">Publish now</p>
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="scale-125 cursor-pointer"
          />
        </div>

        <button
          disabled={isAdding}
          type="submit"
          className="mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm disabled:opacity-50"
        >
          {isAdding ? "Adding..." : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
