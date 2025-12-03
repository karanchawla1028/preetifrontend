import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import SearchInput from "../components/SearchInput";
import DynamicTable from "../components/DynamicTable";
import { useDispatch, useSelector } from "react-redux";
import {
  addBlogs,
  getBlogsList,
  updateBlog,
} from "../../toolkit/slices/blogSlice";
import TextEditor from "../../features/components/TextEditor";
import Select from "../../features/components/Select";
import {
  getAllCategories,
  getServiceBySubCategoryId,
  getSubCategoryListByCategoryId,
} from "../../toolkit/slices/serviceSlice";
import FileUploader from "../components/FileUploader";
import { useToast } from "../../features/components/ToastProvider";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "../components/Dropdown";
import { MoreHorizontal } from "lucide-react";
import ImageUploader from "../components/ImageUploader";

const Blog = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const blogList = useSelector((state) => state.blogs.blogList);
  const categoryList = useSelector((state) => state.service.categoriesList);
  const subCategoryList = useSelector(
    (state) => state.service.subCategoryListByCategoryId
  );
  const serviceList = useSelector(
    (state) => state.service.serviceListBySubCategoryId
  );

  console.log("djhbdfbfgb",subCategoryList)

  const [isForm, setIsForm] = useState(false);
  const [rowItem, setRowItem] = useState(null);
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

  useEffect(() => {
    dispatch(getBlogsList());
  }, []);

  const handleEdit = (rowData) => {
    dispatch(getSubCategoryListByCategoryId(rowData?.categoryId));
    dispatch(getServiceBySubCategoryId(rowData?.subCategoryId));
    setBlog({
      title: rowData?.title,
      excerpt: rowData?.excerpt,
      metaTitle: rowData?.metaTitle,
      metaKeyword: rowData?.metaKeyword,
      metaDescription: rowData?.metaDescription,
      slug: rowData?.slug,
      thumbnailUrl: rowData?.thumbnailUrl,
      active: rowData?.active,
      showOnHome: rowData?.showOnHome,
      categoryId: rowData?.categoryId,
      subCategoryId: rowData?.subCategoryId,
      serviceId: rowData?.serviceId,
    });
    setIsForm(true);
    setRowItem(rowData);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      render: (value, rowData) => <p>{value}</p>,
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
    {
      title: "Action",
      dataIndex: "action",
      render: (value, rowData) => {
        return (
          <div className="p-10 flex gap-4">
            <Dropdown>
              <DropdownTrigger>
                <button className="p-2 rounded-lg bg-white hover:bg-gray-50 cursor-pointer">
                  <MoreHorizontal />
                </button>
              </DropdownTrigger>

              <DropdownMenu>
                <DropdownItem key={"edit"} onClick={() => handleEdit(rowData)}>
                  Edit
                </DropdownItem>
                <DropdownItem color="danger" key={"delete"}>
                  Delete file
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

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
    if (rowItem) {
      dispatch(updateBlog({ id: rowItem?.id, userId: 1, data: blog }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            showToast({
              title: "Blogs updated",
              description: "Blog updated successfully !.",
              status: "success",
            });
            setBlog({
              title: "",
              excerpt: "",
              metaTitle: "",
              metaKeyword: "",
              metaDescription: "",
              slug: "",
              image: "",
              active: true,
              showOnHome: true,
              categoryId: 0,
              subCategoryId: 0,
              serviceId: 0,
            });
            setIsForm(false);
            dispatch(getAllCategories());
            setRowItem(null);
          } else {
            showToast({
              title: "Error",
              description: "Something went wrong !.",
              status: "error",
            });
          }
        })
        .catch(() =>
          showToast({
            title: "Error",
            description: "Something went wrong !.",
            status: "error",
          })
        );
    } else {
      dispatch(addBlogs({ userId: 1, data: blog }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            alert("Blog posted successfully.");
            showToast({
              title: "Blogs added",
              description: "Blog added successfully !.",
              status: "success",
            });
            setBlog({
              title: "",
              excerpt: "",
              metaTitle: "",
              metaKeyword: "",
              metaDescription: "",
              slug: "",
              image: "",
              active: true,
              showOnHome: true,
              categoryId: 0,
              subCategoryId: 0,
              serviceId: 0,
            });
            setIsForm(false);
            dispatch(getAllCategories());
          } else {
            showToast({
              title: "Error",
              description: "Something went wrong !.",
              status: "error",
            });
          }
        })
        .catch(() =>
          showToast({
            title: "Error",
            description: "Something went wrong !.",
            status: "error",
          })
        );
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {!isForm ? (
        <>
          <h2 className="font-semibold font-sans text-xl">Blogs</h2>
          <div className="flex justify-between items-center">
            <SearchInput />
            <Button onClick={() => setIsForm(true)}>Add blog</Button>
          </div>
          <DynamicTable columns={columns} data={blogList} />
        </>
      ) : (
        <div className="w-[80%] mx-auto bg-white shadow-lg rounded-2xl p-6 mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            {rowItem ? "Update blog" : "Create blog"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 w-full">
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

            <div>
              <label className="block text-gray-700 mb-1">Category</label>
              <Select
                options={categoryList || []}
                labelKey="name"
                valueKey="id"
                value={blog?.categoryId}
                onChange={(val) => {
                  setBlog((prev) => ({ ...prev, categoryId: val }));
                  dispatch(getSubCategoryListByCategoryId(val));
                }}
                placeholder="select category"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Sub Category</label>
              <Select
                options={subCategoryList}
                labelKey="name"
                valueKey="id"
                value={blog?.subCategoryId}
                onChange={(val) => {
                  setBlog((prev) => ({ ...prev, subCategoryId: val }));
                  dispatch(getServiceBySubCategoryId(val));
                }}
                placeholder="select subcategory"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Services</label>
              <Select
                options={serviceList}
                labelKey="name"
                valueKey="id"
                value={blog?.serviceId}
                onChange={(val) =>
                  setBlog((prev) => ({ ...prev, serviceId: val }))
                }
                placeholder="select service"
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

            {/* Image */}
            <div>
              <label className="block text-gray-700 mb-1"> Image</label>
              <ImageUploader/>
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

export default Blog;
