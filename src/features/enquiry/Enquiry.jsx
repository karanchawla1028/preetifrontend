import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEnquiries } from "../../toolkit/slices/enquirySlice";
import { useParams } from "react-router-dom";
import SearchInput from "../../admin/components/SearchInput";
import DynamicTable from "../../admin/components/DynamicTable";

const Enquiry = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const enquiryList = useSelector((state) => state.enquiry.enquiryList);

  useEffect(() => {
    dispatch(getAllEnquiries({ userId, page: 1, size: 300 }));
  }, [dispatch]);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (value, rowData) => <p>{value}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Slug",
      dataIndex: "slug",
    },
    {
      title: "Message",
      dataIndex: "message",
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-semibold font-sans text-xl">Enquiry list</h2>
      <div className="flex justify-between items-center">
        <SearchInput />
      </div>
      <DynamicTable columns={columns} data={enquiryList} />
    </div>
  );
};

export default Enquiry;
