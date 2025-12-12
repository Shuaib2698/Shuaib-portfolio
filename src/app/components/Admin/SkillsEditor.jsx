"use client";
import { useState, useEffect } from "react";
import { FiPlus, FiTrash2, FiEdit2, FiX } from "react-icons/fi";

const SkillsEditor = () => {
  const [skillsData, setSkillsData] = useState({});
  const [newSkillInput, setNewSkillInput] = useState("");
  const [newCategoryInput, setNewCategoryInput] = useState("");
  const [editingSkill, setEditingSkill] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

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

  // Technical Skills Functions
  const handleAddCategory = () => {
    if (newCategoryInput.trim() === "") return;
    
    setSkillsData({
      ...skillsData,
      technicalSkills: {
        ...skillsData.technicalSkills,
        [newCategoryInput]: []
      }
    });
    setNewCategoryInput("");
  };

  const handleAddSkill = (category) => {
    if (newSkillInput.trim() === "") return;
    
    setSkillsData({
      ...skillsData,
      technicalSkills: {
        ...skillsData.technicalSkills,
        [category]: [...skillsData.technicalSkills[category], newSkillInput]
      }
    });
    setNewSkillInput("");
  };

  const handleEditSkill = (category, skillIndex, newValue) => {
    const updatedSkills = [...skillsData.technicalSkills[category]];
    updatedSkills[skillIndex] = newValue;
    
    setSkillsData({
      ...skillsData,
      technicalSkills: {
        ...skillsData.technicalSkills,
        [category]: updatedSkills
      }
    });
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

  const handleEditCategoryName = (oldCategory, newName) => {
    if (newName.trim() === "" || newName === oldCategory) return;
    
    const updatedTechnicalSkills = { ...skillsData.technicalSkills };
    updatedTechnicalSkills[newName] = updatedTechnicalSkills[oldCategory];
    delete updatedTechnicalSkills[oldCategory];
    
    setSkillsData({
      ...skillsData,
      technicalSkills: updatedTechnicalSkills
    });
    setEditingCategory(null);
  };

  const handleRemoveCategory = (category) => {
    if (window.confirm(`Are you sure you want to remove the "${category}" category?`)) {
      const updatedTechnicalSkills = { ...skillsData.technicalSkills };
      delete updatedTechnicalSkills[category];
      
      setSkillsData({
        ...skillsData,
        technicalSkills: updatedTechnicalSkills
      });
    }
  };

  // Professional Skills Functions
  const handleAddProfessionalSkill = () => {
    setSkillsData({
      ...skillsData,
      professionalSkills: [
        ...skillsData.professionalSkills,
        { name: "", level: 50 }
      ]
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

  const handleRemoveProfessionalSkill = (index) => {
    const updatedSkills = [...skillsData.professionalSkills];
    updatedSkills.splice(index, 1);
    setSkillsData({
      ...skillsData,
      professionalSkills: updatedSkills
    });
  };

  // Soft Skills Functions (similar to professional skills)
  const handleAddSoftSkill = () => {
    setSkillsData({
      ...skillsData,
      softSkills: [
        ...skillsData.softSkills,
        { name: "", level: 50 }
      ]
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

  const handleRemoveSoftSkill = (index) => {
    const updatedSkills = [...skillsData.softSkills];
    updatedSkills.splice(index, 1);
    setSkillsData({
      ...skillsData,
      softSkills: updatedSkills
    });
  };

  const saveChanges = () => {
    localStorage.setItem("portfolioSkills", JSON.stringify(skillsData));
    alert("Skills saved successfully!");
  };

  return (
    <div className="section-box p-6">
      <h2 className="text-2xl font-bold mb-6 text-[rgb(var(--primary-color))]">Edit Skills</h2>
      
      {/* Add New Category */}
      <div className="mb-8 p-4 border border-[#333] rounded-md bg-[#0a0a0a]">
        <h3 className="text-lg font-semibold mb-3 text-white">Add New Category</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={newCategoryInput}
            onChange={(e) => setNewCategoryInput(e.target.value)}
            placeholder="Enter category name"
            className="flex-1 px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white"
          />
          <button
            onClick={handleAddCategory}
            className="px-4 py-2 bg-[rgb(var(--primary-color))] text-black rounded-md hover:opacity-90 flex items-center gap-2"
          >
            <FiPlus /> Add Category
          </button>
        </div>
      </div>
      
      {/* Technical Skills */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
        
        {Object.entries(skillsData.technicalSkills || {}).map(([category, skills]) => (
          <div key={category} className="mb-6 p-4 border border-[#333] rounded-md bg-[#0a0a0a]">
            {/* Category Header */}
            <div className="flex justify-between items-center mb-4">
              {editingCategory === category ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    defaultValue={category}
                    onBlur={(e) => handleEditCategoryName(category, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleEditCategoryName(category, e.target.value);
                      }
                      if (e.key === 'Escape') {
                        setEditingCategory(null);
                      }
                    }}
                    className="px-2 py-1 bg-[#222] border border-[rgb(var(--primary-color))] rounded text-white text-lg font-semibold"
                    autoFocus
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-semibold text-white">{category}</h4>
                  <button
                    onClick={() => setEditingCategory(category)}
                    className="text-gray-400 hover:text-white"
                  >
                    <FiEdit2 size={14} />
                  </button>
                </div>
              )}
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleRemoveCategory(category)}
                  className="px-3 py-1 bg-red-600 rounded-md text-sm hover:bg-red-700 flex items-center gap-1"
                >
                  <FiTrash2 size={14} /> Remove Category
                </button>
              </div>
            </div>
            
            {/* Skills List */}
            <div className="space-y-2 mb-4">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2 group">
                  {editingSkill === `${category}-${index}` ? (
                    <input
                      type="text"
                      defaultValue={skill}
                      onBlur={(e) => {
                        handleEditSkill(category, index, e.target.value);
                        setEditingSkill(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleEditSkill(category, index, e.target.value);
                          setEditingSkill(null);
                        }
                        if (e.key === 'Escape') {
                          setEditingSkill(null);
                        }
                      }}
                      className="flex-1 px-3 py-1 bg-[#222] border border-[rgb(var(--primary-color))] rounded text-white"
                      autoFocus
                    />
                  ) : (
                    <>
                      <span className="flex-1 px-3 py-2 bg-[#222] rounded text-white">
                        {skill}
                      </span>
                      <button
                        onClick={() => setEditingSkill(`${category}-${index}`)}
                        className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FiEdit2 size={16} />
                      </button>
                    </>
                  )}
                  
                  <button
                    onClick={() => handleRemoveSkill(category, index)}
                    className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FiX size={20} />
                  </button>
                </div>
              ))}
            </div>
            
            {/* Add Skill Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                placeholder={`Add new skill to ${category}`}
                className="flex-1 px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newSkillInput.trim() !== '') {
                    handleAddSkill(category);
                  }
                }}
              />
              <button
                onClick={() => handleAddSkill(category)}
                disabled={newSkillInput.trim() === ""}
                className="px-4 py-2 bg-[#333] rounded-md hover:bg-[#444] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <FiPlus /> Add
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Professional Skills (No changes needed here) */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Professional Skills</h3>
          <button
            onClick={handleAddProfessionalSkill}
            className="px-3 py-1 bg-[rgb(var(--primary-color))] text-black rounded-md text-sm flex items-center gap-2"
          >
            <FiPlus /> Add Skill
          </button>
        </div>
        
        {skillsData.professionalSkills?.map((skill, index) => (
          <div key={index} className="mb-4 p-4 border border-[#333] rounded-md bg-[#0a0a0a]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              <div className="md:col-span-2">
                <label className="block text-sm mb-1">Skill Name</label>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => handleProfessionalSkillChange(index, "name", e.target.value)}
                  className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white"
                  placeholder="Enter skill name"
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
              className="px-3 py-1 bg-red-600 rounded-md text-sm hover:bg-red-700 flex items-center gap-2"
            >
              <FiTrash2 /> Remove Skill
            </button>
          </div>
        ))}
      </div>
      
      {/* Soft Skills (No changes needed here) */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Soft Skills</h3>
          <button
            onClick={handleAddSoftSkill}
            className="px-3 py-1 bg-[rgb(var(--primary-color))] text-black rounded-md text-sm flex items-center gap-2"
          >
            <FiPlus /> Add Skill
          </button>
        </div>
        
        {skillsData.softSkills?.map((skill, index) => (
          <div key={index} className="mb-4 p-4 border border-[#333] rounded-md bg-[#0a0a0a]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              <div className="md:col-span-2">
                <label className="block text-sm mb-1">Skill Name</label>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => handleSoftSkillChange(index, "name", e.target.value)}
                  className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white"
                  placeholder="Enter skill name"
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
              className="px-3 py-1 bg-red-600 rounded-md text-sm hover:bg-red-700 flex items-center gap-2"
            >
              <FiTrash2 /> Remove Skill
            </button>
          </div>
        ))}
      </div>
      
      <div className="flex gap-4 mt-6">
        <button
          onClick={saveChanges}
          className="px-6 py-2 bg-green-600 rounded-md hover:bg-green-700 font-semibold flex items-center gap-2"
        >
          Save All Changes
        </button>
      </div>
    </div>
  );
};

export default SkillsEditor;