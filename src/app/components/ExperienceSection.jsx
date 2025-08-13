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
  ];

  return (
    <section id="experience" className="section-box py-16 px-4 sm:px-8 lg:px-16">
      <h2 className="text-4xl font-bold mb-12 text-center">
        Professional <span className="text-[rgb(0,255,255)]">Experience</span>
      </h2>
      
      <div className="max-w-4xl mx-auto space-y-12">
        {experiences.map((exp, idx) => (
          <div key={idx} className="pl-8 border-l-2 border-[rgb(0,255,255)] relative">
            <div className="absolute -left-[9px] w-4 h-4 rounded-full bg-[rgb(0,255,255)] border-4 border-black"></div>
            <div className="text-[rgb(0,255,255)] font-semibold mb-1">{exp.date}</div>
            <h3 className="text-2xl font-bold text-[rgb(0,255,255)]">{exp.role}</h3>
            <h4 className="text-lg font-medium mb-4">{exp.company}</h4>
            <ul className="space-y-2">
              {exp.details.map((item, i) => (
                <li key={i} className="relative pl-4 before:content-['-'] before:absolute before:left-0 before:text-[rgb(0,255,255)]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;