import { useEffect, useMemo, useState } from "react";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  addBlogs,
  deleteBlogById,
  getBlogsList,
  updateBlog,
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

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().optional(),
  metaTitle: z.string().optional(),
  metaKeyword: z.string().optional(),
  metaDescription: z.string().optional(),
  slug: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  active: z.boolean().default(true),
  showOnHome: z.boolean().default(true),
  categoryId: z.number().min(1, "Select category"),
  subCategoryId: z.number().min(1, "Select subcategory"),
  serviceId: z.number().min(1, "Select service"),
});

const Blog = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { showToast } = useToast();
  const data = useSelector((state) => state.blogs.blogList);
  const categoryList = useSelector((state) => state.service.categoriesList);
  const subCategoryList = useSelector(
    (state) => state.service.subCategoryListByCategoryId
  );
  const serviceList = useSelector(
    (state) => state.service.serviceListBySubCategoryId
  );
  const [search, setSearch] = useState("");
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [isForm, setIsForm] = useState(false);
  const [rowItem, setRowItem] = useState(null);

  useEffect(() => {
    dispatch(getBlogsList());
    dispatch(getAllCategories());
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
    },
  });

  const handleDelete = (rowData) => {
    dispatch(deleteBlogById({ id: rowData?.id, userId }))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          showToast({
            title: "Success",
            description: "Blog deleted successfully !.",
            status: "success",
          });
          dispatch(getBlogsList());
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
    dispatch(getSubCategoryListByCategoryId(rowData.categoryId));
    dispatch(getServiceBySubCategoryId(rowData.subCategoryId));
    reset({
      title: rowData.title,
      excerpt: rowData.excerpt,
      metaTitle: rowData.metaTitle,
      metaKeyword: rowData.metaKeyword,
      metaDescription: rowData.metaDescription,
      slug: rowData.slug,
      thumbnailUrl: rowData.thumbnailUrl,
      active: rowData.active,
      showOnHome: rowData.showOnHome,
      categoryId: rowData.categoryId,
      subCategoryId: rowData.subCategoryId,
      serviceId: rowData.serviceId,
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
      title: "Title",
      dataIndex: "title",
      render: (value, rowData) => <p className="text-wrap ">{value}</p>,
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
      title: "Slug",
      dataIndex: "slug",
      render: (value, rowData) => <p className="text-wrap">{value}</p>,
    },
    {
      title: "Description",
      dataIndex: "metaDescription",
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
              {
                key: 1,
                label: <Link to={`${record?.id}/blogFaqs`}>FAQ's</Link>,
              },
              {
                key: 2,
                label: <Link to={`${record?.id}/blogDetail`}>Details</Link>,
              },
              { key: 3, label: "edit", onClick: () => handleEdit(record) },
              {
                key: 4,
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
      dispatch(updateBlog({ id: rowItem?.id, userId, data }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            showToast({
              title: "Blogs updated",
              description: "Blog updated successfully !.",
              status: "success",
            });
            setIsForm(false);
            dispatch(getBlogsList());
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
      dispatch(addBlogs({ userId, data }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            showToast({
              title: "Blogs added",
              description: "Blog added successfully !.",
              status: "success",
            });
            setIsForm(false);
            dispatch(getBlogsList());
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
      <h2 className="text-lg font-semibold">Blogs list</h2>
      <Table
        columns={columns}
        dataSource={filteredData}
        topContent={topContent}
        className="w-full"
      />

      <Modal
        title={rowItem ? "Update blog" : "Create blog"}
        width={"70%"}
        open={isForm}
        onCancel={() => setIsForm(false)}
        onOk={handleSubmit(handleformSubmit)}
      >
        <form className="space-y-4 max-h-[70vh] overflow-auto">
          {/* TITLE */}

          <div className="flex flex-col">
            <label className="mb-1">Title</label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input placeholder="Enter blog title" {...field} />
              )}
            />
            {errors.title && <p className="text-red-600 text-sm">Required</p>}
          </div>

          {/* CATEGORY */}

          <div className="flex flex-col">
            <label className="mb-1">Category</label>
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <Select
                  options={
                    categoryList?.length > 0
                      ? categoryList?.map((item) => ({
                          label: item?.name,
                          value: item?.id,
                        }))
                      : []
                  }
                  value={field.value}
                  onChange={(val) => {
                    field.onChange(val);
                    dispatch(getSubCategoryListByCategoryId(val));
                  }}
                />
              )}
            />
            {errors.categoryId && (
              <p className="text-red-600 text-sm">Required</p>
            )}
          </div>

          {/* SUB CATEGORY */}

          <div className="flex flex-col">
            <label className="mb-1">Subcategory</label>
            <Controller
              name="subCategoryId"
              control={control}
              render={({ field }) => (
                <Select
                  label="Sub Category"
                  options={
                    subCategoryList?.length > 0
                      ? subCategoryList?.map((item) => ({
                          label: item?.name,
                          value: item?.id,
                        }))
                      : []
                  }
                  value={field.value}
                  onChange={(val) => {
                    field.onChange(val);
                    dispatch(getServiceBySubCategoryId(val));
                  }}
                />
              )}
            />
            {errors.subCategoryId && (
              <p className="text-red-600 text-sm">Required</p>
            )}
          </div>

          {/* SERVICE */}
          <div className="flex flex-col">
            <label className="mb-1">Service</label>
            <Controller
              name="serviceId"
              control={control}
              render={({ field }) => (
                <Select
                  options={
                    serviceList?.length > 0
                      ? serviceList?.map((item) => ({
                          label: item?.name,
                          value: item?.id,
                        }))
                      : []
                  }
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.serviceId && (
              <p className="text-red-600 text-sm">Required</p>
            )}
          </div>

          {/* EXCERPT */}
          <div className="flex flex-col">
            <label className="mb-1">Excerpt</label>
            <Controller
              name="excerpt"
              control={control}
              render={({ field }) => (
                <textarea
                  rows={2}
                  placeholder="Excerpt"
                  className="border p-2 w-full rounded"
                  {...field}
                />
              )}
            />
            {errors.excerpt && <p className="text-red-600 text-sm">Required</p>}
          </div>

          {/* META TITLE */}
          <div className="flex flex-col">
            <label className="mb-1">Meta Title</label>
            <Controller
              name="metaTitle"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
            {errors.metaTitle && (
              <p className="text-red-600 text-sm">Required</p>
            )}
          </div>

          {/* META KEYWORD */}
          <div className="flex flex-col">
            <label className="mb-1">Meta Keyword</label>
            <Controller
              name="metaKeyword"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
            {errors.metaKeyword && (
              <p className="text-red-600 text-sm">Required</p>
            )}
          </div>

          {/* META DESCRIPTION */}
          <div className="flex flex-col">
            <label className="mb-1">Meta Description</label>
            <Controller
              name="metaDescription"
              control={control}
              render={({ field }) => (
                <textarea
                  className="border p-2 w-full rounded"
                  rows={2}
                  {...field}
                />
              )}
            />
            {errors.metaDescription && (
              <p className="text-red-600 text-sm">Required</p>
            )}
          </div>

          {/* SLUG */}
          <div className="flex flex-col">
            <label className="mb-1">Slug</label>
            <Controller
              name="slug"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
            {errors.slug && <p className="text-red-600 text-sm">Required</p>}
          </div>

          {/* IMAGE */}
          <div className="flex flex-col">
            <label className="mb-1">Thumbnail</label>
            <Controller
              name="thumbnailUrl"
              control={control}
              render={({ field }) => (
                <ImageUploader
                  value={field.value}
                  onChange={(e) => field.onChange(e?.url)}
                />
              )}
            />
            {errors.thumbnailUrl && (
              <p className="text-red-600 text-sm">Required</p>
            )}
          </div>

          {/* ACTIVE */}
          <div className="flex flex-col">
            {/* <label className="mb-1">Active</label> */}
            <Controller
              name="active"
              control={control}
              render={({ field }) => (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                  Active
                </label>
              )}
            />
            {errors.active && <p className="text-red-600 text-sm">Required</p>}
          </div>

          {/* SHOW ON HOME */}
          <div className="flex flex-col">
            {/* <label className="mb-1">Show on home page</label> */}
            <Controller
              name="showOnHome"
              control={control}
              render={({ field }) => (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                  Show On Home
                </label>
              )}
            />
            {errors.showOnHome && (
              <p className="text-red-600 text-sm">Required</p>
            )}
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Blog;
