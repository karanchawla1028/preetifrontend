import React, { useEffect, useMemo, useState } from "react";
import Button from "../components/Button";
import SearchInput from "../components/SearchInput";
import DynamicTable from "../components/DynamicTable";
import { data, subcategoryData } from "../../commons";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, EllipsisVertical } from "lucide-react";
import {
  addSubCategories,
  deleteSubcategory,
  getAllSubCategories,
  updateSubcategory,
} from "../../toolkit/slices/serviceSlice";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../components/Dropdown";
import PopConfirm from "../components/Popconfirm";
import Input from "../components/Input";
import Table from "../components/Table";

const Subcategory = () => {
  const { categoryId, userId } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.service.subCategoriesList);
  const [isForm, setIsForm] = useState(false);
  const [search, setSearch] = useState("");
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [rowItem, setRowItem] = useState(null);
  const initialValues = {
    name: "",
    description: "",
    metaTitle: "",
    metaKeyword: "",
    metaDescription: "",
    slug: "",
    active: true,
    displayStatus: true,
    categoryId: categoryId,
  };
  const [subCategory, setSubCategory] = useState(initialValues);

  useEffect(() => {
    dispatch(getAllSubCategories());
  }, []);

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data?.filter((item) =>
      Object.values(item).join(" ").toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

  const handleDelete = (rowData) => {
    dispatch(deleteSubcategory({ id: rowData?.id, userId }))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          showToast({
            title: "Success",
            description: "Subcategory deleted successfully !.",
            status: "success",
          });
          dispatch(getAllSubCategories());
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
  };

  const handleEdit = (rowData) => {
    setSubCategory({
      name: rowData?.name,
      description: rowData?.description,
      metaTitle: rowData?.metaTitle,
      metaKeyword: rowData?.metaKeyword,
      metaDescription: rowData?.metaDescription,
      slug: rowData?.slug,
      active: rowData?.active,
      displayStatus: rowData?.displayStatus,
      categoryId: categoryId,
    });
    setRowItem(rowData);
    setIsForm(true);
  };

  // Handle field change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "name") {
      const generatedSlug = value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "");
      setService((prev) => ({
        ...prev,
        name: value,
        slug: generatedSlug,
      }));
      return;
    }
    setSubCategory((prev) => ({
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
        <Link className="text-blue-600" to={`${rowData?.id}/services`}>
          {value}
        </Link>
      ),
    },
    {
      title: "Slug",
      dataIndex: "slug",
      render: (value, rowData) => <p className="text-wrap">{value}</p>,
    },
    {
      title: "Meta title",
      dataIndex: "metaTitle",
      render: (value, rowData) => <p className="text-wrap">{value}</p>,
    },
    {
      title: "Meta description",
      dataIndex: "metaDescription",
      render: (value, rowData) => <p className="text-wrap">{value}</p>,
    },
    {
      title: "Meta keyword",
      dataIndex: "metaKeyword",
      render: (value, rowData) => <p className="text-wrap">{value}</p>,
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (value, rowData) => <p className="text-wrap">{value}</p>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (value, record, rowIndex) => {
        const isOpen = openDropdowns[record.id] || false; // or record._id, whatever unique
        return (
          <Dropdown
            open={isOpen}
            onOpenChange={(open) =>
              setOpenDropdowns((prev) => ({ ...prev, [record.id]: open }))
            }
            items={[
              { key: 1, label: "edit", onClick: () => handleEdit(record) },
              {
                key: 2,
                label: (
                  <PopConfirm
                    title="Are you sure you want to delete?"
                    onConfirm={() => handleDelete(record)}
                    onCancel={() => console.log("Cancel")}
                  >
                    <div className="text-red-600">Delete</div>
                  </PopConfirm>
                ),
                noClose: true,
              },
            ]}
          >
            <Button size="small" variant="secondary">
              <EllipsisVertical />
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  const handleSubmit = (data) => {
    e.preventDefault();
    if (rowItem) {
      dispatch(updateSubcategory({ id: rowItem?.id, userId, data: category }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            showToast({
              title: "Subcategory updated",
              description: "Subcategory updated successfully !.",
              status: "success",
            });
            setIsForm(false);
            dispatch(getAllSubCategories());
            setRowItem(null);
            setSubCategory(initialValues);
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
      dispatch(addSubCategories({ userId, data: subCategory }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            showToast({
              title: "Subcategory added",
              description: "Subcategory added successfully !.",
              status: "success",
            });
            setIsForm(false);
            dispatch(getAllSubCategories());
            setSubCategory(initialValues);
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

  const topContent = useMemo(() => {
    return (
      <div className="flex justify-between items-center">
        <Input
          type="text"
          placeholder="Search..."
          value={search}
          showIcon
          onChange={(e) => setSearch(e.target.value)}
          wrapperClassName="w-80"
        />
        <Button onClick={() => setIsForm(true)}>Add subcategory</Button>
      </div>
    );
  }, [search]);

  return (
    <div className="flex flex-col gap-2">
      {!isForm ? (
        <>
          <h2 className="text-lg font-semibold">Subcategory list</h2>
          <Table
            columns={columns}
            dataSource={filteredData}
            topContent={topContent}
            className="w-full"
          />
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
            <h1 className="font-semibold font-sans text-2xl">
              Add Sub category
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={subCategory.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter sub category name"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={subCategory.description}
                onChange={handleChange}
                rows="3"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter description"
              />
            </div>

            {/* Meta Title */}
            <div>
              <label className="block text-gray-700 mb-1">Meta Title</label>
              <input
                type="text"
                name="metaTitle"
                value={subCategory.metaTitle}
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
                value={subCategory.metaKeyword}
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
                value={subCategory.metaDescription}
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
                value={subCategory.slug}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter slug (URL-friendly)"
              />
            </div>

            {/* Category ID */}
            <div>
              <label className="block text-gray-700 mb-1">Category ID</label>
              <input
                type="number"
                name="categoryId"
                value={subCategory.categoryId}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter category ID"
                min="0"
              />
            </div>

            {/* Active Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="active"
                checked={subCategory.active}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600"
              />
              <label className="text-gray-700">Active</label>
            </div>

            {/* Display Status Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="displayStatus"
                checked={subCategory.displayStatus}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600"
              />
              <label className="text-gray-700">Display Status</label>
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

export default Subcategory;
