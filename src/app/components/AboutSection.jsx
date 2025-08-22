"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-4">
        <li>
          R N S Institute of Technology — B.E. in Computer Science & Engineering
          (2021 – 2024) | CGPA: 7.20
        </li>
        <br></br>
        <li>
          M S Polytechnic — Diploma in Computer Science <br></br>
          (2018 – 2021) | Percentage: 80.4%
        </li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <p >MySQL.</p>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("education");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16 section-box">
        <Image src="/images/ahmed.png" width={500} height={500} alt="About" />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-3xl font-bold text-white mb-4">About Me</h2>
          <p className="text-sm lg:text-base">
            Hi, I’m Shuaib, a full-stack developer from Bangalore with a background in Computer Science Engineering. Over the past 8 months, I’ve worked as a Python Developer and gained 4 months of experience with the MERN stack. I enjoy building end-to-end applications and have created projects like a company management system using Next.js, as well as a job portal and a social media platform. My passion lies in crafting efficient, user-friendly solutions, and my long-term goal is to establish my own startup to bring innovative ideas to life.
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
          <div className="mt-8">{TAB_DATA.find((t) => t.id === tab).content}</div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;