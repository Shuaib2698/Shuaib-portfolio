import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ExperienceForm from '../components/admin/ExperienceForm';
import ProjectForm from '../components/admin/ProjectForm';
import EducationForm from '../components/admin/EducationForm';
import SkillForm from '../components/admin/SkillForm';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('projects');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 ${activeTab === 'projects' ? 'border-b-2 border-black' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'experience' ? 'border-b-2 border-black' : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            Experience
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'education' ? 'border-b-2 border-black' : ''}`}
            onClick={() => setActiveTab('education')}
          >
            Education
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'skills' ? 'border-b-2 border-black' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            Skills
          </button>
        </div>

        {activeTab === 'projects' && <ProjectForm />}
        {activeTab === 'experience' && <ExperienceForm />}
        {activeTab === 'education' && <EducationForm />}
        {activeTab === 'skills' && <SkillForm />}
      </div>
    </div>
  );
}