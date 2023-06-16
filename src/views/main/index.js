import { useEffect, useState } from "react";
import TxtUploader from "../../components/txt-uploader/index.js";
import useStore from "../../store/index.js";
import "./index.css";

function Main() {
  const fileContents = useStore((state) => state.fileContents);
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log(fileContents);
    const userWordCount = {};
    const lines = fileContents.split("\n");
    let user = "";

    //loop for word calculation for each user
    lines.forEach((line) => {
      const match = line.match(/<([^>]+)>/);
      match && (user = match[1]);
      const words = line
        .split(" ")
        .filter((word) => word.trim() !== "" && word !== `<${user}>`);
      const wordCount = words.length;
      userWordCount[user]
        ? (userWordCount[user] += wordCount)
        : user !== "" && (userWordCount[user] = wordCount);
    });

    //sort in descending order & object structure formatting
    const sortedObject = Object.entries(userWordCount)
      .sort((a, b) => b[1] - a[1])
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
    setUser(sortedObject);
  }, [fileContents]);

  return (
    <div className="wrapper">
      <TxtUploader />

      <div className="log-content">
        {Object.entries(user).map(([key, value], index) => (
          <div key={key}>
            <p>{index + 1 + ". " + key + " - " + value + " words"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
