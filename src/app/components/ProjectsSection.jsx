"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A responsive portfolio website built with pure HTML5, CSS3, and JavaScript. Features smooth animations, interactive elements, and a modern design. Includes sections for projects, skills, and contact.",
    image: "/images/projects/portfolio-img.jpg",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Shuaib2698/Portfolio.git",
    previewUrl: "https://portfolio-git-main-shuaib2698s-projects.vercel.app/",
  },
  {
    id: 2,
    title: "Companera",
    description: "A comprehensive company management system with employee time tracking, admin dashboard, automated approval workflows, and payment processing. Built with MongoDB, Express.js, Node.js, and Next.js.",
    image: "/images/projects/CMS.webp",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Shuaib2698/Companera_FE.git",
    previewUrl: "/",
  },
  {
    id: 3,
    title: "Job-Portal",
    description: "Full-stack recruitment platform with job search, application tracking, and employer analytics. Built with Python, Django, React.js, and MySQL featuring email notifications and enhanced search functionality.",
    image: "/images/projects/jobp.jpg",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Shuaib2698/Job-portal_backend.git",
    previewUrl: "/",
  },
  {
    id: 4,
    title: "Social Book",
    description: "Social media platform with user authentication, content sharing, and real-time messaging. Developed using Django MVT architecture with React frontend and role-based access control.",
    image: "/images/projects/social-media.jpg",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Shuaib2698/Social-Book-.git",
    previewUrl: "/",
  },
  {
    id: 5,
    title: "React Firebase Template",
    description: "Authentication and CRUD operations",
    image: "/images/projects/5.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 6,
    title: "Full-stack Roadmap",
    description: "Project 5 description",
    image: "/images/projects/6.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects" className="section-box">
  <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
    My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Mobile"
          isSelected={tag === "Mobile"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;