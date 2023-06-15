import TxtUploader from "../../components/txt-uploader/index.js";
import "./index.css";

function Main() {
  return (
    <div className="wrapper">
      <TxtUploader />

      <div className="log-content"></div>
    </div>
  );
}

export default Main;
