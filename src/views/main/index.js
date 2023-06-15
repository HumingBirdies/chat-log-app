import { useEffect } from "react";
import TxtUploader from "../../components/txt-uploader/index.js";
import useStore from "../../store/index.js";
import "./index.css";

function Main() {
  const fileContents = useStore((state) => state.fileContents);

  useEffect(() => {
    console.log(fileContents);
  }, [fileContents]);

  // eslint-disable-next-line
  const findChattiestUser = (chatLog) => {
    // Step 1: Split the chat log into individual messages
    const messages = chatLog.split(/<[^>]+>/).filter(Boolean);

    // Step 2 & 3: Count the number of words in each message for each user
    const userWordCounts = {};
    messages.forEach((message) => {
      const username = message.split(" ")[0];
      const wordCount = message.trim().split(/\s+/).length - 1; // Subtract 1 to exclude the username
      userWordCounts[username] = (userWordCounts[username] || 0) + wordCount;
    });

    // Step 4: Identify the user with the highest word count
    let chattiestUser = null;
    let maxWordCount = 0;
    for (const username in userWordCounts) {
      if (userWordCounts[username] > maxWordCount) {
        maxWordCount = userWordCounts[username];
        chattiestUser = username;
      }
    }
    console.log(chattiestUser);
  };
  return (
    <div className="wrapper">
      <TxtUploader />

      <div className="log-content"></div>
    </div>
  );
}

export default Main;
