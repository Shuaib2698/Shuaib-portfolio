"use client";
import { useState, useEffect } from "react";

const SkillsEditor = () => {
  const [skillsData, setSkillsData] = useState({});

  useEffect(() => {
    const savedSkills = localStorage.getItem("portfolioSkills");
    if (savedSkills) {
      setSkillsData(JSON.parse(savedSkills));
    } else {
      setSkillsData({
        technicalSkills: {
          Languages: ["Python", "Java", "JavaScript", "TypeScript", "C", "C++"],
          "Web Development": [
            "HTML5", "CSS3", "React.js", "Next.js", "Node.js", "Express.js", 
            "Tailwind CSS", "Bootstrap"
          ],
          Databases: ["MySQL", "PostgreSQL", "MongoDB"],
          "Tools & Libraries": [
            "Git", "GitHub", "VS Code", "Postman", "pandas", "NumPy", "Matplotlib"
          ]
        },
        professionalSkills: [
          { name: "Full Stack Python Development", level: 80 },
          { name: "MERN Stack", level: 85 },
          { name: "Frontend Development", level: 70 },
          { name: "Backend Development", level: 85 }
        ],
        softSkills: [
          { name: "Problem Solving", level: 90 },
          { name: "Teamwork", level: 85 },
          { name: "Communication", level: 80 },
          { name: "Creativity", level: 95 }
        ]
      });
    }
  }, []);

  const handleAddCategory = () => {
    const categoryName = prompt("Enter category name:");
    if (categoryName && !skillsData.technicalSkills[categoryName]) {
      setSkillsData({
        ...skillsData,
        technicalSkills: {
          ...skillsData.technicalSkills,
          [categoryName]: []
        }
      });
    }
  };

  const handleAddSkill = (category) => {
    const skillName = prompt("Enter skill name:");
    if (skillName) {
      setSkillsData({
        ...skillsData,
        technicalSkills: {
          ...skillsData.technicalSkills,
          [category]: [...skillsData.technicalSkills[category], skillName]
        }
      });
    }
  };

  const handleRemoveSkill = (category, index) => {
    const updatedSkills = [...skillsData.technicalSkills[category]];
    updatedSkills.splice(index, 1);
    setSkillsData({
      ...skillsData,
      technicalSkills: {
        ...skillsData.technicalSkills,
        [category]: updatedSkills
      }
    });
  };

  const handleProfessionalSkillChange = (index, field, value) => {
    const updatedSkills = [...skillsData.professionalSkills];
    updatedSkills[index][field] = field === "level" ? parseInt(value) : value;
    setSkillsData({
      ...skillsData,
      professionalSkills: updatedSkills
    });
  };

  const handleSoftSkillChange = (index, field, value) => {
    const updatedSkills = [...skillsData.softSkills];
    updatedSkills[index][field] = field === "level" ? parseInt(value) : value;
    setSkillsData({
      ...skillsData,
      softSkills: updatedSkills
    });
  };

  const handleAddProfessionalSkill = () => {
    setSkillsData({
      ...skillsData,
      professionalSkills: [
        ...skillsData.professionalSkills,
        { name: "", level: 50 }
      ]
    });
  };

  const handleAddSoftSkill = () => {
    setSkillsData({
      ...skillsData,
      softSkills: [
        ...skillsData.softSkills,
        { name: "", level: 50 }
      ]
    });
  };

  const handleRemoveProfessionalSkill = (index) => {
    const updatedSkills = [...skillsData.professionalSkills];
    updatedSkills.splice(index, 1);
    setSkillsData({
      ...skillsData,
      professionalSkills: updatedSkills
    });
  };

  const handleRemoveSoftSkill = (index) => {
    const updatedSkills = [...skillsData.softSkills];
    updatedSkills.splice(index, 1);
    setSkillsData({
      ...skillsData,
      softSkills: updatedSkills
    });
  };

  const handleRemoveCategory = (category) => {
    const updatedTechnicalSkills = { ...skillsData.technicalSkills };
    delete updatedTechnicalSkills[category];
    setSkillsData({
      ...skillsData,
      technicalSkills: updatedTechnicalSkills
    });
  };

  const saveChanges = () => {
    localStorage.setItem("portfolioSkills", JSON.stringify(skillsData));
    alert("Skills saved successfully!");
  };

  return (
    <div className="section-box p-6">
      <h2 className="text-2xl font-bold mb-6 text-[rgb(var(--primary-color))]">Edit Skills</h2>
      
      {/* Technical Skills */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Technical Skills</h3>
          <button
            onClick={handleAddCategory}
            className="px-3 py-1 bg-[rgb(var(--primary-color))] text-black rounded-md text-sm"
          >
            Add Category
          </button>
        </div>
        
        {Object.entries(skillsData.technicalSkills || {}).map(([category, skills]) => (
          <div key={category} className="mb-6 p-4 border border-[#333] rounded-md">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-lg font-medium">{category}</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAddSkill(category)}
                  className="px-3 py-1 bg-[#333] rounded-md text-sm hover:bg-[#444]"
                >
                  Add Skill
                </button>
                <button
                  onClick={() => handleRemoveCategory(category)}
                  className="px-3 py-1 bg-red-600 rounded-md text-sm hover:bg-red-700"
                >
                  Remove Category
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2 bg-[#222] px-3 py-1 rounded-md">
                  <span className="text-white">{skill}</span>
                  <button
                    onClick={() => handleRemoveSkill(category, index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Professional Skills */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Professional Skills</h3>
          <button
            onClick={handleAddProfessionalSkill}
            className="px-3 py-1 bg-[rgb(var(--primary-color))] text-black rounded-md text-sm"
          >
            Add Skill
          </button>
        </div>
        
        {skillsData.professionalSkills?.map((skill, index) => (
          <div key={index} className="mb-4 p-4 border border-[#333] rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              <div className="md:col-span-2">
                <label className="block text-sm mb-1">Skill Name</label>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => handleProfessionalSkillChange(index, "name", e.target.value)}
                  className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm mb-1">Level (0-100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={skill.level}
                  onChange={(e) => handleProfessionalSkillChange(index, "level", e.target.value)}
                  className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white"
                />
              </div>
            </div>
            <button
              onClick={() => handleRemoveProfessionalSkill(index)}
              className="px-3 py-1 bg-red-600 rounded-md text-sm hover:bg-red-700"
            >
              Remove Skill
            </button>
          </div>
        ))}
      </div>
      
      {/* Soft Skills */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Soft Skills</h3>
          <button
            onClick={handleAddSoftSkill}
            className="px-3 py-1 bg-[rgb(var(--primary-color))] text-black rounded-md text-sm"
          >
            Add Skill
          </button>
        </div>
        
        {skillsData.softSkills?.map((skill, index) => (
          <div key={index} className="mb-4 p-4 border border-[#333] rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              <div className="md:col-span-2">
                <label className="block text-sm mb-1">Skill Name</label>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => handleSoftSkillChange(index, "name", e.target.value)}
                  className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm mb-1">Level (0-100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={skill.level}
                  onChange={(e) => handleSoftSkillChange(index, "level", e.target.value)}
                  className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white"
                />
              </div>
            </div>
            <button
              onClick={() => handleRemoveSoftSkill(index)}
              className="px-3 py-1 bg-red-600 rounded-md text-sm hover:bg-red-700"
            >
              Remove Skill
            </button>
          </div>
        ))}
      </div>
      
      <div className="flex gap-4 mt-6">
        <button
          onClick={saveChanges}
          className="px-6 py-2 bg-green-600 rounded-md hover:bg-green-700 font-semibold"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SkillsEditor;