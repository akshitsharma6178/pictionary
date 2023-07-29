import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const Chat = () => {
  const [chatLog, setChatLog] = useState([]);
  const socket =io('http://127.0.0.1:3001');
  // const maxLength = 9;

  const inputEl = useRef();
  const sendMsg = () => {
    socket.emit("guess_word", {
      from: socket.id,
      msg: inputEl.current.value,
    });
  };

  useEffect(() => {
    socket.on("new_msg", (data) => {
      setChatLog([...chatLog, data]);
    });
  }, [socket, chatLog]);

  return (
    <div className="w-[50%] h-[30rem] bg-red-50 flex flex-col">
      <div className="bg-gray-200 h-[30rem] overflow-auto w-full">
        {chatLog.map((log, i) => (
          <div key={i} className="flex gap-2" id={i}>
            <span className="font-bold">{log.from}:</span>
            <span>{log.msg}</span>
          </div>
        ))}
      </div>

      <div className="flex w-full">
        <input className="mt-auto border-2 border-black h-full w-[70%]" ref={inputEl}></input>
        <button className="bg-white p-2 border-2 flex-1" onClick={sendMsg}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
