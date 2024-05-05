import React, { useEffect, useState } from "react";
import style from "./chatbox.module.css";
import { MessageIcon } from "../icons";
import { motion, useAnimationControls } from "framer-motion";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  MessageModel,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { futuna } from "../../../public/fonts/futura";
import axios from "axios";
const wrapperVariants = {
  hidden: {
    opacity: 0,
    x: "50",
    y: "0",
    display: "none",
  },
  visible: {
    opacity: 1,
    x: "0",
    y: "0",
    transition: { type: "spring", delay: 0.1 },
    display: "block",
  },
  exit: {
    y: "-100vh",
    transition: { ease: "easeInOut" },
  },
};

export default function ChatBox(): React.ReactNode {
  const controls = useAnimationControls();
  const [messageList, setMessageList] = useState<MessageModel[]>([
    {
      message: "Hello my friend",
      sentTime: "just now",
      sender: "server",
      direction: "incoming",
      position: "first",
    },
  ]);
  const [show, setShow] = useState(true);
  const [isAnswering, setIsAnswering] = useState(false);
  function getAnswer(messageList: MessageModel[]) {
    let data = JSON.stringify({
      input: messageList[messageList.length - 1].message,
      config: {},
      kwargs: {},
    });
    console.log(messageList[messageList.length - 1].message);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://phuochungus-chatbot-ai.hf.space/rag-redis/invoke",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((res) => {
        console.log(JSON.stringify(res.data));
        let result = [...messageList];
        result.push({
          message: res.data.output,
          sentTime: new Date().toISOString(),
          sender: "server",
          direction: "incoming",
          position: "first",
        });
        setMessageList(result);
        setIsAnswering(false);
      })
      .catch((res) => {
        console.log(res);
      });
  }
  useEffect(() => {
    require("@chatscope/chat-ui-kit-styles/dist/default/styles.min.css");
  }, []);

  return (
    <>
      <motion.div
        variants={wrapperVariants}
        initial="hidden"
        animate={controls}
        exit="exit"
        style={{
          position: "fixed",
          bottom: "1vw",
          right: "1vw",
          zIndex: "9999",
        }}
      >
        <MainContainer
          className={futuna.className}
          style={{
            display: "block",
            width: "20vw",
            borderRadius: "5%",
            zIndex: "9999",
          }}
        >
          <div
            style={{
              width: "100%",
              textAlign: "center",
              cursor: "pointer",
              display: "flex",
              padding: "0 1vw",
              justifyContent: "space-between",
            }}
            onClick={(e) => {
              setShow(true);
              controls.start("hidden");
            }}
          >
            {"Chat box"}
            <button className={style.line}></button>
          </div>
          <ChatContainer>
            <MessageList>
              <div
                className={style.noScrollBar}
                style={{ width: "100%", height: "50vh", overflowX: "scroll" }}
              >
                {messageList.map((value, index) => (
                  <Message model={value} key={index} />
                ))}
                <div style={{ width: "100%", height: "10px" }} />
              </div>
              {isAnswering && <TypingIndicator />}
            </MessageList>

            <MessageInput
              placeholder="Type message here"
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  let result = [...messageList];
                  result.push({
                    message: (e.target as HTMLDivElement).innerHTML,
                    sentTime: new Date().toISOString(),
                    sender: "user",
                    direction: "outgoing",
                    position: "normal",
                  });
                  setMessageList(result);
                  setIsAnswering(true);
                  getAnswer(result);
                }
              }}
            />
          </ChatContainer>
        </MainContainer>
      </motion.div>
      {show && (
        <div
          className={style.chatBox}
          onClick={() => {
            setShow(false);
            controls.start("visible");
          }}
        >
          <button>
            <MessageIcon color={"white"} />
          </button>
        </div>
      )}
    </>
  );
}
