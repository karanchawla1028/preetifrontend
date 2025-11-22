import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import SearchInput from "../components/SearchInput";
import DynamicTable from "../components/DynamicTable";
import { useDispatch, useSelector } from "react-redux";
import { addBlogs, getBlogsList } from "../../toolkit/slices/blogSlice";
import TextEditor from "../../features/components/TextEditor";
import { useParams } from "react-router-dom";

const BlogsDetail = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const { blogId } = useParams();
  const blogList = useSelector((state) => state.blogs.blogList);
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
    dispatch(getBlogsList());
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Heading",
      dataIndex: "heading",
      render: (value, rowData) => <p>{value}</p>,
    },
    {
      title: "Content",
      dataIndex: "content",
    },
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBlogDetail((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(blog);
    console.log("Blog Data:", blog);
    dispatch(addBlogs({ userId: 1, data: blog }))
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
          <h2 className="font-semibold font-sans text-xl">Blog details</h2>
          <div className="flex justify-between items-center">
            <SearchInput />
            <Button onClick={() => setIsForm(true)}>Add blog details</Button>
          </div>
          <DynamicTable columns={columns} data={blogList} />
        </>
      ) : (
        <div className="w-[80%] mx-auto bg-white shadow-lg rounded-2xl p-6 mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Create Blog Details
          </h2>

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
              <input
                type="text"
                name="imageUrl"
                value={blogDetail.imageUrl}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter meta title"
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
                value={blog.metaDescription}
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
                value={blog.slug}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter blog slug (URL-friendly)"
              />
            </div>

            {/* Thumbnail URL */}
            <div>
              <label className="block text-gray-700 mb-1">Thumbnail URL</label>
              <input
                type="text"
                name="thumbnailUrl"
                value={blog.thumbnailUrl}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter image URL"
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
                onChange={(e) => setBlogDetail((prev) => ({ ...prev, content: e }))}
              />
            </div>

            {/* Submit Button */}
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
