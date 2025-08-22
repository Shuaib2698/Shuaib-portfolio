"use client";
import React from "react";

const ExperienceSection = () => {
  const experiences = [
    {
      date: "May 2025 – Present",
      role: "Software Developer",
      company: "Aviationskybiz Private Limited / SKYBIZ GLOBAL, Bangalore",
      details: [
        "Developed Company Management System using MERN stack",
        "Enhanced attendance with manual punch-in/out limits and leave tracking",
        "Implemented shift management and fixed timescale issues",
        "Improved both backend (Node/Express/MongoDB) and frontend (React/Tailwind CSS)",
      ],
    },
    {
      date: "Aug 2024 – Feb 2025",
      role: "Python Developer",
      company: "X-Ceincia Tech Ind Put Ltd, Bangalore",
      details: [
        "Built an online job portal with email notifications and job applications",
        "Fixed issues in Skills and Hiring Industry fields",
        "Improved employer dashboards and admin management",
        "Developed RBAC system using Django and React with JWT authentication",
      ],
    },
    {
      date: "Aug 2023 – Sep 2023",
      role: "Intern",
      company: "Varcon Technologies, Bangalore",
      details: [
        "Worked on E-Commerce Fashion Store Site template",
        "Designed functional web pages and database systems",
        "Implemented design briefs and client specifications",
      ],
    },
    {
      date: "Oct 2014 – Oct 2017",
      role: "Apprenticeship - Turner Trade",
      company: "Bosch Vocational Centre, Bangalore",
      details: [
        "Completed apprenticeship training in Turner Trade at Bosch Vocational Centre",
        "Worked in plant operations, gaining hands-on industry exposure",
        "Secured 73.45% marks in All India Apprenticeship Exam",
      ],
    },
  ];

  return (
    <section id="experience" className="py-16 px-4 sm:px-8 lg:px-16 bg-black">
      <h2 className="text-4xl font-bold mb-12 text-center">
        Professional <span className="text-[rgb(var(--primary-color))]">Experience</span>
      </h2>
      
      <div className="max-w-6xl mx-auto">
        {/* Timeline container */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 h-full w-1 bg-[rgb(var(--primary-color))] transform -translate-x-1/2"></div>
          
          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <div key={idx} className={`flex ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center w-full`}>
                {/* Timeline dot */}
                <div className="hidden md:flex md:w-1/2 justify-center">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-[rgb(var(--primary-color))] border-4 border-black z-10 relative"></div>
                    <div className="absolute inset-0 rounded-full bg-[rgb(var(--primary-color))] opacity-50 animate-ping"></div>
                  </div>
                </div>

                {/* Mobile timeline dot */}
                <div className="md:hidden flex justify-start ml-4 mb-4">
                  <div className="relative">
                    <div className="w-6 h-6 rounded-full bg-[rgb(var(--primary-color))] border-4 border-black z-10 relative"></div>
                    <div className="absolute inset-0 rounded-full bg-[rgb(var(--primary-color))] opacity-50 animate-ping"></div>
                  </div>
                </div>

                {/* Content box - Always left aligned */}
                <div className="w-full md:w-1/2 md:pl-8 text-left">
                  <div className="experience-card p-6 rounded-xl bg-gradient-to-br from-[rgba(32,220,35,0.05)] to-[rgba(32,220,35,0.02)] border border-[rgba(32,220,35,0.2)] hover:border-[rgba(32,220,35,0.5)] hover:shadow-[0_0_25px_rgba(32,220,35,0.15)] transition-all duration-500 transform hover:-translate-y-1">
                    <div className="text-[rgb(var(--primary-color))] font-semibold text-sm mb-2">{exp.date}</div>
                    <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                    <h4 className="text-md font-medium text-[#ADB7BE] mb-4">{exp.company}</h4>
                    <ul className="space-y-2">
                      {exp.details.map((item, i) => (
                        <li
                          key={i}
                          className="text-sm text-white relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rotate-45 before:bg-[rgb(var(--primary-color))]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;