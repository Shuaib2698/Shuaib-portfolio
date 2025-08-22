"use client";
import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const SkillSection = () => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  const technicalSkills = {
    Languages: ["Python", "Java", "JavaScript", "TypeScript", "C", "C++"],
    "Web Development": [
      "HTML5",
      "CSS3",
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "Bootstrap",
    ],
    Databases: ["MySQL", "PostgreSQL", "MongoDB"],
    "Tools & Libraries": [
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
      "pandas",
      "NumPy",
      "Matplotlib",
    ],
  };

  const professionalSkills = [
    { name: "Full Stack Python Development", level: 80 },
    { name: "MERN Stack", level: 85 },
    { name: "Frontend Development", level: 70 },
    { name: "Backend Development", level: 85 },
  ];

  const softSkills = [
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Technical Skills */}
        <div className="section-box p-8 lg:col-span-1">
          <h3 className="text-2xl font-bold mb-6 text-[rgb(var(--primary-color))]">
            Technical Skills
          </h3>

          <div className="space-y-6">
            {Object.entries(technicalSkills).map(([category, skills]) => (
              <div key={category}>
                <h4 className="text-xl font-semibold mb-3 text-white">
                  {category}
                </h4>
                <div className="flex flex-wrap gap-3 mb-4">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="skill-item-hover px-4 py-2 bg-[rgba(132,179,33,0.2)] rounded-lg text-white border border-[rgba(32,220,35,0.3)]"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Skills + Soft Skills */}
        <div className="section-box p-8 lg:col-span-1">
          <h3 className="text-2xl font-bold mb-6 text-[rgb(var(--primary-color))]">
            Professional Skills
          </h3>

          <div className="grid grid-cols-2 gap-6">
            {professionalSkills.map((skill, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-24 h-24 mb-3">
                  <CircularProgressbar
                    value={animated ? skill.level : 0}
                    text={`${skill.level}%`}
                    styles={buildStyles({
                      pathColor: `rgba(var(--primary-color), ${
                        skill.level / 100
                      })`,
                      textColor: "rgb(var(--primary-color))",
                      trailColor: "rgba(var(--primary-color), 0.1)",
                      textSize: "16px",
                      pathTransition: animated
                        ? "stroke-dashoffset 1s ease 0.5s"
                        : "none",
                    })}
                  />
                </div>
                <span className="text-sm font-medium text-[rgb(var(--primary-color))] text-center">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>

          {/* Soft Skills */}
          <h3 className="text-2xl font-bold mb-6 text-[rgb(var(--primary-color))] mt-8">
            Soft Skills
          </h3>

          <div className="space-y-4">
            {softSkills.map((skill, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between mb-1">
                  <span className="text-white text-sm font-medium">
                    {skill.name}
                  </span>
                  <span className="text-[rgb(var(--primary-color))] text-sm">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full bg-[rgba(var(--primary-color),0.2)] rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-[rgb(var(--primary-color))] transition-all duration-1000 ease-out"
                    style={{
                      width: animated ? `${skill.level}%` : "0%",
                      transitionDelay: `${index * 100}ms`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillSection;
