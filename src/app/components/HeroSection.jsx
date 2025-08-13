"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const HeroSection = () => {
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
            Hello, I'm Shaik Shuaib Ahmed
            <br />
            <TypeAnimation
              sequence={[
                "Full Stack Developer",
                1000,
                "Python Developer",
                1000,
                "MERN Stack Developer",
                1000,
              ]}
              wrapper="span"
              speed={50}
              style={{ 
                fontSize: '1em',
                display: 'inline-block',
                color: 'rgb(0, 255, 255)'
              }}
              repeat={Infinity}
            />
          </h1>
          <p className="text-[#ADB7BE] text-sm sm:text-base mb-6 lg:text-lg">
            Full Stack Developer specializing in Python, Django, React, and the
            MERN stack. Passionate about building scalable, efficient, and
            user-friendly applications that make a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/#contact"
              className="btn-cyan"
            >
              Hire Me
            </Link>
            <Link
              href="/Shuaib_Ahmed_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-[rgb(0,255,255)] hover:bg-[rgba(0,255,255,0.8)]"
            >
              <span className="block bg-black hover:bg-[#111] rounded-full px-5 py-2 text-white transition-all duration-300">
                Download CV
              </span>
            </Link>
          </div>
          <div className="socials flex flex-row gap-4 mt-6 justify-center sm:justify-start">
            <Link 
              href="https://github.com" 
              target="_blank"
              className="w-12 h-12 rounded-full border-2 border-[rgb(0,255,255)] flex items-center justify-center text-[rgb(0,255,255)] hover:bg-[rgb(0,255,255)] hover:text-black transition-all duration-300"
            >
              <FaGithub size={24} />
            </Link>
            <Link 
              href="https://linkedin.com" 
              target="_blank"
              className="w-12 h-12 rounded-full border-2 border-[rgb(0,255,255)] flex items-center justify-center text-[rgb(0,255,255)] hover:bg-[rgb(0,255,255)] hover:text-black transition-all duration-300"
            >
              <FaLinkedin size={24} />
            </Link>
            <Link 
              href="https://instagram.com" 
              target="_blank"
              className="w-12 h-12 rounded-full border-2 border-[rgb(0,255,255)] flex items-center justify-center text-[rgb(0,255,255)] hover:bg-[rgb(0,255,255)] hover:text-black transition-all duration-300"
            >
              <FaInstagram size={24} />
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 place-self-center mt-8 lg:mt-0"
        >
          <div className="rounded-full bg-[#111] w-[250px] h-[250px] lg:w-[350px] lg:h-[350px] relative overflow-hidden border-4 border-[rgb(0,255,255)]">
            <Image
              src="/images/hero-image.png"
              alt="hero image"
              className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              width={300}
              height={300}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;