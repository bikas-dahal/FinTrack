// components/Welcome.tsx
"use client";

import { quotes } from "@/lib/data";
import { useSession } from "next-auth/react";
import { useMemo, useState, useEffect } from "react";
import React from 'react';

export const Welcome = () => {
  const session = useSession();
    const [quote, setQuote] = useState("");

  const displayName =
    session?.data?.user.username || session?.data?.user.name || "User";

    const capitalizedName = displayName?.charAt(0).toUpperCase() + displayName?.slice(1);

    const timeOfDay = useMemo(() => {
      const date = new Date();
      const hours = date.getHours();
      if (hours >= 5 && hours < 12) {
        return "morning";
      } else if (hours >= 12 && hours < 17) {
        return "afternoon";
      } else if (hours >= 17 && hours < 22) {
        return "evening";
      } else {
        return "night";
      }
    }, []);

    // const greeting = useMemo(() => {
    //   switch (timeOfDay) {
    //     case "morning":
    //       return `A productive ${timeOfDay} to you, ${displayName}!`;
    //     case "afternoon":
    //       return `A successful ${timeOfDay}, ${displayName}.`;
    //     case "evening":
    //       return `We hope you had a great day, ${displayName}.`;
    //       case "night":
    //         return `Welcome back, ${displayName}.`;
    //       default:
    //           return `Welcome, ${displayName}.`
    //   }
    // }, [displayName, timeOfDay]);

  useEffect(() => {
    const getQuoteOfTheDay = () => {
      const today = new Date();
       const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
      const quoteIndex = dayOfYear % quotes.length;
      setQuote(quotes[quoteIndex]);
    };

    getQuoteOfTheDay();
  }, []);
  return (
    <div className="flex w-full flex-col justify-start mx-5 gap-4">
      <div>
        <h1 className="text-3xl font-semibold  text-gray-800 dark:text-gray-100">
          Good {timeOfDay} <span className="bg-gradient-to-r from-pink-500 to-sky-500 bg-clip-text text-transparent">{capitalizedName}</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Take control of your finances.
        </p>
      </div>
      <blockquote className="text-gray-500 italic text-sm mt-2 dark:text-gray-400">
        <p className="bg-gradient-to-r from-teal-700 to-pink-400 bg-clip-text text-transparent">"{quote}"</p>
      </blockquote>
    </div>
  );
};