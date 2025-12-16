import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import SearchInput from "../components/SearchInput";
import DynamicTable from "../components/DynamicTable";
import { useDispatch, useSelector } from "react-redux";
import {
  addBlogDetails,
  addBlogs,
  getBlogById,
  getBlogsList,
} from "../../toolkit/slices/blogSlice";
import TextEditor from "../../features/components/TextEditor";
import { useParams } from "react-router-dom";
import ImageUploader from "../components/ImageUploader";
import { ArrowLeft } from "lucide-react";

const BlogsDetail = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const { blogId } = useParams();
  const blog = useSelector((state) => state.blogs.blogDetail);
  const [isForm, setIsForm] = useState(false);
  const [blogDetail, setBlogDetail] = useState({
    heading: "",
    content: "",
    imageUrl: "",
    displayOrder: 0,
    blogId: 0,
    active: true,
  });

  useEffect(() => {
    dispatch(getBlogById(blogId));
  }, [blogId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBlogDetail((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(blogDetail);
    console.log("blogDetail Data:", blogDetail);
    dispatch(addBlogDetails({ userId, data: blogDetail }))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          alert("Blog posted successfully.");
          setBlogDetail({
            heading: "",
            content: "",
            imageUrl: "",
            displayOrder: 0,
            blogId: 0,
            active: true,
          });
          setIsForm(false);
        } else {
          alert("Something went wrong .");
        }
      })
      .catch(() => alert("Something went wrong ."));
  };

  return (
    <div className="flex flex-col gap-2">
      {!isForm ? (
        <>
          <div className="flex justify-between items-center">
            <h2 className="font-semibold font-sans text-xl">Blog details</h2>
            <Button onClick={() => setIsForm(true)}>
              {" "}
              {Object.keys(blog)?.length > 0
                ? "Update blog detail"
                : "Add blog details"}
            </Button>
          </div>
          <div className="w-full">
            {/* 🔥 Hero Banner */}
            <div className="relative w-full h-[350px] md:h-[420px]">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute bottom-10 left-6 md:left-16 text-white max-w-4xl">
                <h1 className="text-3xl md:text-5xl font-bold capitalize">
                  {blog?.title?.replace(/-/g, " ")}
                </h1>
                <p className="mt-2 text-lg opacity-90">{blog.excerpt}</p>
              </div>
            </div>

            {/* CONTENT WRAPPER */}
            <div className="max-w-4xl mx-auto px-5 md:px-0 py-10 space-y-8">
              {/* 🟦 BLOG META INFORMATION */}
              <div className="text-gray-600 text-sm border-b pb-4">
                <p>
                  <strong>Published:</strong> {formattedDate}
                </p>
                <p>
                  <strong>Slug:</strong> {blog.slug}
                </p>
                <p>
                  <strong>Category ID:</strong> {blog.categoryId}
                </p>
              </div>

              {/* 📝 RICH HTML CONTENT */}
              <div
                className="
            prose 
            prose-lg 
            max-w-none 
            prose-h1:font-semibold 
            prose-h2:font-semibold 
            prose-h3:font-semibold 
            prose-img:rounded-xl 
            prose-img:shadow-md 
            prose-a:text-blue-600 
            prose-a:underline
          "
                dangerouslySetInnerHTML={{ __html: blog.metaDescription }}
              />

              {/* 🟦 SEO INFORMATION */}
              <div className="bg-gray-100 rounded-xl p-6 mt-10">
                <h3 className="text-xl font-semibold mb-3">SEO Information</h3>
                <p>
                  <strong>Meta Title:</strong> {blog.metaTitle}
                </p>
                <p>
                  <strong>Meta Keywords:</strong> {blog.metaKeyword}
                </p>
              </div>

              {/* IMAGE PREVIEW */}
              <div>
                <h3 className="text-xl font-semibold mt-6">
                  Thumbnail Preview
                </h3>
                <img
                  src={blog.thumbnailUrl}
                  alt="thumbnail"
                  className="mt-4 rounded-lg shadow-md w-full max-w-md"
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-[80%] mx-auto bg-white shadow-lg rounded-2xl p-6 mt-6">
          <div className="flex items-center gap-0.5 mb-2">
            <Button
              className="px-1.5 py-1"
              variant="ghost"
              onClick={() => setIsForm(false)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-2xl font-semibold mb-0 text-center">
              Create Blog Details
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            {/* Title */}
            <div>
              <label className="block text-gray-700 mb-1">Heading</label>
              <input
                type="text"
                name="heading"
                value={blogDetail.title}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter blog title"
                required
              />
            </div>

            {/* Meta Title */}
            <div>
              <label className="block text-gray-700 mb-1">Image url</label>
              <ImageUploader
                value={blogDetail?.imageUrl}
                onChange={(e) =>
                  setBlogDetail((prev) => ({ ...prev, imageUrl: e?.name }))
                }
              />
            </div>

            {/* Meta Keyword */}
            <div>
              <label className="block text-gray-700 mb-1">Display order</label>
              <input
                type="text"
                name="displayOrder"
                value={blogDetail.displayOrder}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter meta keywords (comma separated)"
              />
            </div>

            {/* Meta Description */}
            <div>
              <label className="block text-gray-700 mb-1">
                Meta Description
              </label>
              <textarea
                name="metaDescription"
                value={blogDetail.metaDescription}
                onChange={handleChange}
                rows="2"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter meta description"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-gray-700 mb-1">Slug</label>
              <input
                type="text"
                name="slug"
                value={blogDetail.slug}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter blog slug (URL-friendly)"
              />
            </div>

            {/* Thumbnail URL */}
            <div>
              <label className="block text-gray-700 mb-1">Thumbnail URL</label>
              <ImageUploader
                value={blogDetail?.thumbnailUrl}
                onChange={(e) =>
                  setBlogDetail((prev) => ({ ...prev, thumbnailUrl: e?.name }))
                }
              />
            </div>

            {/* Active Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="active"
                checked={blogDetail.active}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600"
              />
              <label className="text-gray-700">Active</label>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Content</label>
              <TextEditor
                value={blogDetail.content}
                onChange={(e) =>
                  setBlogDetail((prev) => ({ ...prev, content: e }))
                }
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BlogsDetail;
