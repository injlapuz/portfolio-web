"use client";
import PortfolioCard from "@/components/portfolio-card/base-card";
import { useState, useEffect } from "react";

export default function Home() {
  const [welcomeDisplayed, setWelcomeDisplayed] = useState("");
  const [nameDisplayed, setNameDisplayed] = useState("");
  const [welcomeCursor, setWelcomeCursor] = useState(true);
  const [subtitleCursor, setSubtitleCursor] = useState(true);
  const [showCard, setShowCard] = useState(false);

  // Sequential: Welcome! types → bottom text types → card appears
  useEffect(() => {
    const welcomeText = "Welcome!";
    const bottomText = "So you want to learn more about me, huh?";  // Change this text freely
    let i = 0;

    const welcomeInterval = setInterval(() => {
      if (i <= welcomeText.length) {
        setWelcomeDisplayed(welcomeText.slice(0, i));
        i++;
      } else {
        clearInterval(welcomeInterval);
        setWelcomeCursor(false);
        setTimeout(() => {
          let j = 0;
          const bottomInterval = setInterval(() => {
            if (j <= bottomText.length) {
              setNameDisplayed(bottomText.slice(0, j));
              j++;
            } else {
              clearInterval(bottomInterval);
              setTimeout(() => setShowCard(true), 2000);
            }
          }, 80);
        }, 600);
      }
    }, 120);

    return () => clearInterval(welcomeInterval);
  }, []);

  // Blinking cursor for welcome (stays on during welcome phase)
  useEffect(() => {
    const blink = setInterval(() => setWelcomeCursor((c) => !c), 530);
    return () => clearInterval(blink);
  }, []);

  // Blinking cursor for subtitle (starts when subtitle begins)
  useEffect(() => {
    if (nameDisplayed.length > 0 && !showCard) {
      const blink = setInterval(() => setSubtitleCursor((c) => !c), 530);
      return () => clearInterval(blink);
    }
  }, [nameDisplayed, showCard]);

  return (
    <div className="h-screen overflow-hidden bg-[#080b12] font-mono">
      <main className="h-full flex items-center justify-center p-4">
        {/* Welcome screen */}
        {!showCard && (
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter">
              <span>{welcomeDisplayed}</span>
              {nameDisplayed.length === 0 && (
                <span
                  className={`inline-block w-3 h-12 md:h-16 lg:h-20 bg-emerald-400 ml-1 align-middle transition-opacity ${welcomeCursor ? "opacity-100" : "opacity-0"}`}
                />
              )}
            </h1>
            <p className="text-[#6e7681] text-sm mt-4 h-6">
              <span className="text-white">{nameDisplayed}</span>
              {!showCard && nameDisplayed.length > 0 && (
                <span className={`inline-block w-2 h-4 bg-emerald-400 ml-1 align-middle transition-opacity ${subtitleCursor ? "opacity-100" : "opacity-0"}`} />
              )}
            </p>
          </div>
        )}

        {/* Portfolio card appears after welcome */}
        {showCard && <PortfolioCard />}
      </main>
    </div>
  );
}
