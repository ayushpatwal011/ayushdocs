import fs from "fs";
import imagekit from "../config/imagekit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import main from "../config/gemini.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );
    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      isPublished,
      image: optimizedImageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Blog added successfully",
    });
  } catch (error) {
    console.error("Error adding blog:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.json({
      success: true,
      blogs,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export const getBlogsById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog Not Found",
      });
    }

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.log(error); 
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;
    await Blog.findByIdAndDelete(id);

    // delete all comments of this blog
    await Comment.deleteMany( { blog : id})

    res.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};


export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Blog ID is required",
      });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();

    res.json({
      success: true,
      message: `Blog ${blog.isPublished ? "published" : "unpublished"} successfully`,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    
    await Comment.create({
      blog,
      name,
      content,
    });
    res.json({
      success: true,
      message: "Comment added for review",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;

    const comments = await Comment.find({
      blog : blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    console.error("Error in getBlogComments:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;

  const content =  await main(prompt + "Generate notes for this topic in simple english without digrams and you are a teacher so explain easily ")
    res.status(200).json({
      success: true,
      content
    });
  } catch (error) {
    console.error("Error in getBlogComments:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
