import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({ initialValue, onChange }) => {
  return (
    <ReactQuill
      value={initialValue || ""}
      onChange={onChange}
      theme="snow"
    />
  );
};

export default RichTextEditor;
