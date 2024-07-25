// import React from "react";
// import Contact from "@/components/Contact";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Support Page - Solid SaaS Boilerplate",
//   description: "This is Support page for Solid Pro",
//   // other metadata
// };

// const SupportPage = () => {
//   return (
//     <div className="pb-20 pt-40">
//       <Contact />
//     </div>
//   );
// };

// export default SupportPage;
"use client"
import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

interface DietItem {
  food: string;
  servingSize: string;
}
const Diet = () => {
  const [formData, setFormData] = useState({
    age: 25,
    gender: "male",
    activityLevel: "moderately-active",
    weight: 150,
    height: 68,
    goal: "lose-weight",
    allergies: "",
    likedFood: "chicken,rice,broccoli",
    dislikedFood: "fish,eggs,mushrooms",
  });
  const [dietPlan, setDietPlan] = useState("");

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
const MODEL_NAME = "gemini-pro";
const API_KEY = "AIzaSyDcYKeMNWinAMk4GHGaN-WuhLsDMltRHds";

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const generationConfig = {
      temperature: 0.1,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };
    // const prompt = `Generate a personalized diet plan for a ${formData.age} year old ${formData.gender}. ` +
    //   `Their activity level is ${formData.activityLevel}, weight is ${formData.weight} lbs, and height is ${formData.height} inches. ` +
    //   `Their goal is to ${formData.goal}. ` +
    //   `They are allergic to ${formData.allergies}. ` +
    //   `They like ${formData.likedFood} and dislike ${formData.dislikedFood}. ` +
    //   Include a variety of foods and serving sizes.;
    const parts = [
      { text:  `Generate a personalized diet plan for a ${formData.age} year old ${formData.gender}. ` +
      `Their activity level is ${formData.activityLevel}, weight is ${formData.weight} lbs, and height is ${formData.height} inches. ` +
      `Their goal is to ${formData.goal}. ` +
      `They are allergic to ${formData.allergies}. ` +
      `They like ${formData.likedFood} and dislike ${formData.dislikedFood}. ` +
      `Include a variety of foods and serving sizes. ` },
    ];

     const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
     });

    // const generativelanguageModel = model.generateContent;
    // const [response] = await generativelanguageModel.arguments({
    //   initialText: prompt,
    //   numReturnValues: 1,
    // });
    const response = result.response;
    setDietPlan(response.text()); 
    // Sample response data
// const rawResponse = dietPlan;

// // Function to format the response
// const formatResponse = (rawResponse) => {
//   const sections = rawResponse.split('').filter(section => section.trim() !== '');

//   return sections.map(section => {
//     const lines = section.split('*').filter(line => line.trim() !== '');
//     const title = lines[0].trim().replace(':', '');
//     const items = lines.slice(1).map(item => item.trim());
    
//     return { title, items };
//   });
// };

// // Formatted response
// const formattedResponse = formatResponse(rawResponse);

  };

  return (
    <div className="pt-20 pb-15 md:pt-40 md:pb-30 mx-10 md:mx-20 flex flex-row gap-7">
        <div className="flex flex-col w-3/4">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <h1 className="text-3xl font-bold text-black dark:text-white ">Personalized Diet Plan</h1>
                <p>
                  Enter your personal information and we will generate a personalized diet plan
                  tailored to your needs and goals.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-wrap gap-5">
                <div className="flex flex-row items-center gap-2">
                    <label htmlFor="age" className="">Age:</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="appearance-none w-fit border border-slate-700 rounded-md py-2 px-4 text-gray-700 dark:text-white leading-tight focus:outline-none focus:border-blue-500"
                    />
                </div>
                    <div className="flex flex-row items-center gap-2">
                        <label htmlFor="gender" className=" form-label ">Gender:</label>
                        <select name="gender" value={formData.gender} className="appearance-none w-fit border border-slate-700 rounded-md py-2 px-4 text-gray-700 dark:text-white leading-tight focus:outline-none focus:border-blue-500" onChange={handleChange}>
                          <option value="male" className="">Male</option>
                          <option value="female" className="">Female</option>
                        </select>
                    </div>
                    
                    <div className="flex flex-row items-center gap-2">
                        <label htmlFor="activity-level" className="">Activity Level:</label>
                        <select
                          name="activityLevel"
                          value={formData.activityLevel}
                          onChange={handleChange}
                          className="appearance-none border border-slate-700 rounded-md py-2 px-4 text-gray-700 dark:text-white leading-tight focus:outline-none focus:border-blue-500"
                        >
                          <option value="sedentary">Sedentary</option>
                          <option value="lightly-active">Lightly Active</option>
                          <option value="moderately-active">Moderately Active</option>
                          <option value="very-active">Very Active</option>
                          <option value="extremely-active">Extremely Active</option>
                        </select>
                    </div>
            
                    <div className="flex flex-row items-center gap-2">
                        <label htmlFor="weight" className="">Weight (lbs):</label>
                        <input
                          type="number"
                          name="weight"
                          value={formData.weight}
                          onChange={handleChange}
                          className="appearance-none border border-slate-700 rounded-md py-2 px-4 text-gray-700 dark:text-white leading-tight focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    
                    <div className="flex flex-row items-center gap-2">
                        <label htmlFor="height" className="form-label">Height (inches):</label>
                        <input
                          type="number"
                          name="height"
                          value={formData.height}
                          onChange={handleChange}
                          className="appearance-none border border-slate-700 rounded-md py-2 px-4 text-gray-700 dark:text-white leading-tight focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <label htmlFor="goal" className="form-label">Goal:</label>
                        <select name="goal" value={formData.goal} onChange={handleChange} className="appearance-none border border-slate-700 rounded-md py-2 px-4 text-gray-700 dark:text-white leading-tight focus:outline-none focus:border-blue-500">
                          <option value="lose-weight">Lose Weight</option>
                          <option value="gain-weight">Gain Weight</option>
                          <option value="maintain-weight">Maintain Weight</option>
                        </select>
                    </div>
                    
                    <div className="flex flex-row items-center gap-2">
                        <label htmlFor="allergies" className="">Allergies (comma-separated):</label>
                        <input
                          type="text"
                          name="allergies"
                          value={formData.allergies}
                          onChange={handleChange}
                          className="appearance-none border border-slate-700 rounded-md py-2 px-4 text-gray-700 dark:text-white leading-tight focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <label htmlFor="liked-food" className="form-label">Liked Foods:</label>
                        <input
                          type="text"
                          name="likedFood"
                          value={formData.likedFood}
                          onChange={handleChange}
                          className="appearance-none border border-slate-700 rounded-md py-2 px-4 text-gray-700 dark:text-white leading-tight focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    
                    <div className="flex flex-row items-center gap-2">
                        <label htmlFor="disliked-food" className="">Disliked Foods:</label>
                        <input
                          type="text"
                          name="dislikedFood"
                          value={formData.dislikedFood}
                          onChange={handleChange}
                          className="appearance-none border border-slate-700 rounded-md py-2 px-4 text-gray-700 dark:text-white leading-tight focus:outline-none focus:border-blue-500"
                        />
                    </div>
                  </div>
            
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit">Generate Diet Plan</button>
              </form>
            </div>
        </div>
        <div className="bg-[#1c2136] border-slate-700 border rounded-md w-full p-3" >{dietPlan}</div>
    </div>
  );
};

export default Diet;
