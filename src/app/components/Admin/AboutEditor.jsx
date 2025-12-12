// app/components/admin/AboutEditor.jsx
"use client";
import { useState, useEffect, useRef } from "react";
import { FiTrash2, FiExternalLink, FiCopy, FiUpload, FiImage, FiX, FiSave, FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";

const AboutEditor = () => {
  const [aboutData, setAboutData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const router = useRouter();

  // Initialize with localStorage or defaults
  useEffect(() => {
    const savedAbout = localStorage.getItem("portfolioAbout");
    if (savedAbout) {
      const data = JSON.parse(savedAbout);
      setAboutData(data);
      setOriginalData(JSON.parse(savedAbout)); // Store original for comparison
    } else {
      const defaultData = {
        description: "Hi, I'm Shuaib, a full-stack developer from Bangalore...",
        aboutImage: "/images/ahmed.png",
        education: [
          "R N S Institute of Technology — B.E. in Computer Science & Engineering (2021 – 2024) | CGPA: 7.20",
          "M S Polytechnic — Diploma in Computer Science (2018 – 2021) | Percentage: 80.4%"
        ],
        certifications: [
          { name: "Full Stack Web Development", url: "https://drive.google.com/file/d/1aWLYRXzNgrH94wS34CgPYfgdWgnuwYjx/view" },
          { name: "Python Fundamentals", url: "https://drive.google.com/file/d/1tb0aE8rRMRel9Y5WbBQJMSd2G60yreYx/view" },
          { name: "MySQL", url: "https://www.hackerrank.com/certificates/86328d90018e" }
        ]
      };
      setAboutData(defaultData);
      setOriginalData(JSON.parse(JSON.stringify(defaultData)));
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
        setAboutData({
          ...aboutData,
          aboutImage: data.url
        });
        
        setTimeout(() => {
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
    setAboutData({
      ...aboutData,
      [field]: value
    });
  };

  const handleEducationChange = (index, value) => {
    const updatedEducation = [...(aboutData.education || [])];
    updatedEducation[index] = value;
    setAboutData({
      ...aboutData,
      education: updatedEducation
    });
  };

  const handleCertificationChange = (index, field, value) => {
    const updatedCertifications = [...(aboutData.certifications || [])];
    updatedCertifications[index][field] = value;
    setAboutData({
      ...aboutData,
      certifications: updatedCertifications
    });
  };

  const addEducation = () => {
    setAboutData({
      ...aboutData,
      education: ["", ...(aboutData.education || [])]
    });
  };

  const addCertification = () => {
    setAboutData({
      ...aboutData,
      certifications: [{ name: "", url: "" }, ...(aboutData.certifications || [])]
    });
  };

  const removeEducation = (index) => {
    const updatedEducation = [...(aboutData.education || [])];
    updatedEducation.splice(index, 1);
    setAboutData({
      ...aboutData,
      education: updatedEducation
    });
  };

  const removeCertification = (index) => {
    const updatedCertifications = [...(aboutData.certifications || [])];
    updatedCertifications.splice(index, 1);
    setAboutData({
      ...aboutData,
      certifications: updatedCertifications
    });
  };

  const copyLink = (url) => {
    navigator.clipboard.writeText(url)
      .then(() => alert("Link copied to clipboard!"))
      .catch(err => console.error("Failed to copy:", err));
  };

  const validateUrl = (url) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const saveChanges = () => {
    // Validate all certification URLs
    const invalidUrls = aboutData.certifications
      ?.filter(cert => cert.url && cert.url.trim() !== "" && !validateUrl(cert.url))
      .map(cert => cert.name || "Unnamed certification") || [];

    if (invalidUrls.length > 0) {
      alert(`Invalid URL format in certifications: ${invalidUrls.join(", ")}\nPlease enter valid URLs (include http:// or https://)`);
      return;
    }

    // Ensure aboutData has all required fields
    const completeAboutData = {
      description: aboutData.description || "",
      aboutImage: aboutData.aboutImage || "/images/ahmed.png",
      education: aboutData.education || [],
      certifications: aboutData.certifications || []
    };

    localStorage.setItem("portfolioAbout", JSON.stringify(completeAboutData));
    setOriginalData(JSON.parse(JSON.stringify(completeAboutData))); // Update original data
    alert("About section saved successfully!");
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  // Check if there are unsaved changes
  const hasChanges = JSON.stringify(aboutData) !== JSON.stringify(originalData);

  return (
    <div className="section-box p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBackToHome}
            className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 flex items-center gap-2 transition-colors"
            title="Back to Home"
          >
            <FiArrowLeft /> Back to Home
          </button>
          <h2 className="text-2xl font-bold text-[rgb(var(--primary-color))]">Edit About Section</h2>
        </div>
        <div className="flex items-center gap-4">
          {hasChanges && (
            <span className="text-yellow-400 text-sm flex items-center gap-1">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              Unsaved changes
            </span>
          )}
          <button
            onClick={saveChanges}
            className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
              hasChanges 
                ? "bg-green-600 hover:bg-green-700 shadow-lg" 
                : "bg-gray-700 cursor-not-allowed"
            }`}
            disabled={!hasChanges}
          >
            <FiSave /> {hasChanges ? "Save Changes" : "Saved"}
          </button>
        </div>
      </div>

      {/* Rest of the component remains the same */}
      <div className="mb-8 p-6 border border-[#333] rounded-lg bg-[#0a0a0a]">
        <h3 className="text-lg font-semibold mb-4 text-white">About Image</h3>
        
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-64 h-64 border-2 border-dashed border-[#333] rounded-lg overflow-hidden bg-[#111] upload-preview">
            {aboutData.aboutImage ? (
              <div className="relative w-full h-full">
                <img 
                  src={aboutData.aboutImage} 
                  alt="About preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/ahmed.png";
                  }}
                />
                <button
                  onClick={() => {
                    handleChange("aboutImage", "/images/ahmed.png");
                  }}
                  className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors"
                  title="Remove image"
                >
                  <FiX size={16} />
                </button>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                <FiImage size={64} />
                <p className="text-sm mt-2">No about image</p>
              </div>
            )}
          </div>
          
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
                      e.target.value = '';
                    }
                  }}
                  className="hidden"
                  id="about-file-upload"
                />
                <label
                  htmlFor="about-file-upload"
                  className="px-4 py-2 bg-[rgb(var(--primary-color))] text-black rounded-md hover:opacity-90 cursor-pointer flex items-center gap-2 disabled:opacity-50 transition-colors"
                  disabled={uploading}
                >
                  <FiUpload /> Upload About Image
                </label>
                
                <div className="flex-1">
                  <input
                    type="text"
                    value={aboutData.aboutImage || ""}
                    onChange={(e) => handleChange("aboutImage", e.target.value)}
                    placeholder="Or enter image URL"
                    className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white text-sm focus:border-[rgb(var(--primary-color))] focus:outline-none transition-colors"
                  />
                </div>
              </div>
              
              <p className="text-xs text-gray-400 mt-2">
                Upload JPG, PNG, WebP (max 5MB) or enter URL. Recommended: 500x500px or larger
              </p>
            </div>
            
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
      
      <div className="mb-6">
        <label className="block text-sm mb-2 font-medium text-gray-300">Description</label>
        <textarea
          value={aboutData.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white focus:border-[rgb(var(--primary-color))] focus:outline-none transition-colors"
          rows="6"
        />
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Education</h3>
          <button
            onClick={addEducation}
            className="px-3 py-1 bg-[rgb(var(--primary-color))] text-black rounded-md text-sm flex items-center gap-2 hover:opacity-90 transition-colors"
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
              className="flex-1 px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white focus:border-[rgb(var(--primary-color))] focus:outline-none transition-colors"
              placeholder="e.g., University — Degree (Year) | Grade"
            />
            <button
              onClick={() => removeEducation(index)}
              className="px-3 py-2 bg-red-600 rounded-md hover:bg-red-700 flex items-center justify-center transition-colors"
              title="Remove"
            >
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Certifications</h3>
          <button
            onClick={addCertification}
            className="px-3 py-1 bg-[rgb(var(--primary-color))] text-black rounded-md text-sm flex items-center gap-2 hover:opacity-90 transition-colors"
          >
            Add Certification
          </button>
        </div>
        
        {aboutData.certifications?.map((cert, index) => (
          <div key={index} className="mb-4 p-4 border border-[#333] rounded-md bg-[#0a0a0a]">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-white">Certification #{index + 1}</h4>
              <button
                onClick={() => removeCertification(index)}
                className="px-2 py-1 bg-red-600 rounded-md hover:bg-red-700 text-sm flex items-center gap-1 transition-colors"
              >
                <FiTrash2 size={12} /> Remove
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block text-sm mb-1 text-gray-300">Certificate Name</label>
                <input
                  type="text"
                  value={cert.name || ""}
                  onChange={(e) => handleCertificationChange(index, "name", e.target.value)}
                  className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white focus:border-[rgb(var(--primary-color))] focus:outline-none transition-colors"
                  placeholder="e.g., Full Stack Web Development"
                />
              </div>
              
              <div>
                <label className="block text-sm mb-1 text-gray-300">Certificate URL/Link</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={cert.url || ""}
                    onChange={(e) => handleCertificationChange(index, "url", e.target.value)}
                    className="flex-1 px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white focus:border-[rgb(var(--primary-color))] focus:outline-none transition-colors"
                    placeholder="https://example.com/certificate"
                  />
                  <div className="flex gap-1">
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-3 py-2 bg-blue-600 rounded-md hover:bg-blue-700 flex items-center transition-colors ${!cert.url || !validateUrl(cert.url) ? 'opacity-50 cursor-not-allowed' : ''}`}
                      title="Test Link"
                      onClick={(e) => {
                        if (!cert.url || !validateUrl(cert.url)) e.preventDefault();
                      }}
                    >
                      <FiExternalLink />
                    </a>
                    <button
                      onClick={() => copyLink(cert.url)}
                      disabled={!cert.url}
                      className="px-3 py-2 bg-purple-600 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-colors"
                      title="Copy Link"
                    >
                      <FiCopy />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Enter full URL (include http:// or https://)
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutEditor;