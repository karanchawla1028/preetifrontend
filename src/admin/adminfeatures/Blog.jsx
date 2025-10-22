import React, { useState } from "react";

const Blog = ({ onSubmit }) => {
  const [blog, setBlog] = useState({
    title: "",
    excerpt: "",
    metaTitle: "",
    metaKeyword: "",
    metaDescription: "",
    slug: "",
    thumbnailUrl: "",
    active: true,
    showOnHome: true,
    categoryId: 0,
    subCategoryId: 0,
    serviceId: 0,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBlog((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(blog);
    console.log("Blog Data:", blog);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={blog.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter blog title"
            required
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-gray-700 mb-1">Excerpt</label>
          <textarea
            name="excerpt"
            value={blog.excerpt}
            onChange={handleChange}
            rows="2"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Short summary of the blog"
          />
        </div>

        {/* Meta Title */}
        <div>
          <label className="block text-gray-700 mb-1">Meta Title</label>
          <input
            type="text"
            name="metaTitle"
            value={blog.metaTitle}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter meta title"
          />
        </div>

        {/* Meta Keyword */}
        <div>
          <label className="block text-gray-700 mb-1">Meta Keyword</label>
          <input
            type="text"
            name="metaKeyword"
            value={blog.metaKeyword}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter meta keywords (comma separated)"
          />
        </div>

        {/* Meta Description */}
        <div>
          <label className="block text-gray-700 mb-1">Meta Description</label>
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
            checked={blog.active}
            onChange={handleChange}
            className="w-5 h-5 text-blue-600"
          />
          <label className="text-gray-700">Active</label>
        </div>

        {/* Show on Home Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="showOnHome"
            checked={blog.showOnHome}
            onChange={handleChange}
            className="w-5 h-5 text-blue-600"
          />
          <label className="text-gray-700">Show on Home Page</label>
        </div>

        {/* Category ID */}
        <div>
          <label className="block text-gray-700 mb-1">Category ID</label>
          <input
            type="number"
            name="categoryId"
            value={blog.categoryId}
            onChange={handleChange}
            min="0"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter category ID"
          />
        </div>

        {/* Sub Category ID */}
        <div>
          <label className="block text-gray-700 mb-1">Sub Category ID</label>
          <input
            type="number"
            name="subCategoryId"
            value={blog.subCategoryId}
            onChange={handleChange}
            min="0"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter sub category ID"
          />
        </div>

        {/* Service ID */}
        <div>
          <label className="block text-gray-700 mb-1">Service ID</label>
          <input
            type="number"
            name="serviceId"
            value={blog.serviceId}
            onChange={handleChange}
            min="0"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter service ID"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Blog;
