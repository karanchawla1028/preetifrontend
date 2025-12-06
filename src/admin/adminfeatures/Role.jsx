import { useEffect, useMemo, useState } from "react";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../features/components/ToastProvider";
import { EllipsisVertical } from "lucide-react";
import Table from "../components/Table";
import PopConfirm from "../components/Popconfirm";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import { Link, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  addRoles,
  deleteRole,
  getAllRoles,
  updateRole,
} from "../../toolkit/slices/userSlice";

const blogSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

const Role = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { showToast } = useToast();
  const data = useSelector((state) => state.user.roleList);
  const [search, setSearch] = useState("");
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [isForm, setIsForm] = useState(false);
  const [rowItem, setRowItem] = useState(null);

  useEffect(() => {
    dispatch(getAllRoles());
  }, []);

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data?.filter((item) =>
      Object.values(item).join(" ").toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleDelete = (rowData) => {
    dispatch(deleteRole({ id: rowData?.id, userId }))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          showToast({
            title: "Success",
            description: "Role deleted successfully !.",
            status: "success",
          });
          dispatch(getAllRoles());
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
    reset({
      name: rowData.name,
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
      title: "Name",
      dataIndex: "name",
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
  const handleformSubmit = (data) => {
    e.preventDefault();
    if (rowItem) {
      dispatch(updateRole({ uuid: rowItem?.id, userId, name: data?.name }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            showToast({
              title: "Role updated",
              description: "Role updated successfully !.",
              status: "success",
            });
            setIsForm(false);
            dispatch(getAllRoles());
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
      dispatch(addRoles({ userId, name: data?.name }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            showToast({
              title: "Role added",
              description: "Role added successfully !.",
              status: "success",
            });
            setIsForm(false);
            dispatch(getAllRoles());
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
        <Button onClick={() => setIsForm(true)}>Add role</Button>
      </div>
    );
  }, [search]);

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Role list</h2>
      <Table
        columns={columns}
        dataSource={filteredData}
        topContent={topContent}
        className="w-full"
      />

      <Modal
        title={rowItem ? "Update role" : "Create role"}
        width={"70%"}
        open={isForm}
        onCancel={() => setIsForm(false)}
        onOk={handleSubmit(handleformSubmit)}
      >
        <form className="space-y-4 max-h-[70vh] overflow-auto">
          {/* TITLE */}

          <div className="flex flex-col">
            <label className="mb-1">Name</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input placeholder="Enter blog title" {...field} />
              )}
            />
            {errors.title && <p className="text-red-600 text-sm">Required</p>}
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Role;
