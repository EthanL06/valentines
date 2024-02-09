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
      // Change the volume to 1
      audio.volume = 1;
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
        "rounded-full border-[3px] border-pink-light bg-white p-3 text-pink-light transition-all hover:scale-110 hover:border-white hover:bg-pink-light hover:text-white active:scale-90",
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
