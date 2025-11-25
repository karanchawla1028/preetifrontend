import React, { useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";
import Button from "../components/Button";
import DynamicTable from "../components/DynamicTable";
import { services } from "../../commons";
import { ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addService, getAllServices } from "../../toolkit/slices/serviceSlice";
import { useParams } from "react-router-dom";
import TextEditor from "../../features/components/TextEditor";

const AdminServices = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const { subcategoryId, userId } = useParams();
  const serviceList = useSelector((state) => state.service.serviceList);
  const [isForm, setIsForm] = useState(false);
  const [service, setService] = useState({
    name: "",
    description: "",
    subCategoryId: subcategoryId,
    iconUrl: "",
    image: "",
    metaTitle: "",
    metaKeyword: "",
    metaDescription: "",
    slug: "",
    active: true,
    inactive: true,
    displayStatus: true,
    showOnHome: true,
  });

  useEffect(() => {
    dispatch(getAllServices());
  }, []);

  // Handle changes for all fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Auto-generate slug when typing name
    if (name === "name") {
      const generatedSlug = value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-") // replace spaces with hyphens
        .replace(/[^a-z0-9\-]/g, ""); // remove special characters (optional)

      setService((prev) => ({
        ...prev,
        name: value,
        slug: generatedSlug,
      }));
      return;
    }

    setService((prev) => ({
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
    },
    {
      title: "Slug",
      dataIndex: "slug",
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
      title: "Meta description",
      dataIndex: "metaDescription",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
  ];

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Service Data:", service);
    dispatch(addService({ userId, data: service }))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          alert("Service added successfully !.");
          dispatch(getAllServices());
          setIsForm(false);
          setService({
            name: "",
            description: "",
            subCategoryId: subcategoryId,
            iconUrl: "",
            image: "",
            metaTitle: "",
            metaKeyword: "",
            metaDescription: "",
            slug: "",
            active: true,
            inactive: true,
            displayStatus: true,
            showOnHome: true,
            content: "",
          });
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
          <h2 className="font-semibold font-sans text-xl">Service</h2>
          <div className="flex justify-between items-center">
            <SearchInput />
            <Button onClick={() => setIsForm(true)}>Add Service</Button>
          </div>
          <DynamicTable columns={columns} data={serviceList} />
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
            <h1 className="font-semibold font-sans text-2xl">Add Service</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-700 mb-1">Service Name</label>
              <input
                type="text"
                name="name"
                value={service.name}
                onChange={handleChange}
                placeholder="Enter service name"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={service.description}
                onChange={handleChange}
                rows="3"
                placeholder="Enter service description"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Sub Category ID */}
            <div>
              <label className="block text-gray-700 mb-1">
                Sub Category ID
              </label>
              <input
                type="number"
                name="subCategoryId"
                value={service.subCategoryId}
                onChange={handleChange}
                min="0"
                placeholder="Enter Sub Category ID"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Icon URL */}
            <div>
              <label className="block text-gray-700 mb-1">Icon URL</label>
              <input
                type="text"
                name="iconUrl"
                value={service.iconUrl}
                onChange={handleChange}
                placeholder="Enter icon image URL"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                name="image"
                value={service.image}
                onChange={handleChange}
                placeholder="Enter main image URL"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Meta Title */}
            <div>
              <label className="block text-gray-700 mb-1">Meta Title</label>
              <input
                type="text"
                name="metaTitle"
                value={service.metaTitle}
                onChange={handleChange}
                placeholder="Enter meta title"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Meta Keyword */}
            <div>
              <label className="block text-gray-700 mb-1">Meta Keyword</label>
              <input
                type="text"
                name="metaKeyword"
                value={service.metaKeyword}
                onChange={handleChange}
                placeholder="Enter meta keywords"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Meta Description */}
            <div>
              <label className="block text-gray-700 mb-1">
                Meta Description
              </label>
              <textarea
                name="metaDescription"
                value={service.metaDescription}
                onChange={handleChange}
                rows="2"
                placeholder="Enter meta description"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-gray-700 mb-1">Slug</label>
              <input
                type="text"
                name="slug"
                value={service.slug}
                onChange={handleChange}
                placeholder="Enter slug (URL-friendly name)"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Checkboxes */}
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="active"
                  checked={service.active}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600"
                />
                <span className="text-gray-700">Active</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="inactive"
                  checked={service.inactive}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600"
                />
                <span className="text-gray-700">Inactive</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="displayStatus"
                  checked={service.displayStatus}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600"
                />
                <span className="text-gray-700">Display Status</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="showOnHome"
                  checked={service.showOnHome}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600"
                />
                <span className="text-gray-700">Show on Home</span>
              </label>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Content</label>
              <TextEditor
                value={service.content}
                onChange={(e) =>
                  setService((prev) => ({ ...prev, content: e }))
                }
              />
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

export default AdminServices;
