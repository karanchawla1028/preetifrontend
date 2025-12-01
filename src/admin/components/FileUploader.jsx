import React, { useState } from "react";
import axios from "axios";

const FileUploader = ({ value, onChange }) => {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await axios.post(
        "/api/images/upload", // IMPORTANT
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            accept: "application/json",
          },
        }
      );

      onChange(res.data.url);
    } catch (error) {
      console.error(
        "Upload error:",
        error.response?.status,
        error.response?.data
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="file"
        onChange={handleUpload}
        className="border border-gray-300 p-2 rounded cursor-pointer"
      />

      {loading && <p>Uploading...</p>}

      {/* {value && (
        <img src={value} className="w-32 h-32 object-cover rounded border" />
      )} */}
    </div>
  );
};

export default FileUploader;
