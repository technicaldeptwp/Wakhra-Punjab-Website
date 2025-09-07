import { useState, useEffect } from "react";

export default function Typewriter({ text, speed = 100 }) {
  const [displayedText, setDisplayedText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 1;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className="tagline">
      {displayedText}
      {!done && (
        <span className="border-r-2 border-brand-gold pr-1 animate-pulse" />
      )}
    </span>
  );
}
