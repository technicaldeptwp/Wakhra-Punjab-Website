import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Countdown.css";

export default function Countdown({ targetDate, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = Math.max(0, Math.floor((targetDate - new Date()) / 1000));
    return diff;
  });

  const prevTime = useRef(timeLeft);

  // Refs for each digit (Days + Hours + Minutes + Seconds)
  const days1Ref = useRef(null);
  const days2Ref = useRef(null);
  const hours1Ref = useRef(null);
  const hours2Ref = useRef(null);
  const minutes1Ref = useRef(null);
  const minutes2Ref = useRef(null);
  const seconds1Ref = useRef(null);
  const seconds2Ref = useRef(null);

  // Flip animation
  const animateFigure = (el, value) => {
    if (!el) return;
    const top = el.querySelector(".top");
    const bottom = el.querySelector(".bottom");
    const topBack = el.querySelector(".top-back");
    const bottomBack = el.querySelector(".bottom-back");

    if (!top || !bottom || !topBack || !bottomBack) return;

    topBack.querySelector("span").textContent = value;
    bottomBack.querySelector("span").textContent = value;

    gsap.to(top, {
      duration: 0.8,
      rotationX: -180,
      transformPerspective: 300,
      ease: "quart.out",
      onComplete: () => {
        top.textContent = value;
        bottom.textContent = value;
        gsap.set(top, { rotationX: 0 });
      },
    });

    gsap.to(topBack, {
      duration: 0.8,
      rotationX: 0,
      transformPerspective: 300,
      ease: "quart.out",
      clearProps: "all",
    });
  };

  // Animate 2-digit numbers
  const animateDigits = (firstRef, secondRef, value) => {
    const strVal = value.toString().padStart(2, "0");
    const firstDigit = strVal.charAt(0);
    const secondDigit = strVal.charAt(1);

    if (firstRef.current?.querySelector(".top").textContent !== firstDigit) {
      animateFigure(firstRef.current, firstDigit);
    }
    if (secondRef.current?.querySelector(".top").textContent !== secondDigit) {
      animateFigure(secondRef.current, secondDigit);
    }
  };

  // Timer tick
  useEffect(() => {
    if (timeLeft === 0) {
      onComplete && onComplete();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          onComplete && onComplete();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onComplete]);

  // Animate flips
  useEffect(() => {
    const days = Math.floor(timeLeft / 86400);
    const hours = Math.floor((timeLeft % 86400) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    if (prevTime.current !== timeLeft) {
      animateDigits(days1Ref, days2Ref, days);
      animateDigits(hours1Ref, hours2Ref, hours);
      animateDigits(minutes1Ref, minutes2Ref, minutes);
      animateDigits(seconds1Ref, seconds2Ref, seconds);
      prevTime.current = timeLeft;
    }
  }, [timeLeft]);

  // Initial render digits
  useEffect(() => {
    const days = Math.floor(timeLeft / 86400);
    const hours = Math.floor((timeLeft % 86400) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    const setDigit = (ref, digit) => {
      if (!ref.current) return;
      const top = ref.current.querySelector(".top");
      const bottom = ref.current.querySelector(".bottom");
      if (top && bottom) {
        top.textContent = digit;
        bottom.textContent = digit;
      }
    };

    setDigit(days1Ref, Math.floor(days / 10));
    setDigit(days2Ref, days % 10);
    setDigit(hours1Ref, Math.floor(hours / 10));
    setDigit(hours2Ref, hours % 10);
    setDigit(minutes1Ref, Math.floor(minutes / 10));
    setDigit(minutes2Ref, minutes % 10);
    setDigit(seconds1Ref, Math.floor(seconds / 10));
    setDigit(seconds2Ref, seconds % 10);
  }, [timeLeft]);

  return (
    <div className="countdown">
      {/* Days */}
      <div className="bloc-time days">
        
        <div className="figure days days-1 asm" ref={days1Ref}>
          <span className="top">0</span>
          <span className="top-back"><span>0</span></span>
          <span className="bottom">0</span>
          <span className="bottom-back"><span>0</span></span>
        </div>
        <div className="figure days days-2 asm" ref={days2Ref}>
          <span className="top">0</span>
          <span className="top-back"><span>0</span></span>
          <span className="bottom">0</span>
          <span className="bottom-back"><span>0</span></span>
        </div>
        <span className="count-title">Days</span>
      </div>

      {/* Hours */}
      <div className="bloc-time hours">
        
        <div className="figure hours hours-1 asm" ref={hours1Ref}>
          <span className="top">0</span>
          <span className="top-back"><span>0</span></span>
          <span className="bottom">0</span>
          <span className="bottom-back"><span>0</span></span>
        </div>
        <div className="figure hours hours-2 asm" ref={hours2Ref}>
          <span className="top">0</span>
          <span className="top-back"><span>0</span></span>
          <span className="bottom">0</span>
          <span className="bottom-back"><span>0</span></span>
        </div>
        <span className="count-title">Hours</span>
      </div>

      {/* Minutes */}
      <div className="bloc-time min">
        
        <div className="figure min min-1 asm" ref={minutes1Ref}>
          <span className="top">0</span>
          <span className="top-back"><span>0</span></span>
          <span className="bottom">0</span>
          <span className="bottom-back"><span>0</span></span>
        </div>
        <div className="figure min min-2 asm" ref={minutes2Ref}>
          <span className="top">0</span>
          <span className="top-back"><span>0</span></span>
          <span className="bottom">0</span>
          <span className="bottom-back"><span>0</span></span>
        </div>
        <span className="count-title">Minutes</span>
      </div>

      {/* Seconds */}
      <div className="bloc-time sec">
        <div className="figure sec sec-1 asm" ref={seconds1Ref}>
          <span className="top">0</span>
          <span className="top-back"><span>0</span></span>
          <span className="bottom">0</span>
          <span className="bottom-back"><span>0</span></span>
        </div>
        <div className="figure sec sec-2 asm" ref={seconds2Ref}>
          <span className="top">0</span>
          <span className="top-back"><span>0</span></span>
          <span className="bottom">0</span>
          <span className="bottom-back"><span>0</span></span>
        </div>
        <span className="count-title">Seconds</span>
      </div>
    </div>
  );
}
