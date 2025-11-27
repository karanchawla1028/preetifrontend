import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import { categoryData, data } from "../../commons";
import SearchInput from "../components/SearchInput";
import Button from "../components/Button";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategories,
  getAllCategories,
} from "../../toolkit/slices/serviceSlice";

const Category = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.service.categoriesList);
  const [isForm, setIsForm] = useState(false);
  const [category, setCategory] = useState({
    name: "",
    description: "",
    metaTitle: "",
    metaKeyword: "",
    metaDescription: "",
    slug: "",
    active: true,
  });

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (value, rowData) => (
        <Link to={`${rowData?.id}/subcategory`}>{value}</Link>
      ),
    },
    {
      title: "Meta title",
      dataIndex: "metaTitle",
    },
    {
      title: "Meta keyword",
      dataIndex: "metaKeyword",
    },
    {
      title: "Slug",
      dataIndex: "slug",
    },
    {
      title: "Description",
      dataIndex: "metaDescription",
    },
  ];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCategories({ userId, data:category }))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          alert("Category added successfully !.");
          setIsForm(false);
          dispatch(getAllCategories());
        } else {
          alert("Something went wrong !.");
        }
      })
      .catch(() => alert("Something went wrong !."));
  };

  return (
    <div className="flex flex-col gap-2">
      {!isForm ? (
        <>
          <h2 className="font-semibold font-sans text-xl">Category</h2>
          <div className="flex justify-between items-center">
            <SearchInput />
            <Button onClick={() => setIsForm(true)}>Add Category</Button>
          </div>
          <DynamicTable columns={columns} data={data} />
        </>
      ) : (
        <div className="p-8">
          <div className="flex items-center gap-0.5">
            <Button
              className="px-1.5 py-1"
              variant="ghost"
              onClick={() => setIsForm(false)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-semibold font-sans text-2xl">Add category</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={category.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter category name"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={category.description}
                onChange={handleChange}
                rows="3"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter category description"
              />
            </div>

            {/* Meta Title */}
            <div>
              <label className="block text-gray-700 mb-1">Meta Title</label>
              <input
                type="text"
                name="metaTitle"
                value={category.metaTitle}
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
                value={category.metaKeyword}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter meta keyword"
              />
            </div>

            {/* Meta Description */}
            <div>
              <label className="block text-gray-700 mb-1">
                Meta Description
              </label>
              <textarea
                name="metaDescription"
                value={category.metaDescription}
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
                value={category.slug}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter slug (URL-friendly name)"
              />
            </div>

            {/* Active Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="active"
                checked={category.active}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600"
              />
              <label className="text-gray-700">Active</label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-between items-center px-4">
              <Button variant="outline" onClick={() => setIsForm(false)}>
                Cancel
              </Button>
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Category;
