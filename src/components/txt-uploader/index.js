import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import "./index.css";

function MainPage() {
  const { Dragger } = Upload;
  const [fileContents, setFileContents] = useState("");
  const props = {
    name: "file",
    multiple: true,
    action: "https://run.mocky.io/v3/ed900ade-5c2c-4c27-9fdc-ba5893f7e2fc",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
          const fileContent = event.target.result;
          setFileContents((prevContents) => prevContents + fileContent);
          console.log(fileContent);
        };
        fileReader.readAsText(info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    beforeUpload: (file) => {
      const isTxt = file.type === "text/plain";
      if (!isTxt) {
        message.error(`${file.name} is not a txt file`);
      }
      return isTxt || Upload.LIST_IGNORE;
    },
  };

  return (
    <>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>

        <p className="ant-upload-hint">Support for a single or bulk upload</p>
      </Dragger>

      {fileContents}
    </>
  );
}

export default MainPage;
