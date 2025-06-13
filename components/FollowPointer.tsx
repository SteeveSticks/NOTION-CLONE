import React from "react";
import { motion } from "framer-motion";
import stringToColor from "@/lib/stringToColor";

const FollowPointer = ({
  x,
  y,
  info,
}: {
  x: number | undefined;
  y: number | undefined;
  info: {
    name: string;
    email: string;
    avatar: string;
  };
}) => {
  const color = stringToColor(info.email || "1");

  return (
    <motion.div
      className="h-4 w-4 rounded-full absolute z-40"
      style={{
        top: y,
        left: x,
        pointerEvents: "none",
      }}
      initial={{
        scale: 1,
        opacity: 1,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}
    >
      <svg
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          /* already positioned by parent */
        }}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m13.67 6.03-11-4a.5.5 0 0 0-.64.64l4 11a.5.5 0 0 0 .935.015l1.92-4.8 4.8-1.92a.5.5 0 0 0 0-.935h-.015Z"
          fill={color}
        />
      </svg>

      <motion.div
        style={{
          backgroundColor: color,
          borderRadius: 20,
        }}
        initial={{
          scale: 0.5,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={{
          scale: 0,
          opacity: 0,
        }}
        className="absolute top-5 left-2 rounded-3xl px-3 py-1"
      >
        <p className="whitespace-nowrap text-xs leading-relaxed text-white">
          {info.name || info.email}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default FollowPointer;
