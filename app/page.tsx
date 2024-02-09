"use client";

import StartScreen from "@/components/StartScreen";
import Button from "@/components/button";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ReactHowler from "react-howler";

export default function Home() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [hasHoveredOverNo, setHasHoveredOverNo] = useState(false);
  const noRef = useRef<HTMLDivElement>(null);

  const phrases = [
    "HI BABY!!!",
    "look what i made for you!! :D",
    "do you still regret dating a cs major (yes you do)",
    "i hope you're enjoying the music too!! 🎶",
    "go mocha! go mocha! (he groovin fr)",
    "makes me just wanna dance...",
    "with you...🫣",
    "can't you believe valentine's day is almost here?",
    "i know you've been waiting for this...",
    "so here goes nothing...",
    "ahem...",
    "roses are red...",
    "violets are blue...",
    "honey is sweet...",
    "and so are you!",
    "roses are red...",
    "the earth is wide...",
    "i want to be...",
    "right by your side!!!",
    "roses are red...",
    "violets are blue...",
    "i hate poetry...",
    "but i'm in love with you <3",
    "roses are red...",
    "violets are blue...",
    "make my dreams come true...",
    "and be my boo...",
    "can i be your...",
    "VALENTINE?",
  ];

  const danceGIFBounds = [3, 4, 5];
  const groupDanceGIFBounds = [6, 7];
  const hugRubGIFBounds = [8, 9];
  const readingGIFBounds = [
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
  ];
  const flowersBounds = [28];

  const determineGIF = (phraseIndex: number) => {
    switch (true) {
      case danceGIFBounds.includes(phraseIndex):
        return "/gifs/dance.gif";
      case groupDanceGIFBounds.includes(phraseIndex):
        return "/gifs/group-dance.gif";
      case hugRubGIFBounds.includes(phraseIndex):
        return "/gifs/hug-rub.gif";
      case readingGIFBounds.includes(phraseIndex):
        return "/gifs/reading.gif";
      case flowersBounds.includes(phraseIndex):
        return "/gifs/heart.gif";
      default:
        return "/gifs/bouncing.gif";
    }
  };

  const moveToRandomPosition = () => {
    const no = noRef.current as HTMLDivElement;
    // Set initial position as the current position it is at
    if (!no.style.top) no.style.top = no.offsetTop + "px";
    if (!no.style.left) no.style.left = no.offsetLeft + "px";

    // Add the absolute position to the element
    no.style.position = "absolute";

    // Make the transition duration 3 seconds with an ease-in-out timing function
    no.style.transition = "top 0.4s, left 0.4s";

    // Get the window width and height
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Get the element width and height
    const elementWidth = no.offsetWidth;
    const elementHeight = no.offsetHeight;

    // Get the max width and height
    const maxWidth = windowWidth - elementWidth;
    const maxHeight = windowHeight - elementHeight;

    // Set the random position
    no.style.left = `${Math.floor(Math.random() * maxWidth)}px`;
    no.style.top = `${Math.floor(Math.random() * maxHeight)}px`;
  };

  useEffect(() => {
    // On resize, reset the position of the element
    window.addEventListener("resize", () => {
      if (noRef.current === null) return;
      moveToRandomPosition();
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center flex-col relative overflow-y-hidden">
      <StartScreen />
      <ReactHowler
        src="/music/cupid.mp3"
        playing={true}
        loop={true}
        volume={0.35}
      />
      <div>
        <p className={cn("mb-1 text-xs", phraseIndex > 2 && "invisible")}>
          literally me rn:
        </p>
        <div
          className={cn(
            "w-96 h-96 relative rounded-lg overflow-hidden bg-white",
          )}
        >
          <Image
            className="rounded-lg border-4 border-pink-light w-full h-full object-contain"
            src={determineGIF(phraseIndex)}
            priority
            alt="gif"
            fill={true}
            width={0}
            height={0}
          />
        </div>
      </div>
      <div className="text-4xl mt-2 mb-1">
        <AnimatePresence mode="wait">
          <motion.p
            key={phraseIndex}
            className="text-center typewriter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {phrases[phraseIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {phraseIndex < phrases.length - 1 ? (
        <Button
          className="hover:scale-100 mt-1"
          onClick={() => setPhraseIndex((phraseIndex + 1) % phrases.length)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </Button>
      ) : (
        <div className="flex gap-x-2">
          <Button className="rounded-lg px-6 py-[6px] text-pink-dark border-pink-dark hover:scale-100 hover:bg-pink-dark text-4xl">
            YES
          </Button>

          <div
            onClick={moveToRandomPosition}
            onMouseOver={moveToRandomPosition}
            className="relative transition-all"
            ref={noRef}
          >
            <Button className="rounded-lg px-6 py-[6px] text-pink-light border-pink-light hover:scale-100 hover:bg-pink-light text-4xl">
              no
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
