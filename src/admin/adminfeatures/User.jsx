import React, { useEffect, useMemo, useState } from "react";
import Button from "../components/Button";
import { data } from "../../commons";
import SearchInput from "../components/SearchInput";
import DynamicTable from "../components/DynamicTable";
import { ArrowLeft, EllipsisVertical } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  deleteUser,
  getAllRoles,
  getAllUsers,
  updateUser,
} from "../../toolkit/slices/userSlice";
import { useToast } from "../../features/components/ToastProvider";
import { useParams } from "react-router-dom";
import PopConfirm from "../components/Popconfirm";
import Dropdown from "../components/Dropdown";
import Table from "../components/Table";
import Select from "../../features/components/Select";
import Modal from "../components/Modal";
import Input from "../components/Input";

const User = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { showToast } = useToast();
  const data = useSelector((state) => state.user.userList);
  const roleList = useSelector((state) => state.user.roleList);
  const [isForm, setIsForm] = useState(false);
  const [search, setSearch] = useState("");
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [rowItem, setRowItem] = useState(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    facebook: "",
    linkedin: "",
    twitter: "",
    metaTitle: "",
    metaKeyword: "",
    metaDescription: "",
    roleId: 0,
  });

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllRoles());
  }, [dispatch]);

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data?.filter((item) =>
      Object.values(item).join(" ").toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = (rowData) => {
    dispatch(deleteUser({ id: rowData?.id, userId }))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          showToast({
            title: "Success",
            description: "User deleted successfully !.",
            status: "success",
          });
          dispatch(getAllUsers());
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
    setUser({
      name: rowData?.name,
      email: rowData?.email,
      password: rowData?.password,
      mobile: rowData?.mobile,
      facebook: rowData?.facebook,
      linkedin: rowData?.linkedin,
      twitter: rowData?.twitter,
      metaTitle: rowData?.metaTitle,
      metaKeyword: rowData?.metaKeyword,
      metaDescription: rowData?.metaDescription,
      roleId: rowData?.roleId,
    });
    setRowItem(rowData);
    setIsForm(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "30%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "35%",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value) => (
        <span
          className={`px-2 py-1 text-xs rounded ${
            value === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {value}
        </span>
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

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(user);
    if (rowItem) {
      dispatch(updateUser({ id: rowItem?.id, data: user }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            showToast({
              title: "Success",
              description: "User created successfully !.",
              status: "success",
            });
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
      dispatch(addUser({ userId, data: user }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            showToast({
              title: "Success",
              description: "User created successfully !.",
              status: "success",
            });
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
        <Button onClick={() => setIsForm(true)}>Add user</Button>
      </div>
    );
  }, [search]);

  return (
    <div className="flex flex-col gap-2">
      <>
        <h2 className="font-semibold font-sans text-xl">User</h2>
        <Table
          scroll={{ y: "60vh" }}
          columns={columns}
          data={data}
          topContent={topContent}
        />
        <Modal
          open={isForm}
          width={"50%"}
          title={rowItem ? "Update user" : "Add user"}
          onOk={handleSubmit}
          onCancel={() => setIsForm(false)}
        >
          <form className="grid grid-cols-2 gap-4 max-h-[60vh] overflow-auto">
            {/* Name */}
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter full name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email address"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
                required
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-gray-700 mb-1">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={user.mobile}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter mobile number"
              />
            </div>

            {/* Social Links */}
            <div>
              <label className="block text-gray-700 mb-1">Facebook</label>
              <input
                type="text"
                name="facebook"
                value={user.facebook}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Facebook profile URL"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">LinkedIn</label>
              <input
                type="text"
                name="linkedin"
                value={user.linkedin}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                placeholder="LinkedIn profile URL"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Twitter</label>
              <input
                type="text"
                name="twitter"
                value={user.twitter}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Twitter profile URL"
              />
            </div>

            {/* Meta Title */}
            <div>
              <label className="block text-gray-700 mb-1">Meta Title</label>
              <input
                type="text"
                name="metaTitle"
                value={user.metaTitle}
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
                value={user.metaKeyword}
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
                value={user.metaDescription}
                onChange={handleChange}
                rows="2"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter meta description"
              />
            </div>

            {/* Role ID */}
            <div>
              <label className="block text-gray-700 mb-1">Role ID</label>
              <Select
                value={user?.roleId}
                options={
                  roleList?.length > 0
                    ? roleList?.map((item) => ({
                        label: item?.name,
                        value: item?.id,
                      }))
                    : []
                }
                onChange={(e) => setUser((prev) => ({ ...prev, roleId: e }))}
              />
            </div>
          </form>
        </Modal>
      </>
    </div>
  );
};

export default User;
