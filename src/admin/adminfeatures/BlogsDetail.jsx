import React, { useEffect, useMemo, useState } from "react";
import Button from "../components/Button";
import SearchInput from "../components/SearchInput";
import DynamicTable from "../components/DynamicTable";
import { useDispatch, useSelector } from "react-redux";
import {
  addBlogDetails,
  addBlogs,
  deleteBlogDetail,
  getBlogById,
  getBlogDetailsByBlogId,
  getBlogsList,
  updateBlogDetail,
} from "../../toolkit/slices/blogSlice";
import TextEditor from "../../features/components/TextEditor";
import { useParams } from "react-router-dom";
import ImageUploader from "../components/ImageUploader";
import { ArrowLeft, EllipsisVertical } from "lucide-react";
import Dropdown from "../components/Dropdown";
import PopConfirm from "../components/Popconfirm";
import { useToast } from "../../features/components/ToastProvider";
import Modal from "../components/Modal";
import Input from "../components/Input";
import { s, title } from "framer-motion/client";
import Table from "../components/Table";

const BlogsDetail = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { blogId,userId } = useParams();
  const data = useSelector((state) => state.blogs.blogDetailsList);
  const [isForm, setIsForm] = useState(false);
  const [search, setSearch] = useState("");
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [description, setDescription] = useState(null);
  const [rowItem, setRowItem] = useState(null);
  const [blogDetail, setBlogDetail] = useState({
    heading: "",
    content: "",
    imageUrl: "",
    displayOrder: 0,
    blogId: 0,
    active: true,
  });

  useEffect(() => {
    dispatch(getBlogDetailsByBlogId(blogId));
  }, [blogId]);

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data?.filter((item) =>
      Object.values(item).join(" ").toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBlogDetail((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  const handleDelete = (rowData) => {
    dispatch(deleteBlogDetail({ id: rowData?.id, userId }))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          showToast({
            title: "Success",
            description: "Service FAQ deleted successfully !.",
            status: "success",
          });
          dispatch(getBlogDetailsByBlogId(blogId));
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
    setBlogDetail({
      heading: rowData?.heading,
      content: rowData?.details,
      imageUrl: rowData?.imageUrl,
      displayOrder: rowData?.displayOrder,
      active: rowData?.active,
      displayStatus: rowData?.displayStatus,
      blogId: blogId,
    });
    setRowItem(rowData);
    setIsForm(true);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Heading",
      dataIndex: "heading",
      render: (value, rowData) => <p className="text-wrap">{value}</p>,
    },
    {
      title: "Description",
      dataIndex: "content",
      render: (value, rowData) => (
        <Button
          onClick={() => {
            setDescription(value);
            setOpenModal(true);
          }}
        >
          Show
        </Button>
      ),
    },
    {
      title: "Display Order",
      dataIndex: "displayOrder",
      render: (value, rowData) => <p className="text-wrap">{value}</p>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (value, record, rowIndex) => {
        const isOpen = openDropdowns[record.id] || false;
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

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (rowItem) {
      dispatch(updateBlogDetail({ userId, data: blogDetail }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            showToast({
              title: "Success",
              description: "Blog detail updated successfully !.",
              status: "success",
            });
            setBlogDetail({
              heading: "",
              content: "",
              imageUrl: "",
              displayOrder: 0,
              blogId: 0,
              active: true,
            });
            setIsForm(false);
            setRowItem(null);
            dispatch(getBlogDetailsByBlogId(blogId));
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
      dispatch(addBlogDetails({ userId, data: blogDetail }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            showToast({
              title: "Success",
              description: "Blog detail added successfully !.",
              status: "success",
            });
            setBlogDetail({
              heading: "",
              content: "",
              imageUrl: "",
              displayOrder: 0,
              blogId: 0,
              active: true,
            });
            setIsForm(false);
            setRowItem(null);
            dispatch(getBlogDetailsByBlogId(blogId));
          } else {
            showToast({
              title: "Error",
              description: "Something went wrong !.",
              status: "error",
            });
          }
        })
        .catch(() => {
          showToast({
            title: "Error",
            description: "Something went wrong !.",
            status: "error",
          });
        });
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
        <Button onClick={() => setIsForm(true)}>Add Blog detail</Button>
      </div>
    );
  }, [search]);

  return (
    <>
      <div className="flex flex-col gap-2">
        {!isForm ? (
          <>
            <h2 className="text-lg font-semibold">Blog detail list</h2>
            <Table
              columns={columns}
              dataSource={filteredData}
              topContent={topContent}
              className="w-full"
            />
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
                {rowItem ? "Edit Blog Detail" : "Add Blog Detail"}
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
                <label className="block text-gray-700 mb-1">
                  Display order
                </label>
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
                <label className="block text-gray-700 mb-1">
                  Thumbnail URL
                </label>
                <ImageUploader
                  value={blogDetail?.thumbnailUrl}
                  onChange={(e) =>
                    setBlogDetail((prev) => ({
                      ...prev,
                      thumbnailUrl: e?.name,
                    }))
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
      <Modal
        title={"Description"}
        width={"70%"}
        okText="Ok"
        open={openModal}
        onOk={() => {
          setOpenModal(false);
          setDescription(null);
        }}
        onCancel={() => {
          setOpenModal(false);
          setDescription(null);
        }}
      >
        <div
          className="prose max-w-full max-h-[60vh] overflow-auto"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </Modal>
    </>
  );
};

export default BlogsDetail;
