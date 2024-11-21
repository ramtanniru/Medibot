"use client";
import React, { useState } from "react";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

const MODEL_NAME = "gemini-pro";
const API_KEY = "AIzaSyDcYKeMNWinAMk4GHGaN-WuhLsDMltRHds";

const symptoms = [
  "Headache",
  "Fever",
  "Cough",
  "Sore throat",
  "Runny nose",
  "Nausea",
  "Vomiting",
  "Diarrhea",
  "Abdominal pain",
  "Muscle aches",
  "Joint pain",
  "Fatigue",
  "Rash",
  "Itching",
  "Swelling",
  "Redness",
  "Pain",
  "Difficulty breathing",
  "Chest pain",
  "Confusion",
  "Seizures",
  "Loss of consciousness",
];

const SymptomsPage = () => {
  const [result, setResult] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const generateContent = async () => {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.1,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const parts = [
      {
        text: `I am having the following symptoms: ${selectedSymptoms.join(", ")}. What disease might I have? `,
      },
    ];

    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
      });

      setResult(result.response.text());
    } catch (error) {
      console.error("Error generating content:", error);
      setResult("An error occurred while generating content. Please try again.");
    }
  };

  const toggleSymptom = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  return (
    <div className="p-25 pb-15 mx-5 md:mx-20 md:pt-40 md:pb-30 flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold text-black dark:text-white">Symptom Analyser</h1>
        <p>
          Select your symptoms and generate possible disease predictions. Please note that this is for
          informational purposes only and not a substitute for professional medical advice.
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <ul className="flex flex-wrap justify-start gap-5">
          {symptoms.map((symptom) => (
            <li key={symptom} className="flex flex-row items-center gap-2">
              <input
                type="checkbox"
                id={symptom}
                onChange={() => toggleSymptom(symptom)}
              />
              <label htmlFor={symptom}>{symptom}</label>
            </li>
          ))}
        </ul>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit"
          onClick={generateContent}
        >
          Generate Content
        </button>
      </div>
      <div className="dark:bg-[#1c2136] dark:border-slate-700 border rounded-md h-fit p-3 dark:text-white">
        <ReactMarkdown>{result}</ReactMarkdown>
      </div>
    </div>
  );
};

export default SymptomsPage;
