import { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import useStore from "../../store/index.js";
import "./index.css";

function MainPage() {
  const { Dragger } = Upload;
  const [fileList, setFileList] = useState([]);
  const [fileContents, setFileContents] = useStore((state) => [
    state.fileContents,
    state.setFileContents,
  ]);

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
        setFileList([...fileList, info.file]);
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
          console.log(event);
          const newContent = event.target.result;
          setFileContents(newContent);
        };
        fileReader.readAsText(info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload: (file) => {
      const isTxt = file.type === "text/plain";
      if (!isTxt) {
        message.error(`${file.name} is not a txt file`);
      }

      return isTxt || Upload.LIST_IGNORE;
    },
    onRemove: (file) => {
      setFileContents("");
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
    </>
  );
}

export default MainPage;
