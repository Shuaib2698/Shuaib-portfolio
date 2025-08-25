"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminNav from "../../components/AdminNav";
import ExperienceEditor from "../../components/Admin/ExperienceEditor";
import ProjectsEditor from "../../components/Admin/ProjectsEditor";
import SkillsEditor from "../../components/Admin/SkillsEditor";
import AboutEditor from "../../components/Admin/AboutEditor";
import HeroEditor from "../../components/Admin/HeroEditor";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("experience");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem("adminAuth");
    if (auth !== "true") {
      router.push("/admin");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin");
  };

  if (!isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center bg-black">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[rgb(var(--primary-color))]">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        <AdminNav activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="mt-8">
          {activeTab === "experience" && <ExperienceEditor />}
          {activeTab === "projects" && <ProjectsEditor />}
          {activeTab === "skills" && <SkillsEditor />}
          {activeTab === "about" && <AboutEditor />}
          {activeTab === "hero" && <HeroEditor />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;