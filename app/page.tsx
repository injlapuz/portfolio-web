"use client";
import PortfolioCard from "@/components/portfolio-card/base-card";
import { useState, useEffect } from "react";

export default function Home() {
  const [welcomeDisplayed, setWelcomeDisplayed] = useState("");
  const [welcomeCursor, setWelcomeCursor] = useState(true);
  const [showCard, setShowCard] = useState(false);

  // Type "Welcome!"
  useEffect(() => {
    const text = "Welcome!";
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setWelcomeDisplayed(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        // After typing finishes, show card
        setTimeout(() => setShowCard(true), 400);
      }
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // Blinking cursor for welcome
  useEffect(() => {
    const blink = setInterval(() => setWelcomeCursor((c) => !c), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-[#080b12] font-mono">
      <main className="h-full flex items-center justify-center p-4">
        {/* Welcome screen */}
        {!showCard && (
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter">
              <span>{welcomeDisplayed}</span>
              <span
                className={`inline-block w-3 h-12 md:h-16 lg:h-20 bg-emerald-400 ml-1 align-middle transition-opacity ${welcomeCursor ? "opacity-100" : "opacity-0"}`}
              />
            </h1>
            <p className="text-[#6e7681] text-sm mt-4">Ian Nathaniel Lapuz</p>
          </div>
        )}

        {/* Portfolio card appears after welcome */}
        {showCard && <PortfolioCard />}
      </main>
    </div>
  );
}
