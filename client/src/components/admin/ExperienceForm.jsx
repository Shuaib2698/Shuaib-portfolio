import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ExperienceForm() {
  const [experiences, setExperiences] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ['']
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await axios.get('/api/experiences');
      setExperiences(response.data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/experiences', formData);
      fetchExperiences();
      setFormData({
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ['']
      });
    } catch (error) {
      console.error('Error creating experience:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Add Experience</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        {/* Form fields for experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
        {/* Add other fields similarly */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Experience
        </button>
      </form>

      <h2 className="text-2xl font-semibold mb-4">Experiences</h2>
      <div className="space-y-4">
        {experiences.map(exp => (
          <div key={exp._id} className="p-4 border rounded">
            <h3 className="font-bold">{exp.title} at {exp.company}</h3>
            {/* Display other experience details */}
          </div>
        ))}
      </div>
    </div>
  );
}