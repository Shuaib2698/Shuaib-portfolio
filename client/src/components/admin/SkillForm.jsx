import { useState } from 'react';
import axios from 'axios';

export default function SkillForm() {
  const [formData, setFormData] = useState({
    name: '',
    category: 'language',
    proficiency: 3
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/skills', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Reset form and show success
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Add Skill</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form fields similar to other forms */}
      </form>
    </div>
  );
}