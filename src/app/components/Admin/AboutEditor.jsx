"use client";
import { useState, useEffect } from "react";

const AboutEditor = () => {
  const [aboutData, setAboutData] = useState({});

  useEffect(() => {
    const savedAbout = localStorage.getItem("portfolioAbout");
    if (savedAbout) {
      setAboutData(JSON.parse(savedAbout));
    } else {
      setAboutData({
        description: "Hi, I'm Shuaib, a full-stack developer from Bangalore with a background in Computer Science Engineering. Over the past 8 months, I've worked as a Python Developer and gained 4 months of experience with the MERN stack. I enjoy building end-to-end applications and have created projects like a company management system using Next.js, as well as a job portal and a social media platform. My passion lies in crafting efficient, user-friendly solutions, and my long-term goal is to establish my own startup to bring innovative ideas to life.",
        education: [
          "R N S Institute of Technology — B.E. in Computer Science & Engineering (2021 – 2024) | CGPA: 7.20",
          "M S Polytechnic — Diploma in Computer Science (2018 – 2021) | Percentage: 80.4%"
        ],
        certifications: ["MySQL"]
      });
    }
  }, []);

  const handleChange = (field, value) => {
    setAboutData({
      ...aboutData,
      [field]: value
    });
  };

  const handleEducationChange = (index, value) => {
    const updatedEducation = [...aboutData.education];
    updatedEducation[index] = value;
    setAboutData({
      ...aboutData,
      education: updatedEducation
    });
  };

  const handleCertificationChange = (index, value) => {
    const updatedCertifications = [...aboutData.certifications];
    updatedCertifications[index] = value;
    setAboutData({
      ...aboutData,
      certifications: updatedCertifications
    });
  };

  const addEducation = () => {
    setAboutData({
      ...aboutData,
      education: ["", ...aboutData.education]
    });
  };

  const addCertification = () => {
    setAboutData({
      ...aboutData,
      certifications: ["", ...aboutData.certifications]
    });
  };

  const removeEducation = (index) => {
    const updatedEducation = [...aboutData.education];
    updatedEducation.splice(index, 1);
    setAboutData({
      ...aboutData,
      education: updatedEducation
    });
  };

  const removeCertification = (index) => {
    const updatedCertifications = [...aboutData.certifications];
    updatedCertifications.splice(index, 1);
    setAboutData({
      ...aboutData,
      certifications: updatedCertifications
    });
  };

  const saveChanges = () => {
    localStorage.setItem("portfolioAbout", JSON.stringify(aboutData));
    alert("About section saved successfully!");
  };

  return (
    <div className="section-box p-6">
      <h2 className="text-2xl font-bold mb-6 text-[rgb(var(--primary-color))]">Edit About Section</h2>
      
      <div className="mb-6">
        <label className="block text-sm mb-2 font-medium">Description</label>
        <textarea
          value={aboutData.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white"
          rows="6"
        />
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Education</h3>
          <button
            onClick={addEducation}
            className="px-3 py-1 bg-[rgb(var(--primary-color))] text-black rounded-md text-sm"
          >
            Add Education
          </button>
        </div>
        
        {aboutData.education?.map((edu, index) => (
          <div key={index} className="flex gap-2 mb-3">
            <input
              type="text"
              value={edu}
              onChange={(e) => handleEducationChange(index, e.target.value)}
              className="flex-1 px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white"
            />
            <button
              onClick={() => removeEducation(index)}
              className="px-3 py-2 bg-red-600 rounded-md hover:bg-red-700"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Certifications</h3>
          <button
            onClick={addCertification}
            className="px-3 py-1 bg-[rgb(var(--primary-color))] text-black rounded-md text-sm"
          >
            Add Certification
          </button>
        </div>
        
        {aboutData.certifications?.map((cert, index) => (
          <div key={index} className="flex gap-2 mb-3">
            <input
              type="text"
              value={cert}
              onChange={(e) => handleCertificationChange(index, e.target.value)}
              className="flex-1 px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white"
            />
            <button
              onClick={() => removeCertification(index)}
              className="px-3 py-2 bg-red-600 rounded-md hover:bg-red-700"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      
      <div className="flex gap-4 mt-6">
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

export default AboutEditor;