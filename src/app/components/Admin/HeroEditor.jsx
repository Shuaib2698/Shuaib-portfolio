"use client";
import { useState, useEffect } from "react";

const HeroEditor = () => {
  const [heroData, setHeroData] = useState({});

  useEffect(() => {
    const savedHero = localStorage.getItem("portfolioHero");
    if (savedHero) {
      setHeroData(JSON.parse(savedHero));
    } else {
      setHeroData({
        name: "Shaik Shuaib Ahmed",
        titles: ["Full Stack Developer", "Python Developer", "MERN Stack Developer"],
        description: "Full-Stack Developer with 1 year of professional experience in Python (Django) and MERN stack development. Skilled in building scalable web applications, optimizing system performance, and collaborating in team-based projects. Seeking to leverage technical expertise and hands-on project experience to contribute to impactful software solutions.",
        resumeUrl: "/Shuaib_Ahmed_resume.pdf",
        socialLinks: {
          github: "https://github.com/Shuaib2698",
          linkedin: "https://www.linkedin.com/in/shaik-shuaib-ahmed-b01459128",
          instagram: "https://www.instagram.com/shuaib9845",
          facebook: "https://www.facebook.com/profile.php?id=100007007058045"
        }
      });
    }
  }, []);

  const handleChange = (field, value) => {
    setHeroData({
      ...heroData,
      [field]: value
    });
  };

  const handleTitleChange = (index, value) => {
    const updatedTitles = [...heroData.titles];
    updatedTitles[index] = value;
    setHeroData({
      ...heroData,
      titles: updatedTitles
    });
  };

  const handleSocialLinkChange = (platform, value) => {
    setHeroData({
      ...heroData,
      socialLinks: {
        ...heroData.socialLinks,
        [platform]: value
      }
    });
  };

  const addTitle = () => {
    setHeroData({
      ...heroData,
      titles: [...heroData.titles, ""]
    });
  };

  const removeTitle = (index) => {
    const updatedTitles = [...heroData.titles];
    updatedTitles.splice(index, 1);
    setHeroData({
      ...heroData,
      titles: updatedTitles
    });
  };

  const saveChanges = () => {
    localStorage.setItem("portfolioHero", JSON.stringify(heroData));
    alert("Hero section saved successfully!");
  };

  return (
    <div className="section-box p-6">
      <h2 className="text-2xl font-bold mb-6 text-[rgb(var(--primary-color))]">Edit Hero Section</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm mb-2 font-medium">Name</label>
          <input
            type="text"
            value={heroData.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm mb-2 font-medium">Resume URL</label>
          <input
            type="text"
            value={heroData.resumeUrl || ""}
            onChange={(e) => handleChange("resumeUrl", e.target.value)}
            className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm mb-2 font-medium">Description</label>
        <textarea
          value={heroData.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white"
          rows="4"
        />
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Titles</h3>
          <button
            onClick={addTitle}
            className="px-3 py-1 bg-[rgb(var(--primary-color))] text-black rounded-md text-sm"
          >
            Add Title
          </button>
        </div>
        
        {heroData.titles?.map((title, index) => (
          <div key={index} className="flex gap-2 mb-3">
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(index, e.target.value)}
              className="flex-1 px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white"
            />
            <button
              onClick={() => removeTitle(index)}
              className="px-3 py-2 bg-red-600 rounded-md hover:bg-red-700"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Social Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2 font-medium">GitHub</label>
            <input
              type="text"
              value={heroData.socialLinks?.github || ""}
              onChange={(e) => handleSocialLinkChange("github", e.target.value)}
              className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm mb-2 font-medium">LinkedIn</label>
            <input
              type="text"
              value={heroData.socialLinks?.linkedin || ""}
              onChange={(e) => handleSocialLinkChange("linkedin", e.target.value)}
              className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm mb-2 font-medium">Instagram</label>
            <input
              type="text"
              value={heroData.socialLinks?.instagram || ""}
              onChange={(e) => handleSocialLinkChange("instagram", e.target.value)}
              className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm mb-2 font-medium">Facebook</label>
            <input
              type="text"
              value={heroData.socialLinks?.facebook || ""}
              onChange={(e) => handleSocialLinkChange("facebook", e.target.value)}
              className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white"
            />
          </div>
        </div>
      </div>
      
      <button
        onClick={saveChanges}
        className="px-6 py-3 bg-[rgb(var(--primary-color))] text-black font-semibold rounded-md hover:opacity-90 transition-opacity"
      >
        Save Changes
      </button>
    </div>
  );
};

export default HeroEditor;