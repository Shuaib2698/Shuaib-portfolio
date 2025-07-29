export default function ExperienceSection({ experiences }) {
  return (
    <section id="experience" className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Work Experience</h2>
        <div className="space-y-8">
          {experiences.map((exp) => (
            <div key={exp._id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{exp.title}</h3>
                  <p className="text-gray-600">{exp.company} • {exp.location}</p>
                </div>
                <div className="text-gray-500">
                  {new Date(exp.startDate).toLocaleDateString()} -{' '}
                  {exp.current ? 'Present' : new Date(exp.endDate).toLocaleDateString()}
                </div>
              </div>
              <ul className="mt-4 list-disc list-inside space-y-1">
                {exp.description.map((item, i) => (
                  <li key={i} className="text-gray-700">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}