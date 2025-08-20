"use client";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const SkillSection = () => {
  const technicalSkills = {
    "Languages": [
      "Python", "Java", "JavaScript", "TypeScript", "C", "C++"
    ],
    "Web Development": [
      "HTML5", "CSS3", "React.js", "Next.js", "Node.js", "Express.js",
      "Tailwind CSS", "Bootstrap"
    ],
    "Databases": [
      "MySQL", "PostgreSQL", "MongoDB"
    ],
    "Tools & Libraries": [
      "Git", "GitHub", "VS Code", "Postman", "pandas", "NumPy", "Matplotlib"
    ]
  };

  const professionalSkills = [
    { name: "Problem Solving", level: 90 },
    { name: "Teamwork", level: 85 },
    { name: "Communication", level: 80 },
    { name: "Creativity", level: 95 },
  ];

  return (
    <section id="skills" className="section py-16 px-4 sm:px-8 lg:px-16">
      <h2 className="text-4xl font-bold mb-12 text-center">
        My <span className="text-[rgb(var(--primary-color))]">Skills</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Technical Skills */}
        <div className="section-box p-8">
          <h3 className="text-2xl font-bold mb-6 text-[rgb(var(--primary-color))]">Technical Skills</h3>
          
          <div className="space-y-6">
            {Object.entries(technicalSkills).map(([category, skills]) => (
              <div key={category}>
                <h4 className="text-xl font-semibold mb-3 text-white">{category}</h4>
                <div className="flex flex-wrap gap-3 mb-4">
                  {skills.map((skill, index) => (
                    <div 
                      key={index} 
                      className="px-4 py-2 bg-[rgba(var(--primary-color),0.1)] rounded-lg hover:bg-[rgba(var(--primary-color),0.2)] hover:shadow-[0_0_10px_rgba(var(--primary-color),0.3)] transition-all duration-300 text-white"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Skills */}
        <div className="section-box p-8">
          <h3 className="text-2xl font-bold mb-6 text-[rgb(var(--primary-color))]">Professional Skills</h3>
          
          <div className="grid grid-cols-2 gap-6">
            {professionalSkills.map((skill, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-32 h-32 mb-4">
                  <CircularProgressbar
                    value={skill.level}
                    text={`${skill.level}%`}
                    styles={buildStyles({
                      pathColor: `rgba(var(--primary-color), ${skill.level / 100})`,
                      textColor: "rgb(var(--primary-color))",
                      trailColor: "rgba(var(--primary-color), 0.1)",
                      textSize: "24px",
                    })}
                  />
                </div>
                <span className="text-lg font-medium text-[rgb(var(--primary-color))]">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillSection;