"use client"

import React, { useState } from "react";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

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

const symptomsPage = () => {
  const [result, setResult] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const generateContent = async () => {
    console.log();
    
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
      { text: `I am having the following symptoms: ${selectedSymptoms.join(", ")}. What disease might I have? `},
    ];

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });
    
    type DiseaseDescription = {
      diseaseName: string;
      diseaseDescription: string;
    };
    
    function parseDiseaseDescriptions(text: string): DiseaseDescription[] {
      // Split the text into individual disease descriptions using asterisks (*)
      const descriptions = text.split('*');
    
      // Clean up any empty elements or leading/trailing spaces
      const cleanedDescriptions = descriptions.map((desc) => desc.trim());
    
      // Create an empty array to store the formatted objects
      const formattedData: DiseaseDescription[] = [];
    
      // Loop through each cleaned description
      for (const desc of cleanedDescriptions) {
        // Split the description into two parts: disease name and description
        const parts = desc.split(':', 2);
    
        // Ensure we have both parts (disease name and description)
        if (parts.length !== 2) {
          console.warn(`Invalid format for description: ${desc}`);
          continue;
        }
    
        // Extract disease name and description (remove leading/trailing spaces)
        const diseaseName = parts[0].trim();
        const diseaseDescription = parts[1].trim();
    
        // Push the formatted object to the array
        formattedData.push({
          diseaseName,
          diseaseDescription,
        });
      }
    
      return formattedData;
    }
    
    // Example usage
    const diseaseString = `* **Common cold:** This is the most likely diagnosis, especially if your symptoms are mild and have lasted for less than a week. * **Flu:** This is a more severe respiratory illness that can cause fever, chills, muscle aches, and fatigue in addition to the symptoms of a cold. * **Sinusitis:** This is an inflammation of the sinuses, which are the air-filled cavities in your skull. Symptoms can include facial pain and pressure, nasal congestion, and a runny nose.`;
    
    const formattedData = parseDiseaseDescriptions(diseaseString);
    console.log(formattedData);
    const response = result.response;
    const arr = parseDiseaseDescriptions(response.text());
    setResult(response.text());
  };

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  return (
    <div className="p-25 pb-15 mx-5 md:mx-20 md:pt-40 md:pb-30 flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold text-black dark:text-white ">Symptom analyser</h1>
        <p className=""> Lorem, ipsum dolor sit amet consectetur adipisicing elit.
         Quidem officia suscipit cupiditate est sint illum veniam magni 
         enim tempora nisi odio deserunt, labore corrupti quae praesentium, cumque
          repellat expedita iste. </p>
      </div>
      <div className="flex flex-col gap-5">
        <ul className="flex flex-wrap justify-start gap-5">
        {symptoms.map((symptom) => (
              <li key={symptom} className="flex flex-row items-center gap-2">
                <input type="checkbox" className="" id={symptom} onChange={() => toggleSymptom(symptom)} />
                <label className="" htmlFor={symptom}>{symptom}</label>
              </li>
        ))}
        </ul>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit" onClick={generateContent}>Generate content</button>
      </div>
      <div className="bg-[#1c2136] border-slate-700 border rounded-md h-30 h-fit p-3">
        {result}
      </div>
    </div>
  );
};

export default symptomsPage;
