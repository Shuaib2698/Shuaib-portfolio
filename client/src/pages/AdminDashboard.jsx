import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Create axios instance with error handling
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/admin';
    }
    return Promise.reject(error);
  }
);

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('projects');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/admin');
        return;
      }

      try {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await api.get('/admin/verify');
        setIsLoading(false);
      } catch (error) {
        console.error('Verification error:', error);
        setError(error.message);
        localStorage.removeItem('token');
        navigate('/admin');
      }
    };

    verifyToken();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin');
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

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

        <div className="bg-white p-6 rounded-lg shadow">
          {activeTab === 'projects' && <div>Projects content will go here</div>}
          {activeTab === 'experience' && <div>Experience content will go here</div>}
          {activeTab === 'education' && <div>Education content will go here</div>}
          {activeTab === 'skills' && <div>Skills content will go here</div>}
        </div>
      </div>
    </div>
  );
}