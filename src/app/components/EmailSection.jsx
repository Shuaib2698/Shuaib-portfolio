"use client";
import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/send";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    const resData = await response.json();

    if (response.status === 200) {
      console.log("Message sent.");
      setEmailSubmitted(true);
    }
  };

  return (
    <section
      id="contact"
      className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-8 relative"
    >
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[rgba(var(--primary-color),0.3)] to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>
      <div className="z-10 section-box">
        <h5 className="text-xl font-bold text-white my-2">
          Let&apos;s Connect
        </h5>
        <p className="text-[#ADB7BE] mb-4 max-w-md">
          I&apos;m currently looking for new opportunities, my inbox is always
          open. Whether you have a question or just want to say hi, I&apos;ll
          try my best to get back to you!
        </p>
        <div className="socials flex flex-row gap-4">
          <Link 
              href="https://github.com/Shuaib2698" 
              target="_blank"
              className="w-12 h-12 rounded-full border-2 border-[rgb(var(--primary-color))] flex items-center justify-center text-[rgb(var(--primary-color))] hover:bg-[rgb(var(--primary-color))] hover:text-black transition-all duration-300"
            >
              <FaGithub size={24} />
            </Link>
            <Link 
              href="https://www.linkedin.com/in/shaik-shuaib-ahmed-b01459128" 
              target="_blank"
              className="w-12 h-12 rounded-full border-2 border-[rgb(var(--primary-color))] flex items-center justify-center text-[rgb(var(--primary-color))] hover:bg-[rgb(var(--primary-color))] hover:text-black transition-all duration-300"
            >
              <FaLinkedin size={24} />
            </Link>
            <Link 
              href="https://www.instagram.com/shuaib9845" 
              target="_blank"
              className="w-12 h-12 rounded-full border-2 border-[rgb(var(--primary-color))] flex items-center justify-center text-[rgb(var(--primary-color))] hover:bg-[rgb(var(--primary-color))] hover:text-black transition-all duration-300"
            >
              <FaInstagram size={24} />
            </Link>
            <Link 
              href="https://www.facebook.com/profile.php?id=100007007058045" 
              target="_blank"
              className="w-12 h-12 rounded-full border-2 border-[rgb(var(--primary-color))] flex items-center justify-center text-[rgb(var(--primary-color))] hover:bg-[rgb(var(--primary-color))] hover:text-black transition-all duration-300"
            >
              <FaFacebook size={24} />
            </Link>
        </div>
      </div>
      <div className="section-box z-10">
        {emailSubmitted ? (
          <p className="text-green-500 text-sm mt-2">
            Email sent successfully!
          </p>
        ) : (
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="text-white block mb-2 text-sm font-medium"
              >
                Your email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="jacob@google.com"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="subject"
                className="text-white block text-sm mb-2 font-medium"
              >
                Subject
              </label>
              <input
                name="subject"
                type="text"
                id="subject"
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="Just saying hi"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="text-white block text-sm mb-2 font-medium"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="Let's talk about..."
              />
            </div>
            <button
              type="submit"
              className="bg-[rgb(var(--primary-color))] hover:bg-[rgba(var(--primary-color),0.8)] text-black font-bold py-2.5 px-5 rounded-lg w-full hover:shadow-[0_0_15px_rgba(var(--primary-color),0.6)] transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default EmailSection;