"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import GenerateFormInput from "./GenerateFormInput";

type SuggestionText = {
  label: string;
  text: string;
};

const suggestionBtnText: SuggestionText[] = [
  { label: "Job Application", text: "Develop a job application form." },
  { label: "Registration Form", text: "Create a course registration form." },
  { label: "Feedback Form", text: "Gather valuable client feedback." },
  { label: "Survey Form", text: "Develop a detailed survey form." },
  { label: "Contact Form", text: "Build a simple contact form." },
  { label: "Booking Form", text: "Design a booking form for scheduling." },
];

const HeroSection = () => {
  const [text, setText] = useState<string>("");
  return (
    <section className="px-4 md:px-8 lg:px-16">
      <div className="relative text-center">
        {/* Glow effect  */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-2xl opacity-50 -z-10"></div>

        <div className="container mx-auto relative">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Build AI-Driven Forms Effortlessly
          </h1>
          <p className="mt-4 text-base md:text-lg lg:text-xl">
            Leverage the power of AI to create responsive and dynamic forms in minutes
          </p>
        </div>
      </div>
      {/* create input field  */}
      <GenerateFormInput text={text} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
        {suggestionBtnText.map((item: SuggestionText, index: number) => (
          <Button onClick={()=> setText(item.text)} key={index} className="rounded-full h-10 text-sm md:text-base" variant={"outline"}>
            {item.label}
          </Button>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;