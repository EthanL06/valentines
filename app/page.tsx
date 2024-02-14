"use client";

import StartScreen from "@/components/StartScreen";
import Button from "@/components/button";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ReactHowler from "react-howler";
import { useReward } from "react-rewards";

export default function Home() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const { reward, isAnimating } = useReward("rewardId", "emoji", {
    emoji: ["❤️", "💖", "💕", "💞", "💓", "💗", "💝", "💘", "💟", "❣️"],
    startVelocity: 30,
    angle: 90,
    spread: 350,
    elementCount: 50,
    lifetime: 500,
    elementSize: 50,
    position: "fixed",
  });
  const [onYesClick, setOnYesClick] = useState(false);

  const noRef = useRef<HTMLDivElement>(null);

  const phrases = [
    "HI BABY!!!",
    "look what i made for you!!",
    "still regret dating a cs major? (yes you do)",
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

  // The indices of the phrases that correspond to the GIFs
  const danceGIFBounds = [3, 4, 5];
  const groupDanceGIFBounds = [6, 7];
  const hugRubGIFBounds = [8, 9];
  const readingGIFBounds = [
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
  ];

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
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-y-hidden">
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
            "relative h-96 w-96 overflow-hidden rounded-lg bg-white",
          )}
        >
          {phraseIndex < phrases.length - 1 ? (
            <Image
              className="h-full w-full rounded-lg border-4 border-pink-light object-contain"
              src={determineGIF(phraseIndex)}
              priority
              alt="gif"
              fill={true}
              width={0}
              height={0}
            />
          ) : (
            <Image
              className="h-full w-full rounded-lg border-4 border-pink-light object-contain"
              src={onYesClick ? "/gifs/yes.gif" : determineGIF(phraseIndex)}
              priority
              alt="gif"
              width={500}
              height={500}
            />
          )}
        </div>
      </div>
      <div className="mb-1 mt-2 text-4xl">
        <AnimatePresence mode="wait">
          <motion.p
            key={phraseIndex}
            className="type mx-auto max-w-[400px] text-center"
            style={
              {
                "--n": `${phrases[phraseIndex].length}`,
              } as React.CSSProperties
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {onYesClick ? "HOORAY!!!" : phrases[phraseIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {phraseIndex < phrases.length - 1 ? (
        <Button
          className="mt-1 hover:scale-100"
          onClick={() => setPhraseIndex((phraseIndex + 1) % phrases.length)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="h-6 w-6"
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
          <Button
            onClick={() => {
              setOnYesClick(true);
              reward();
            }}
            className="rounded-lg border-pink-dark px-6 py-[6px] text-4xl text-pink-dark hover:scale-100 hover:bg-pink-dark"
          >
            {onYesClick ? "click me..." : "yes"}
          </Button>

          <div
            onClick={moveToRandomPosition}
            onMouseOver={moveToRandomPosition}
            className={cn(
              "relative transition-all",
              onYesClick ? "hidden" : "visible",
            )}
            ref={noRef}
          >
            <Button className="rounded-lg border-pink-light px-6 py-[6px] text-4xl text-pink-light hover:scale-100 hover:bg-pink-light">
              no
            </Button>
          </div>
        </div>
      )}

      <span
        className="fixed -top-[10rem] left-1/2 -translate-x-1/2 transform"
        id="rewardId"
      />
    </div>
  );
}
