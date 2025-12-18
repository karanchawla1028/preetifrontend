import React, { useEffect, useMemo, useState } from "react";
import SearchInput from "../components/SearchInput";
import Button from "../components/Button";
import DynamicTable from "../components/DynamicTable";
import { services } from "../../commons";
import { ArrowLeft, EllipsisVertical } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addService,
  deleteSingleService,
  getAllServices,
  updateService,
} from "../../toolkit/slices/serviceSlice";
import { useParams } from "react-router-dom";
import TextEditor from "../../features/components/TextEditor";
import Dropdown from "../components/Dropdown";
import PopConfirm from "../components/Popconfirm";
import Table from "../components/Table";
import ImageUploader from "../components/ImageUploader";
import Input from "../components/Input";
import Modal from "../components/Modal";
import { useToast } from "../../features/components/ToastProvider";

const AdminServices = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const {showToast}=useToast()
  const { subcategoryId, userId } = useParams();
  const data = useSelector((state) => state.service.serviceList);
  const [isForm, setIsForm] = useState(false);
  const [search, setSearch] = useState("");
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [rowItem, setRowItem] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [description, setDescription] = useState(null);
  const initialValues = {
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
  };
  const [service, setService] = useState(initialValues);

  useEffect(() => {
    dispatch(getAllServices());
  }, []);

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data?.filter((item) =>
      Object.values(item).join(" ").toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

  const handleDelete = (rowData) => {
    dispatch(deleteSingleService({ id: rowData?.id, userId }))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          showToast({
            title: "Success",
            description: "Service deleted successfully !.",
            status: "success",
          });
          dispatch(getAllServices());
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
    setService({
      name: rowData?.name,
      description: rowData?.description,
      iconUrl: rowData?.iconUrl,
      image: rowData?.image,
      metaTitle: rowData?.metaTitle,
      metaKeyword: rowData?.metaKeyword,
      metaDescription: rowData?.metaDescription,
      slug: rowData?.slug,
      active: rowData?.active,
      inactive: rowData?.inactive,
      displayStatus: rowData?.displayStatus,
      showOnHome: rowData?.showOnHome,
    });
    setRowItem(rowData);
    setIsForm(true);
  };

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
      render: (value, rowData) => <p className="text-wrap">{value}</p>,
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
      title: "Meta keyword",
      dataIndex: "metaKeyword",
      render: (value, rowData) => <p className="text-wrap">{value}</p>,
    },
    {
      title: "Meta description",
      dataIndex: "metaDescription",
      render: (value, rowData) => <p className="text-wrap">{value}</p>,
    },
    {
      title: "Description",
      dataIndex: "description",
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
      dispatch(updateService({ id: rowItem?.id, userId, data: service }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            showToast({
              title: "Service updated",
              description: "Service updated successfully !.",
              status: "success",
            });
            setIsForm(false);
            dispatch(getAllServices());
            setRowItem(null);
            setService(initialValues);
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
      dispatch(addService({ userId, data: service }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            showToast({
              title: "Service added",
              description: "Service added successfully !.",
              status: "success",
            });
            setIsForm(false);
            dispatch(getAllServices());
            setService(initialValues);
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
        <Button onClick={() => setIsForm(true)}>Add service</Button>
      </div>
    );
  }, [search]);

  return (
    <div className="flex flex-col gap-2">
      {!isForm ? (
        <>
          <h2 className="text-lg font-semibold">Service list</h2>
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

            {/* Icon URL */}
            <div>
              <label className="block text-gray-700 mb-1">Icon</label>
              <ImageUploader
                value={service.iconUrl}
                onChange={(e) =>
                  setService((prev) => ({ ...prev, iconUrl: e?.url }))
                }
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-gray-700 mb-1"> Image</label>
              <ImageUploader
                value={service.image}
                onChange={(e) =>
                  setService((prev) => ({ ...prev, image: e?.url }))
                }
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

            {/* Description */}
            <div>
              <label className="block text-gray-700 mb-1">Description</label>
              <TextEditor
                value={service.description}
                onChange={(e) =>
                  setService((prev) => ({ ...prev, description: e }))
                }
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

      <Modal
        title={"Description"}
        width={'70%'}
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
    </div>
  );
};

export default AdminServices;
