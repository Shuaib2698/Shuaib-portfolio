"use client";
import React, { useTransition, useState, useEffect } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const AboutSection = () => {
  const [tab, setTab] = useState("education");
  const [aboutData, setAboutData] = useState({
    description: "",
    education: [],
    certifications: []
  });
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const savedAbout = localStorage.getItem("portfolioAbout");
    if (savedAbout) {
      setAboutData(JSON.parse(savedAbout));
    } else {
      setAboutData({
        description: "Hi, I'm Shuaib, a full-stack developer from Bangalore with a background in Computer Science Engineering. Over the past 8 months, I've worked as a Python Developer and gained 4 months of experience with the MERN stack. I enjoy building end-to-end applications and have created projects like a company management system using Next.js, as well as a job portal and a social media platform. My passion lies in crafting efficient, user-friendly solutions, and my long-term goal is to establish my own startup to bring innovative ideas to life.",
        education: [
          "R N S Institute of Technology — B.E. in Computer Science & Engineering (2021 – 2024) | CGPA: 7.20",
          "M S Polytechnic — Diploma in Computer Science (2018 – 2021) | Percentage: 80.4%"
        ],
        certifications: [
          "Full Stack Web Development",
          "Python Fundamentals",
          "Python by Example", 
          "C++ Programming",
          "Frontend Development - CSS",
          "Frontend Development - HTML",
          "PHP Programming",
          "Data Structures in C",
          "Java Programming",
          "MySQL"
        ]
      });
    }
  }, []);

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  const certificationLinks = {
    "Full Stack Web Development": "https://drive.google.com/file/d/1aWLYRXzNgrH94wS34CgPYfgdWgnuwYjx/view?usp=drive_link",
    "Python Fundamentals": "https://drive.google.com/file/d/1tb0aE8rRMRel9Y5WbBQJMSd2G60yreYx/view?usp=drive_link",
    "Python by Example": "https://drive.google.com/file/d/1yQH_HocdddbJhZ0A-VmunttoYVBY-VhG/view?usp=drive_link",
    "C++ Programming": "https://www.mygreatlearning.com/certificate/FUBOFIHO?referrer_code=GLAMTO6GGNO_W",
    "Frontend Development - CSS": "https://www.mygreatlearning.com/certificate/GKITKJGR?referrer_code=GLAMTO6GGNO_W",
    "Frontend Development - HTML": "https://www.mygreatlearning.com/certificate/IIOLGHVN?referrer_code=GLAMTO6GGNO_W",
    "PHP Programming": "https://www.mygreatlearning.com/certificate/CTNYRIEP?referrer_code=GLAMTO6GGNO_W",
    "Data Structures in C": "https://www.mygreatlearning.com/certificate/ZLBYPRKS?referrer_code=GLAMTO6GGNO_W",
    "Java Programming": "https://www.mygreatlearning.com/certificate/KJGPANTY?referrer_code=GLAMTO6GGNO_W",
    "MySQL": "https://www.hackerrank.com/certificates/86328d90018e"
  };

  const TAB_DATA = [
    {
      title: "Education",
      id: "education",
      content: (
        <ul className="list-disc pl-4">
          {aboutData.education?.map((edu, index) => (
            <li key={index}>
              {edu}
              {index < aboutData.education.length - 1 && <br />}
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
            <li key={index}>
              {certificationLinks[cert] ? (
                <a 
                  href={certificationLinks[cert]}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[rgb(var(--primary-color))] hover:underline transition-all duration-300 hover:text-[rgba(var(--primary-color),0.8)]"
                >
                  {cert}
                </a>
              ) : (
                cert
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
        <Image src="/images/ahmed.png" width={500} height={500} alt="About" />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-3xl font-bold text-white mb-4">About Me</h2>
          <p className="text-sm lg:text-base">
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
          <div className="mt-8">{TAB_DATA.find((t) => t.id === tab)?.content}</div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;