"use client";
import { useState, useEffect } from "react";

const ProjectsEditor = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const savedProjects = localStorage.getItem("portfolioProjects");
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      setProjects([
        {
          id: 1,
          title: "Portfolio Website",
          description: "A responsive portfolio website built with pure HTML5, CSS3, and JavaScript. Features smooth animations, interactive elements, and a modern design. Includes sections for projects, skills, and contact.",
          image: "/images/projects/portfolio-img.jpg",
          tag: ["All", "Web"],
          gitUrl: "https://github.com/Shuaib2698/Portfolio.git",
          previewUrl: "https://portfolio-git-main-shuaib2698s-projects.vercel.app/",
        },
        {
          id: 2,
          title: "Companera",
          description: "A comprehensive company management system with employee time tracking, admin dashboard, automated approval workflows, and payment processing. Built with MongoDB, Express.js, Node.js, and Next.js.",
          image: "/images/projects/CMS.webp",
          tag: ["All", "Web"],
          gitUrl: "https://github.com/Shuaib2698/Companera_FE.git",
          previewUrl: "/",
        },
        {
          id: 3,
          title: "Job-Portal",
          description: "Full-stack recruitment platform with job search, application tracking, and employer analytics. Built with Python, Django, React.js, and MySQL featuring email notifications and enhanced search functionality.",
          image: "/images/projects/jobp.jpg",
          tag: ["All", "Web"],
          gitUrl: "https://github.com/Shuaib2698/Job-portal_backend.git",
          previewUrl: "/",
        },
        {
          id: 4,
          title: "Social Book",
          description: "Social media platform with user authentication, content sharing, and real-time messaging. Developed using Django MVT architecture with React frontend and role-based access control.",
          image: "/images/projects/social-media.jpg",
          tag: ["All", "Web"],
          gitUrl: "https://github.com/Shuaib2698/Social-Book-.git",
          previewUrl: "/",
        }
      ]);
    }
  }, []);

  const handleAddProject = () => {
    setProjects([
      {
        id: Date.now(),
        title: "",
        description: "",
        image: "",
        tag: ["All"],
        gitUrl: "",
        previewUrl: "",
      },
      ...projects,
    ]);
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const handleTagChange = (index, tag, isChecked) => {
    const updatedProjects = [...projects];
    if (isChecked) {
      if (!updatedProjects[index].tag.includes(tag)) {
        updatedProjects[index].tag.push(tag);
      }
    } else {
      updatedProjects[index].tag = updatedProjects[index].tag.filter(t => t !== tag);
    }
    setProjects(updatedProjects);
  };

  const removeProject = (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
  };

  const saveChanges = () => {
    localStorage.setItem("portfolioProjects", JSON.stringify(projects));
    alert("Projects saved successfully!");
  };

  return (
    <div className="section-box p-6">
      <h2 className="text-2xl font-bold mb-6 text-[rgb(var(--primary-color))]">Edit Projects</h2>
      
      {projects.map((project, projectIndex) => (
        <div key={project.id} className="mb-8 p-4 border border-[#333] rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Project #{projectIndex + 1}</h3>
            <button
              onClick={() => removeProject(projectIndex)}
              className="px-3 py-1 bg-red-600 rounded-md text-sm hover:bg-red-700"
            >
              Remove
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-1">Title</label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => handleProjectChange(projectIndex, "title", e.target.value)}
                className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm mb-1">Image URL</label>
              <input
                type="text"
                value={project.image}
                onChange={(e) => handleProjectChange(projectIndex, "image", e.target.value)}
                className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm mb-1">Description</label>
            <textarea
              value={project.description}
              onChange={(e) => handleProjectChange(projectIndex, "description", e.target.value)}
              className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white"
              rows="3"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-1">GitHub URL</label>
              <input
                type="text"
                value={project.gitUrl}
                onChange={(e) => handleProjectChange(projectIndex, "gitUrl", e.target.value)}
                className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm mb-1">Preview URL</label>
              <input
                type="text"
                value={project.previewUrl}
                onChange={(e) => handleProjectChange(projectIndex, "previewUrl", e.target.value)}
                className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm mb-1">Tags</label>
            <div className="flex gap-4">
              {["All", "Web", "Mobile"].map(tag => (
                <label key={tag} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={project.tag.includes(tag)}
                    onChange={(e) => handleTagChange(projectIndex, tag, e.target.checked)}
                    className="text-[rgb(var(--primary-color))]"
                  />
                  <span className="text-white">{tag}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      ))}
      
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleAddProject}
          className="px-4 py-2 bg-[rgb(var(--primary-color))] text-black rounded-md hover:opacity-90"
        >
          Add New Project
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

export default ProjectsEditor;