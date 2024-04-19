import React, { useState, useContext } from "react";
import { BsSendFill } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import useSendImage from "../../hooks/useSendImage";
import { CurrentChat } from "../../contexts/currentChat";

const ImageInput = ({ setshowImageUploadOption }) => {
  const { chatingWith, chatType } = useContext(CurrentChat);
  const { sendImage } = useSendImage();
  //   const [img, setImg] = useState("");
  const sendImageHandler = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const imgData = Object.fromEntries(data.entries());

    sendImage({ imgData });
  };
  return (
    <div className="w-full flex justify-center">
      <form
        className="flex w-96 justify-center  bg-gray-800 py-2 mx-3 rounded-xl"
        onSubmit={sendImageHandler}
      >
        <input type="file" name="image" className="text-white"></input>
        <div className="flex gap-3">
          <button type="submit" className="text-green-500">
            {/* {loading ? (
            <span className="loading loading-ring"></span>
          ) : ( */}
            <BsSendFill></BsSendFill>
            {/* )} */}
          </button>
          <button
            type="button"
            className="text-red-500 text-xl"
            onClick={() => {
              setshowImageUploadOption(false);
            }}
          >
            {/* {loading ? (
            <span className="loading loading-ring"></span>
          ) : ( */}
            <MdOutlineCancel></MdOutlineCancel>
            {/* )} */}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImageInput;
