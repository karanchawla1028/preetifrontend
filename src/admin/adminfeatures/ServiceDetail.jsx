import React, { useEffect, useMemo, useState } from "react";
import Button from "../components/Button";
import { ArrowLeft, EllipsisVertical } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addServiceDetailById,
  deleteServiceDetailById,
  getServiceDetailById,
  updateServiceDetailById,
} from "../../toolkit/slices/serviceSlice";
import { useParams } from "react-router-dom";
import TextEditor from "../../features/components/TextEditor";
import Dropdown from "../components/Dropdown";
import PopConfirm from "../components/Popconfirm";
import Table from "../components/Table";
import Input from "../components/Input";
import Modal from "../components/Modal";
import { useToast } from "../../features/components/ToastProvider";

const ServiceDetail = () => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { serviceId, userId } = useParams();
  const data = useSelector((state) => state.service.serviceDetail);
  const [isForm, setIsForm] = useState(false);
  const [search, setSearch] = useState("");
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [rowItem, setRowItem] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [description, setDescription] = useState(null);
  const initialValues = {
    heading: "",
    details: "",
    displayOrder: 0,
    serviceId: serviceId,
    displayStatus: true,
    active: true,
  };
  const [serviceDetail, setServiceDetail] = useState(initialValues);

  useEffect(() => {
    dispatch(getServiceDetailById(serviceId));
  }, [serviceId]);

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data?.filter((item) =>
      Object.values(item).join(" ").toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

  const handleDelete = (rowData) => {
    dispatch(deleteServiceDetailById({ id: rowData?.id, userId }))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          showToast({
            title: "Success",
            description: "Service FAQ deleted successfully !.",
            status: "success",
          });
          dispatch(getServiceDetailById(serviceId));
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
    setServiceDetail({
      heading: rowData?.heading,
      details: rowData?.details,
      displayOrder: rowData?.displayOrder,
      active: rowData?.active,
      displayStatus: rowData?.displayStatus,
      serviceId: serviceId,
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
      setServiceDetail((prev) => ({
        ...prev,
        name: value,
        slug: generatedSlug,
      }));
      return;
    }
    setServiceDetail((prev) => ({
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
      title: "Heading",
      dataIndex: "heading",
      render: (value, rowData) => <p className="text-wrap">{value}</p>,
    },
    {
      title: "Description",
      dataIndex: "details",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rowItem) {
      dispatch(
        updateServiceDetailById({
          id: rowItem?.id,
          userId,
          data: serviceDetail,
        })
      )
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            showToast({
              title: "Service detail updated",
              description: "Service detail updated successfully !.",
              status: "success",
            });
            setIsForm(false);
            dispatch(getServiceDetailById(serviceId));
            setRowItem(null);
            setServiceDetail(initialValues);
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
      dispatch(addServiceDetailById({ userId, data: serviceDetail }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            showToast({
              title: "Service detail added",
              description: "Service detail added successfully !.",
              status: "success",
            });
            setIsForm(false);
            dispatch(getServiceDetailById(serviceId));
            setServiceDetail(initialValues);
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
        <Button onClick={() => setIsForm(true)}>Add service detail</Button>
      </div>
    );
  }, [search]);

  return (
    <div className="flex flex-col gap-2">
      {!isForm ? (
        <>
          <h2 className="text-lg font-semibold">Service detail list</h2>
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
              {rowItem ? "Update Service detail" : "Add Service detail"}
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-700 mb-1">Heading</label>
              <input
                type="text"
                name="heading"
                value={serviceDetail.heading}
                onChange={handleChange}
                placeholder="Enter service name"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 mb-1">Description</label>
              <TextEditor
                value={serviceDetail.details}
                onChange={(e) =>
                  setServiceDetail((prev) => ({ ...prev, details: e }))
                }
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Display order</label>
              <input
                type="number"
                name="displayOrder"
                value={serviceDetail.displayOrder}
                onChange={handleChange}
                placeholder="Enter display order"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Checkboxes */}
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="active"
                  checked={serviceDetail.active}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600"
                />
                <span className="text-gray-700">Active</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="displayStatus"
                  checked={serviceDetail.displayStatus}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600"
                />
                <span className="text-gray-700">Display Status</span>
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
    </div>
  );
};

export default ServiceDetail;
