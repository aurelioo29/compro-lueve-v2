"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});

const toolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ align: [] }],
  ["blockquote", "link", "image"],
  ["clean"],
];

export default function BlogQuillEditor({
  value = "",
  onChange = () => {},
  placeholder = "Write your blog content...",
}) {
  const modules = {
    toolbar: {
      container: toolbarOptions,
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "align",
    "blockquote",
    "link",
    "image",
  ];

  return (
    <div className="blog-quill-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
}
