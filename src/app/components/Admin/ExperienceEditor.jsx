"use client";
import { useState, useEffect } from "react";

const ExperienceEditor = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const savedExperiences = localStorage.getItem("portfolioExperiences");
    if (savedExperiences) {
      setExperiences(JSON.parse(savedExperiences));
    } else {
      setExperiences([
        {
          date: "May 2025 – Present",
          role: "Software Developer",
          company: "Aviationskybiz Private Limited / SKYBIZ GLOBAL, Bangalore",
          details: [
            "Developed Company Management System using MERN stack",
            "Enhanced attendance with manual punch-in/out limits and leave tracking",
            "Implemented shift management and fixed timescale issues",
            "Improved both backend (Node/Express/MongoDB) and frontend (React/Tailwind CSS)",
          ],
        },
        {
          date: "Aug 2024 – Feb 2025",
          role: "Python Developer",
          company: "X-Ceincia Tech Ind Put Ltd, Bangalore",
          details: [
            "Built an online job portal with email notifications and job applications",
            "Fixed issues in Skills and Hiring Industry fields",
            "Improved employer dashboards and admin management",
            "Developed RBAC system using Django and React with JWT authentication",
          ],
        },
        {
          date: "Aug 2023 – Sep 2023",
          role: "Intern",
          company: "Varcon Technologies, Bangalore",
          details: [
            "Worked on E-Commerce Fashion Store Site template",
            "Designed functional web pages and database systems",
            "Implemented design briefs and client specifications",
          ],
        },
        {
          date: "Oct 2014 – Oct 2017",
          role: "Apprenticeship - Turner Trade",
          company: "Bosch Vocational Centre, Bangalore",
          details: [
            "Completed apprenticeship training in Turner Trade at Bosch Vocational Centre",
            "Worked in plant operations, gaining hands-on industry exposure",
            "Secured 73.45% marks in All India Apprenticeship Exam",
          ],
        },
      ]);
    }
  }, []);

  const handleAddExperience = () => {
    setExperiences([
      {
        date: "",
        role: "",
        company: "",
        details: [""],
      },
      ...experiences,
    ]);
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index][field] = value;
    setExperiences(updatedExperiences);
  };

  const handleDetailChange = (expIndex, detailIndex, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[expIndex].details[detailIndex] = value;
    setExperiences(updatedExperiences);
  };

  const addDetail = (expIndex) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[expIndex].details.push("");
    setExperiences(updatedExperiences);
  };

  const removeDetail = (expIndex, detailIndex) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[expIndex].details.splice(detailIndex, 1);
    setExperiences(updatedExperiences);
  };

  const removeExperience = (index) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    setExperiences(updatedExperiences);
  };

  const saveChanges = () => {
    localStorage.setItem("portfolioExperiences", JSON.stringify(experiences));
    alert("Experiences saved successfully!");
  };

  return (
    <div className="section-box p-6">
      <h2 className="text-2xl font-bold mb-6 text-[rgb(var(--primary-color))]">Edit Experiences</h2>
      
      {experiences.map((exp, expIndex) => (
        <div key={expIndex} className="mb-8 p-4 border border-[#333] rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Experience #{expIndex + 1}</h3>
            <button
              onClick={() => removeExperience(expIndex)}
              className="px-3 py-1 bg-red-600 rounded-md text-sm hover:bg-red-700"
            >
              Remove
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-1">Date</label>
              <input
                type="text"
                value={exp.date}
                onChange={(e) => handleExperienceChange(expIndex, "date", e.target.value)}
                className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm mb-1">Role</label>
              <input
                type="text"
                value={exp.role}
                onChange={(e) => handleExperienceChange(expIndex, "role", e.target.value)}
                className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm mb-1">Company</label>
            <input
              type="text"
              value={exp.company}
              onChange={(e) => handleExperienceChange(expIndex, "company", e.target.value)}
              className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm mb-1">Details</label>
            {exp.details.map((detail, detailIndex) => (
              <div key={detailIndex} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={detail}
                  onChange={(e) => handleDetailChange(expIndex, detailIndex, e.target.value)}
                  className="flex-1 px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white"
                />
                <button
                  onClick={() => removeDetail(expIndex, detailIndex)}
                  className="px-3 py-2 bg-red-600 rounded-md hover:bg-red-700"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={() => addDetail(expIndex)}
              className="mt-2 px-4 py-2 bg-[#333] rounded-md hover:bg-[#444]"
            >
              Add Detail
            </button>
          </div>
        </div>
      ))}
      
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleAddExperience}
          className="px-4 py-2 bg-[rgb(var(--primary-color))] text-black rounded-md hover:opacity-90"
        >
          Add New Experience
        </button>
        
        <button
          onClick={saveChanges}
          className="px-4 py-2 bg-green-600 rounded-md hover:bg-green-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ExperienceEditor;