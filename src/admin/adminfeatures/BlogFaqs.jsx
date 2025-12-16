import { useEffect, useMemo, useState } from "react";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  addBlogFAQS,
  addBlogs,
  deleteBlogById,
  deleteBlogFAQS,
  getBlogFAQsByBlogId,
  getBlogsList,
  updateBlog,
  updateBlogFAQS,
} from "../../toolkit/slices/blogSlice";
import Select from "../../features/components/Select";
import {
  getAllCategories,
  getServiceBySubCategoryId,
  getSubCategoryListByCategoryId,
} from "../../toolkit/slices/serviceSlice";
import { useToast } from "../../features/components/ToastProvider";
import { EllipsisVertical } from "lucide-react";
import ImageUploader from "../components/ImageUploader";
import Table from "../components/Table";
import PopConfirm from "../components/Popconfirm";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import { Link, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextEditor from "../../features/components/TextEditor";

const blogSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "please enter answer"),
  displayOrder: z.string().optional(),
});

const BlogFaqs = () => {
  const dispatch = useDispatch();
  const { userId, blogId } = useParams();
  const { showToast } = useToast();
  const data = useSelector((state) => state.blogs.blogList);
  const [description, setDescription] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [isForm, setIsForm] = useState(false);
  const [rowItem, setRowItem] = useState(null);

  useEffect(() => {
    dispatch(getBlogFAQsByBlogId(blogId));
  }, [dispatch, blogId]);

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
      question: "",
      answer: "",
      displayOrder: "",
    },
  });

  const handleDelete = (rowData) => {
    dispatch(deleteBlogFAQS({ id: rowData?.id, userId }))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          showToast({
            title: "Success",
            description: "Blog faq deleted successfully !.",
            status: "success",
          });
          dispatch(getBlogFAQsByBlogId(blogId));
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
      question: rowData.question,
      answer: rowData.answer,
      displayOrder: rowData.displayOrder,
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
      title: "Question",
      dataIndex: "question",
      render: (value, rowData) => <p className="text-wrap text-sm">{value}</p>,
    },
    {
      title: "Display order",
      dataIndex: "displayOrder",
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

  // Submit handler
  const handleformSubmit = (data) => {
    if (rowItem) {
      dispatch(updateBlogFAQS({ id: rowItem?.id, userId, data }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            showToast({
              title: "FAQ updated",
              description: "Blog faq updated successfully !.",
              status: "success",
            });
            setIsForm(false);
            dispatch(getBlogFAQsByBlogId(blogId));
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
      dispatch(addBlogFAQS({ userId, data }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            showToast({
              title: "FAQ added",
              description: "Blog faq added successfully !.",
              status: "success",
            });
            setIsForm(false);
            dispatch(getBlogFAQsByBlogId(blogId));
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
        <Button onClick={() => setIsForm(true)}>Add blog</Button>
      </div>
    );
  }, [search]);

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Blogs FAQ's</h2>
      <Table
        columns={columns}
        dataSource={filteredData}
        topContent={topContent}
        className="w-full"
      />

      <Modal
        title={rowItem ? "Update blog faq" : "Create blog faq"}
        width={"70%"}
        open={isForm}
        onCancel={() => setIsForm(false)}
        onOk={handleSubmit(handleformSubmit)}
      >
        <form className="space-y-4 max-h-[70vh] overflow-auto">
          {/* TITLE */}

          <div className="flex flex-col">
            <label className="mb-1">Question</label>
            <Controller
              name="question"
              control={control}
              render={({ field }) => (
                <Input placeholder="Enter question" {...field} />
              )}
            />
            {errors.question && (
              <p className="text-red-600 text-sm">Required</p>
            )}
          </div>

          {/* SHOW ON HOME */}
          <div className="flex flex-col">
            <label className="mb-1">Display order</label>
            <Controller
              name="displayOrder"
              control={control}
              render={({ field }) => (
                <Input placeholder="Enter blog title" {...field} />
              )}
            />
            {errors.showOnHome && (
              <p className="text-red-600 text-sm">Required</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Answer</label>
            <Controller
              name="answer"
              control={control}
              render={({ field }) => (
                <TextEditor
                  value={field.value}
                  onChange={(e) => field.onChange(e)}
                />
              )}
            />
            {errors.answer && <p className="text-red-600 text-sm">Required</p>}
          </div>
        </form>
      </Modal>

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

export default BlogFaqs;
