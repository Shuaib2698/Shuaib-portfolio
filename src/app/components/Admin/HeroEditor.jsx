// app/components/admin/HeroEditor.jsx
"use client";
import { useState, useEffect, useRef } from "react";
import { FiUpload, FiImage, FiX, FiSave } from "react-icons/fi";

const HeroEditor = () => {
  const [heroData, setHeroData] = useState({});
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

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
        heroImage: "/images/hero-image.png",
        socialLinks: {
          github: "https://github.com/Shuaib2698",
          linkedin: "https://www.linkedin.com/in/shaik-shuaib-ahmed-b01459128",
          instagram: "https://www.instagram.com/shuaib9845",
          facebook: "https://www.facebook.com/profile.php?id=100007007058045"
        }
      });
    }
  }, []);

  const handleImageUpload = async (file) => {
    if (!file) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      alert("Please upload a valid image file (JPEG, PNG, WebP)");
      return;
    }

    if (file.size > maxSize) {
      alert("Image size must be less than 5MB");
      return;
    }

    setUploading(true);
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
        setHeroData({
          ...heroData,
          heroImage: data.url
        });
        
        setTimeout(() => {
          saveChanges();
          setUploadProgress(0);
          setUploading(false);
        }, 500);
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image. Please try again.");
      setUploading(false);
      setUploadProgress(0);
    }
  };

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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[rgb(var(--primary-color))]">Edit Hero Section</h2>
        <button
          onClick={saveChanges}
          className="px-4 py-2 bg-green-600 rounded-md hover:bg-green-700 flex items-center gap-2"
        >
          <FiSave /> Save Changes
        </button>
      </div>
      
      {/* Hero Image Upload Section */}
      <div className="mb-8 p-6 border border-[#333] rounded-lg bg-[#0a0a0a]">
        <h3 className="text-lg font-semibold mb-4 text-white">Hero Image</h3>
        
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Image Preview */}
          <div className="w-64 h-64 border-2 border-dashed border-[#333] rounded-lg overflow-hidden bg-[#111] upload-preview">
            {heroData.heroImage ? (
              <div className="relative w-full h-full">
                <img 
                  src={heroData.heroImage} 
                  alt="Hero preview" 
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => {
                    handleChange("heroImage", "");
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
                <FiImage size={64} />
                <p className="text-sm mt-2">No hero image</p>
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
                  ref={fileInputRef}
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      handleImageUpload(e.target.files[0]);
                      e.target.value = ''; // Reset input
                    }
                  }}
                  className="hidden"
                  id="hero-file-upload"
                />
                <label
                  htmlFor="hero-file-upload"
                  className="px-4 py-2 bg-[rgb(var(--primary-color))] text-black rounded-md hover:opacity-90 cursor-pointer flex items-center gap-2 disabled:opacity-50"
                  disabled={uploading}
                >
                  <FiUpload /> Upload Hero Image
                </label>
                
                <div className="flex-1">
                  <input
                    type="text"
                    value={heroData.heroImage || ""}
                    onChange={(e) => handleChange("heroImage", e.target.value)}
                    onBlur={saveChanges}
                    placeholder="Or enter image URL"
                    className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white text-sm focus:border-[rgb(var(--primary-color))] focus:outline-none"
                  />
                </div>
              </div>
              
              <p className="text-xs text-gray-400 mt-2">
                Upload JPG, PNG, WebP (max 5MB) or enter URL. Recommended: 800x800px or larger
              </p>
            </div>
            
            {/* Upload Progress */}
            {uploading && (
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
      
      {/* Rest of the form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm mb-2 font-medium text-gray-300">Name</label>
          <input
            type="text"
            value={heroData.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={saveChanges}
            className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white focus:border-[rgb(var(--primary-color))] focus:outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm mb-2 font-medium text-gray-300">Resume URL</label>
          <input
            type="text"
            value={heroData.resumeUrl || ""}
            onChange={(e) => handleChange("resumeUrl", e.target.value)}
            onBlur={saveChanges}
            className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white focus:border-[rgb(var(--primary-color))] focus:outline-none"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm mb-2 font-medium text-gray-300">Description</label>
        <textarea
          value={heroData.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          onBlur={saveChanges}
          className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white focus:border-[rgb(var(--primary-color))] focus:outline-none"
          rows="4"
        />
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Titles</h3>
          <button
            onClick={addTitle}
            className="px-3 py-1 bg-[rgb(var(--primary-color))] text-black rounded-md text-sm hover:opacity-90"
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
              onBlur={saveChanges}
              className="flex-1 px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white focus:border-[rgb(var(--primary-color))] focus:outline-none"
            />
            <button
              onClick={() => {
                removeTitle(index);
                saveChanges();
              }}
              className="px-3 py-2 bg-red-600 rounded-md hover:bg-red-700"
              title="Remove title"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Social Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-300">GitHub</label>
            <input
              type="text"
              value={heroData.socialLinks?.github || ""}
              onChange={(e) => handleSocialLinkChange("github", e.target.value)}
              onBlur={saveChanges}
              className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white focus:border-[rgb(var(--primary-color))] focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-300">LinkedIn</label>
            <input
              type="text"
              value={heroData.socialLinks?.linkedin || ""}
              onChange={(e) => handleSocialLinkChange("linkedin", e.target.value)}
              onBlur={saveChanges}
              className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white focus:border-[rgb(var(--primary-color))] focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-300">Instagram</label>
            <input
              type="text"
              value={heroData.socialLinks?.instagram || ""}
              onChange={(e) => handleSocialLinkChange("instagram", e.target.value)}
              onBlur={saveChanges}
              className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white focus:border-[rgb(var(--primary-color))] focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-300">Facebook</label>
            <input
              type="text"
              value={heroData.socialLinks?.facebook || ""}
              onChange={(e) => handleSocialLinkChange("facebook", e.target.value)}
              onBlur={saveChanges}
              className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white focus:border-[rgb(var(--primary-color))] focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroEditor;