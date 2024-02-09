import { cn } from "@/utils/cn";
import React, { useEffect, useRef } from "react";

// Get default html button props

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const Button = ({ children, className, onClick }: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    const audio = audioRef.current as HTMLAudioElement;

    const playAudio = () => {
      audio.play();
    };

    audio.addEventListener("canplay", playAudio);

    // Cleanup function
    return () => {
      audio.removeEventListener("canplay", playAudio);
    };
  }, []);

  return (
    <button
      className={cn(
        "text-pink-light border-[3px] border-pink-light p-3 rounded-full bg-white hover:bg-pink-light hover:text-white transition-all hover:border-white hover:scale-110 active:scale-90",
        className,
      )}
      onClick={() => {
        audioRef.current?.play();
        onClick?.();
      }}
    >
      <audio ref={audioRef} src="/music/click.mp3" />
      {children}
    </button>
  );
};

export default Button;
