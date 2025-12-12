// app/components/AboutSection.jsx
"use client";
import React, { useTransition, useState, useEffect } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import { FiExternalLink } from "react-icons/fi";

const AboutSection = () => {
  const [tab, setTab] = useState("education");
  const [aboutData, setAboutData] = useState({
    description: "",
    aboutImage: "/images/ahmed.png", // Add this default
    education: [],
    certifications: []
  });
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const savedAbout = localStorage.getItem("portfolioAbout");
    if (savedAbout) {
      const parsedData = JSON.parse(savedAbout);
      // Ensure certifications have proper structure
      const updatedCertifications = parsedData.certifications?.map(cert => {
        if (typeof cert === 'string') {
          return { name: cert, url: "" };
        }
        return cert;
      }) || [];
      
      setAboutData({
        description: parsedData.description || "Hi, I'm Shuaib, a full-stack developer from Bangalore...",
        aboutImage: parsedData.aboutImage || "/images/ahmed.png", // Use saved image or default
        education: parsedData.education || [],
        certifications: updatedCertifications
      });
    } else {
      setAboutData({
        description: "Hi, I'm Shuaib, a full-stack developer from Bangalore with a background in Computer Science Engineering. Over the past 8 months, I've worked as a Python Developer and gained 4 months of experience with the MERN stack. I enjoy building end-to-end applications and have created projects like a company management system using Next.js, as well as a job portal and a social media platform. My passion lies in crafting efficient, user-friendly solutions, and my long-term goal is to establish my own startup to bring innovative ideas to life.",
        aboutImage: "/images/ahmed.png",
        education: [
          "R N S Institute of Technology — B.E. in Computer Science & Engineering (2021 – 2024) | CGPA: 7.20",
          "M S Polytechnic — Diploma in Computer Science (2018 – 2021) | Percentage: 80.4%"
        ],
        certifications: [
          { name: "Full Stack Web Development", url: "https://drive.google.com/file/d/1aWLYRXzNgrH94wS34CgPYfgdWgnuwYjx/view" },
          { name: "Python Fundamentals", url: "https://drive.google.com/file/d/1tb0aE8rRMRel9Y5WbBQJMSd2G60yreYx/view" },
          { name: "Python by Example", url: "" },
          { name: "C++ Programming", url: "https://www.mygreatlearning.com/certificate/FUBOFIHO" },
          { name: "Frontend Development - CSS", url: "https://www.mygreatlearning.com/certificate/GKITKJGR" },
          { name: "Frontend Development - HTML", url: "https://www.mygreatlearning.com/certificate/IIOLGHVN" },
          { name: "PHP Programming", url: "https://www.mygreatlearning.com/certificate/CTNYRIEP" },
          { name: "Data Structures in C", url: "https://www.mygreatlearning.com/certificate/ZLBYPRKS" },
          { name: "Java Programming", url: "https://www.mygreatlearning.com/certificate/KJGPANTY" },
          { name: "MySQL", url: "https://www.hackerrank.com/certificates/86328d90018e" }
        ]
      });
    }
  }, []);

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  const TAB_DATA = [
    {
      title: "Education",
      id: "education",
      content: (
        <ul className="list-disc pl-4 space-y-2">
          {aboutData.education?.map((edu, index) => (
            <li key={index} className="text-white">
              {edu}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Certifications",
      id: "certifications",
      content: (
        <ul className="list-disc pl-4 space-y-2">
          {aboutData.certifications?.map((cert, index) => (
            <li key={index} className="text-white">
              {cert.url ? (
                <a 
                  href={cert.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[rgb(var(--primary-color))] hover:underline transition-all duration-300 hover:text-[rgba(var(--primary-color),0.8)] flex items-center gap-1"
                >
                  {cert.name}
                  <FiExternalLink size={12} />
                </a>
              ) : (
                <span className="text-gray-300">{cert.name}</span>
              )}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16 section-box">
        <Image 
          src={aboutData.aboutImage} // Use from aboutData
          width={500} 
          height={500} 
          alt="About me" 
          className="rounded-lg object-cover"
          priority
        />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-3xl font-bold text-white mb-4">About Me</h2>
          <p className="text-sm lg:text-base text-gray-300">
            {aboutData.description}
          </p>
          <div className="flex flex-row justify-start mt-8">
            {TAB_DATA.map((tabBtn) => (
              <TabButton
                key={tabBtn.id}
                selectTab={() => handleTabChange(tabBtn.id)}
                active={tab === tabBtn.id}
              >
                {tabBtn.title}
              </TabButton>
            ))}
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab)?.content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;