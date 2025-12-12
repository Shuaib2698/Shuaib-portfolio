// app/components/HeroSection.jsx
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

const HeroSection = () => {
  const [heroData, setHeroData] = useState({});

  useEffect(() => {
    const savedHero = localStorage.getItem("portfolioHero");
    if (savedHero) {
      setHeroData(JSON.parse(savedHero));
    } else {
      setHeroData({
        name: "Shaik Shuaib Ahmed",
        titles: ["Full Stack Developer", "Python Developer", "MERN Stack Developer"],
        description: "Full-Stack Developer with 1 year of professional experience in Python (Django) and MERN stack development. Skilled in building scalable web applications, optimizing system performance, and collaborating in team-based projects. Seeking to leverage technical expertise and hands-on project experience to contribute to impactful software solutions.",
        resumeUrl: "/Shuaib_Ahmed_resume.pdf",
        heroImage: "/images/hero-image.png",
        socialLinks: {
          github: "https://github.com/Shuaib2698",
          linkedin: "https://www.linkedin.com/in/shaik-shuaib-ahmed-b01459128",
          instagram: "https://www.instagram.com/shuaib9845",
          facebook: "https://www.facebook.com/profile.php?id=100007007058045"
        }
      });
    }
  }, []);

  return (
    <section className="section-box py-16 px-4 sm:px-8 lg:px-16">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-12 items-center gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="text-white mb-4 text-3xl sm:text-4xl lg:text-6xl font-extrabold">
            Hello, I&#39;m {heroData.name || "Shaik Shuaib Ahmed"}
            <br />
            <TypeAnimation
              sequence={
                heroData.titles?.flatMap(title => [title, 1000]) || 
                ["Full Stack Developer", 1000, "Python Developer", 1000, "MERN Stack Developer", 1000]
              }
              wrapper="span"
              speed={150}
              style={{ 
                fontSize: '1em',
                display: 'inline-block',
                color: 'rgba(32, 220, 35, 1)'
              }}
              repeat={Infinity}
            />
          </h1>
          <p className="text-[#ADB7BE] text-sm sm:text-base mb-6 lg:text-lg">
            {heroData.description || "Full-Stack Developer with 1 year of professional experience..."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/#contact"
              className="btn-cyan btn-hover-animation"
            >
              Hire Me
            </Link>

            <Link
              href={heroData.resumeUrl || "/Shuaib_Ahmed_resume.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-[rgb(var(--primary-color))] hover:bg-[rgba(var(--primary-color),0.8)] btn-hover-animation"
            >
              <span className="block bg-black hover:bg-[#111] rounded-full px-5 py-2 text-white transition-all duration-300">
                Download CV
              </span>
            </Link>
          </div>
          <div className="socials flex flex-row gap-4 mt-6 justify-center sm:justify-start">
            <Link 
              href={heroData.socialLinks?.github || "https://github.com/Shuaib2698"} 
              target="_blank"
              className="btn-hover-animation w-12 h-12 rounded-full border-2 border-[rgb(var(--primary-color))] flex items-center justify-center text-[rgb(var(--primary-color))] hover:bg-[rgb(var(--primary-color))] hover:text-black transition-all duration-300"
            >
              <FaGithub size={24} />
            </Link>
            <Link 
              href={heroData.socialLinks?.linkedin || "https://www.linkedin.com/in/shaik-shuaib-ahmed-b01459128"} 
              target="_blank"
              className="btn-hover-animation w-12 h-12 rounded-full border-2 border-[rgb(var(--primary-color))] flex items-center justify-center text-[rgb(var(--primary-color))] hover:bg-[rgb(var(--primary-color))] hover:text-black transition-all duration-300"
            >
              <FaLinkedin size={24} />
            </Link>
            <Link 
              href={heroData.socialLinks?.instagram || "https://www.instagram.com/shuaib9845"} 
              target="_blank"
              className="btn-hover-animation w-12 h-12 rounded-full border-2 border-[rgb(var(--primary-color))] flex items-center justify-center text-[rgb(var(--primary-color))] hover:bg-[rgb(var(--primary-color))] hover:text-black transition-all duration-300"
            >
              <FaInstagram size={24} />
            </Link>
            <Link 
              href={heroData.socialLinks?.facebook || "https://www.facebook.com/profile.php?id=100007007058045"} 
              target="_blank"
              className="btn-hover-animation w-12 h-12 rounded-full border-2 border-[rgb(var(--primary-color))] flex items-center justify-center text-[rgb(var(--primary-color))] hover:bg-[rgb(var(--primary-color))] hover:text-black transition-all duration-300"
            >
              <FaFacebook size={24} />
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 place-self-center mt-8 lg:mt-0 relative"
        >
          {/* Main image container with rotating circular bars */}
          <div className="relative w-[300px] h-[300px] lg:w-[450px] lg:h-[450px] mx-auto">
            {/* First circular bar - starts from top */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute inset-0 rounded-full border-4 border-transparent 
                              border-t-[rgb(var(--primary-color))] border-r-transparent border-b-transparent border-l-transparent
                              animate-spin-slow"></div>
            </div>
            
            {/* Second circular bar - starts from bottom (rotated 180deg) */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute inset-0 rounded-full border-4 border-transparent 
                              border-b-[rgb(var(--primary-color))] border-t-transparent border-r-transparent border-l-transparent
                              animate-spin-slow opacity-70"
                   style={{ transform: 'rotate(180deg)' }}></div>
            </div>
            
            {/* Image container with matching background */}
            <div className="absolute inset-4 rounded-full bg-[rgba(0,239,255,0.01)] overflow-hidden">
              <div className="w-full h-full flex items-center justify-center bg-transparent">
                <Image
                  src={heroData.heroImage || "/images/hero-image.png"}
                  alt="hero image"
                  className="object-contain w-full h-full"
                  width={450}
                  height={450}
                  priority
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;