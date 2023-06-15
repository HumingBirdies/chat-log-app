import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import "./index.css";

function MainPage() {
  const { Dragger } = Upload;
  const fileContents = [];

  const props = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
          const fileContent = event.target.result;
          fileContents.push(fileContent);
        };
        fileReader.readAsText(info.file.originFileObj);
        console.log(fileContents);
        checkWordCount();
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

  const checkWordCount = () => {
    fileContents.forEach((fileContent) => {});
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
      {fileContents.map((i) => (
        <h1>{i}</h1>
      ))}
    </>
  );
}

export default MainPage;
