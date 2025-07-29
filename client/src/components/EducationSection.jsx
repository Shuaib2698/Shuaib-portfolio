export default function EducationSection({ education }) {
  return (
    <section id="education" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Education</h2>
        <div className="space-y-6">
          {education.map((edu) => (
            <div key={edu._id} className="bg-gray-50 p-6 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{edu.institution}</h3>
                  <p className="text-gray-600">
                    {edu.degree} in {edu.fieldOfStudy}
                  </p>
                  {edu.grade && (
                    <p className="text-gray-600 mt-1">Grade: {edu.grade}</p>
                  )}
                </div>
                <div className="text-gray-500 whitespace-nowrap">
                  {new Date(edu.startDate).toLocaleDateString()} -{' '}
                  {edu.current ? 'Present' : new Date(edu.endDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}