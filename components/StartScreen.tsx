import React, { useEffect, useRef, useState } from "react";
import Button from "./button";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

type Props = {};

const StartScreen = (props: Props) => {
  const [hasStarted, setHasStarted] = useState(false);
  const variantsTop = {
    shown: { opacity: 1 },
    hidden: { top: "-100vh", transition: { duration: 3, delay: 2 } },
  };

  const variantsBottom = {
    shown: { opacity: 1 },
    hidden: { bottom: "-100vh", transition: { duration: 3, delay: 2 } },
  };

  const variantsButton = {
    shown: { opacity: 1 },
    hidden: {
      opacity: 0,
      transition: {
        delay: 0.75,
        duration: 0.8,
      },
    },
  };

  return (
    <div
      className={cn(
        "min-h-screen w-full absolute z-10",
        hasStarted && "pointer-events-none",
      )}
    >
      <motion.div
        animate={hasStarted && "hidden"}
        variants={variantsTop}
        className="bg-pink-100 w-full h-[50vh] relative"
      ></motion.div>
      <motion.div
        animate={hasStarted && "hidden"}
        variants={variantsButton}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex items-center flex-col justify-center"
      >
        <Button
          className="border-4 hover:bg-white hover:text-pink-light hover:border-pink-light"
          onClick={() => {
            setHasStarted(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-6 h-6 fill-pink-light"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
            />
          </svg>
        </Button>
        <p className="text-black/80">(turn on your sound)</p>
      </motion.div>
      <motion.div
        animate={hasStarted && "hidden"}
        variants={variantsBottom}
        className="bg-pink-100 w-full h-[50vh] relative"
      ></motion.div>
    </div>
  );
};

export default StartScreen;
