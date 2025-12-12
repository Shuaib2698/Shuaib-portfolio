// app/components/admin/ProjectsEditor.jsx
"use client";
import { useState, useEffect, useRef } from "react";
import { FiUpload, FiImage, FiX, FiSave, FiPlus, FiTrash2 } from "react-icons/fi";

const ProjectsEditor = () => {
  const [projects, setProjects] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const fileInputRefs = useRef({});

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

  const handleImageUpload = async (projectIndex, file) => {
    if (!file) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      alert("Please upload a valid image file (JPEG, PNG, WebP, GIF)");
      return;
    }

    if (file.size > maxSize) {
      alert("Image size must be less than 5MB");
      return;
    }

    setUploading(true);
    setUploadingIndex(projectIndex);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      const response = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      const data = await response.json();

      if (response.ok) {
        // Update project with new image URL
        const updatedProjects = [...projects];
        updatedProjects[projectIndex].image = data.url;
        setProjects(updatedProjects);
        
        // Auto-save after upload
        setTimeout(() => {
          saveChanges();
          setUploadProgress(0);
          setUploading(false);
          setUploadingIndex(null);
        }, 500);
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image. Please try again.");
      setUploading(false);
      setUploadingIndex(null);
      setUploadProgress(0);
    }
  };

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
    if (window.confirm("Are you sure you want to remove this project?")) {
      const updatedProjects = [...projects];
      updatedProjects.splice(index, 1);
      setProjects(updatedProjects);
    }
  };

  const saveChanges = () => {
    localStorage.setItem("portfolioProjects", JSON.stringify(projects));
    alert("Projects saved successfully!");
  };

  return (
    <div className="section-box p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[rgb(var(--primary-color))]">Edit Projects</h2>
        <div className="flex gap-2">
          <button
            onClick={handleAddProject}
            className="px-4 py-2 bg-[rgb(var(--primary-color))] text-black rounded-md hover:opacity-90 flex items-center gap-2"
          >
            <FiPlus /> Add Project
          </button>
          <button
            onClick={saveChanges}
            className="px-4 py-2 bg-green-600 rounded-md hover:bg-green-700 flex items-center gap-2"
          >
            <FiSave /> Save All
          </button>
        </div>
      </div>
      
      {projects.map((project, projectIndex) => (
        <div key={project.id} className="mb-8 p-6 border border-[#333] rounded-lg bg-[#0a0a0a]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Project #{projectIndex + 1}</h3>
            <button
              onClick={() => removeProject(projectIndex)}
              className="px-3 py-1 bg-red-600 rounded-md text-sm hover:bg-red-700 flex items-center gap-2"
            >
              <FiTrash2 /> Remove
            </button>
          </div>
          
          {/* Image Upload Section */}
          <div className="mb-6">
            <label className="block text-sm mb-3 font-medium text-white">
              Project Image
            </label>
            
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Image Preview */}
              <div className="w-48 h-48 border-2 border-dashed border-[#333] rounded-lg overflow-hidden bg-[#111] upload-preview">
                {project.image ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={project.image} 
                      alt="Project preview" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => {
                        handleProjectChange(projectIndex, "image", "");
                        saveChanges();
                      }}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                      title="Remove image"
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                    <FiImage size={48} />
                    <p className="text-sm mt-2">No image</p>
                  </div>
                )}
              </div>
              
              {/* Upload Controls */}
              <div className="flex-1">
                <div className="mb-4">
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      ref={el => fileInputRefs.current[projectIndex] = el}
                      onChange={(e) => {
                        if (e.target.files[0]) {
                          handleImageUpload(projectIndex, e.target.files[0]);
                          e.target.value = ''; // Reset input
                        }
                      }}
                      className="hidden"
                      id={`file-upload-${projectIndex}`}
                    />
                    <label
                      htmlFor={`file-upload-${projectIndex}`}
                      className="px-4 py-2 bg-[rgb(var(--primary-color))] text-black rounded-md hover:opacity-90 cursor-pointer flex items-center gap-2 disabled:opacity-50 transition-all"
                      disabled={uploading && uploadingIndex === projectIndex}
                    >
                      <FiUpload /> Upload Image
                    </label>
                    
                    <div className="flex-1">
                      <input
                        type="text"
                        value={project.image}
                        onChange={(e) => handleProjectChange(projectIndex, "image", e.target.value)}
                        onBlur={saveChanges}
                        placeholder="Or enter image URL"
                        className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white text-sm focus:border-[rgb(var(--primary-color))] focus:outline-none"
                      />
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-400 mt-2">
                    Upload JPG, PNG, WebP or GIF (max 5MB) or enter URL
                  </p>
                </div>
                
                {/* Upload Progress */}
                {uploading && uploadingIndex === projectIndex && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Uploading...</span>
                      <span className="text-[rgb(var(--primary-color))]">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-[#222] rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-[rgb(var(--primary-color))] transition-all duration-300 upload-progress"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-1 text-gray-300">Title</label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => handleProjectChange(projectIndex, "title", e.target.value)}
                onBlur={saveChanges}
                className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white focus:border-[rgb(var(--primary-color))] focus:outline-none"
                placeholder="Project title"
              />
            </div>
            
            <div>
              <label className="block text-sm mb-1 text-gray-300">GitHub URL</label>
              <input
                type="text"
                value={project.gitUrl}
                onChange={(e) => handleProjectChange(projectIndex, "gitUrl", e.target.value)}
                onBlur={saveChanges}
                className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white focus:border-[rgb(var(--primary-color))] focus:outline-none"
                placeholder="https://github.com/..."
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm mb-1 text-gray-300">Description</label>
            <textarea
              value={project.description}
              onChange={(e) => handleProjectChange(projectIndex, "description", e.target.value)}
              onBlur={saveChanges}
              className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white focus:border-[rgb(var(--primary-color))] focus:outline-none"
              rows="3"
              placeholder="Project description"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-1 text-gray-300">Preview URL</label>
              <input
                type="text"
                value={project.previewUrl}
                onChange={(e) => handleProjectChange(projectIndex, "previewUrl", e.target.value)}
                onBlur={saveChanges}
                className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white focus:border-[rgb(var(--primary-color))] focus:outline-none"
                placeholder="https://live-demo.com"
              />
            </div>
            
            <div>
              <label className="block text-sm mb-1 text-gray-300">Tags</label>
              <div className="flex flex-wrap gap-3 mt-2">
                {["All", "Web", "Mobile"].map(tag => (
                  <label key={tag} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={project.tag.includes(tag)}
                      onChange={(e) => {
                        handleTagChange(projectIndex, tag, e.target.checked);
                        saveChanges();
                      }}
                      className="w-4 h-4 text-[rgb(var(--primary-color))] bg-[#111] border-[#333] rounded focus:ring-[rgb(var(--primary-color))]"
                    />
                    <span className="text-white text-sm">{tag}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsEditor;