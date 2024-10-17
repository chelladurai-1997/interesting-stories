"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { startConfetti } from "../lib/utils/confettiAnimation";

const PortfolioSection: React.FC = () => {
  useEffect(() => {
    startConfetti(5000, "myConfettiKey");
  }, []);
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-500 text-white py-16 px-6 sm:px-8 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">CHELLADURAI</h1>
          <p className="text-lg sm:text-xl font-semibold">
            🌿 Software Engineer - React & React Native Specialist 🌿
          </p>
          <p className="mt-2 text-sm sm:text-md opacity-80">
            Dindugul, TN | <span className="underline">6384322665</span> |{" "}
            <span className="underline">mechelladurai97@gmail.com</span>
          </p>
          <p className="mt-4 text-lg">
            <Link
              href="https://drive.google.com/file/d/1FlnI6zCUr5L9ZRVO0wXg9EuDK2TzaU8H/view?usp=drive_link"
              className="text-white underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View My Resume
            </Link>
          </p>
        </div>

        {/* Professional Summary */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-600 mb-4">
            Myself 🌱
          </h2>
          <p className="text-gray-700 text-base sm:text-lg">
            I am a skilled and experienced React and React Native developer with
            5+ years of expertise, primarily focused on frontend technologies.
            Recently, my work on a Next.js and TypeScript project has allowed me
            to gain significant knowledge in fullstack development as well. I am
            passionate about building scalable applications, writing clean code,
            and optimizing performance. If you are interested, I am happy to
            provide a demo of the functionalities I’ve implemented and techs I
            have used on this end-to-end project. 🌱
          </p>
          <p className="text-gray-700 text-base sm:text-lg">
            Click{" "}
            <Link href="/" className="text-blue-600 underline">
              here
            </Link>{" "}
            to visit my portfolio project.
          </p>
        </div>

        {/* Skills Section */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 mb-12">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-600 mb-4">
              Key Skills 🌿
            </h2>
            <ul className="list-disc list-inside text-gray-700 text-base sm:text-lg">
              <li>
                ReactJS, NextJs, JavaScript/TypeScript (ES5+), TailwindCSS,
                Redux Toolkit, React Query, MongoDB, MongoDB GridFS, React
                Native, ExpressJS, RXJS
              </li>
              <li>HTML5, CSS3</li>
              <li>Asynchronous Requests, Promises</li>
              <li>Cross-browser Compatibility</li>
              <li>Unit Testing: Jest, Build Tools: Webpack</li>
              <li>Git Version Control</li>
              <li>Browser Performance Optimization</li>
              <li>Agile Methodologies, CI/CD, App Resiliency</li>
              <li>Custom Elements, Shadow DOM, ES Modules</li>
              <li>Strong Troubleshooting & Debugging</li>
            </ul>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-600 mb-4">
              Additional Skills 🌿
            </h2>
            <ul className="list-disc list-inside text-gray-700 text-base sm:text-lg">
              <li>
                <strong>NextJS:</strong> Experience with the new App Router and
                Layouts API
              </li>
              <li>
                <strong>NextJS:</strong> Utilizing Server Actions for optimized
                data fetching and server-side logic in NextJS
              </li>
              <li>
                <strong>NextJS:</strong> Working with API Routes to build
                serverless functions and microservices in NextJS
              </li>
              <li>
                <strong>NextJS:</strong> Implementing Static Site Generation
                (SSG) and Incremental Static Regeneration (ISR) in NextJS
              </li>
              <li>
                <strong>NextJS:</strong> Advanced Image Optimization and
                handling large media assets in NextJS
              </li>
            </ul>
          </div>
        </div>

        {/* Experience Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-600 mb-4">
            Professional Experience 🌱
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-purple-600">
                Accenture, Coimbatore
              </h3>
              <p className="text-sm sm:text-md font-light text-gray-600">
                Multiplatform Front End Development React-Application Developer
                | Mar 2022 – Present
              </p>
              <ul className="list-disc list-inside text-gray-700 text-base sm:text-lg mt-2">
                <li>
                  Developed an ecommerce app for a jewelry retailer with React &
                  NodeJS.
                </li>
                <li>
                  Optimized speed, scalability, and resolved technical problems.
                </li>
                <li>
                  Maintained high-quality code & delivered new UI features.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-purple-600">
                Mindtree, Bengaluru
              </h3>
              <p className="text-sm sm:text-md font-light text-gray-600">
                Senior Software Engineer | Dec 2020 - Mar 2022
              </p>
              <ul className="list-disc list-inside text-gray-700 text-base sm:text-lg mt-2">
                <li>
                  Developed networking apps to streamline workflow automation.
                </li>
                <li>
                  Led design, development & optimization of front-end systems.
                </li>
                <li>
                  Resolved complex issues and analyzed large datasets for
                  performance.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-purple-600">
                Smitiv Mobiles Technologies Pte Ltd
              </h3>
              <p className="text-sm sm:text-md font-light text-gray-600">
                Junior React Developer | Sep 2019 - Nov 2020
              </p>
              <ul className="list-disc list-inside text-gray-700 text-base sm:text-lg mt-2">
                <li>
                  Designed UIs for financial management tools for small
                  businesses.
                </li>
                <li>
                  Integrated real-time features for tracking and managing
                  transactions.
                </li>
                <li>
                  Collaborated with cross-functional teams to deliver
                  high-quality solutions.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-600 mb-4">
            Education 🌱
          </h2>
          <ul className="text-gray-700 text-base sm:text-lg">
            <li>
              B.E Mechanical Engineering, VSB College of Engineering Technical
              Campus – 70%
            </li>
            <li>
              Higher Secondary (12th) – 85.5%, SPM Oxford Matriculation School
            </li>
            <li>
              SSLC (10th) – 85.2%, Nehruji Government Higher Secondary School
            </li>
          </ul>
        </div>

        {/* Call to Action Section */}
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
            Get in Touch 🌿
          </h2>
          <p className="text-md text-white mb-6">
            <span className="underline">6384322665</span> |{" "}
            <span className="underline">mechelladurai97@gmail.com</span>
          </p>
          <Link
            href="https://drive.google.com/file/d/1FlnI6zCUr5L9ZRVO0wXg9EuDK2TzaU8H/view?usp=drive_link"
            className="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-gray-100 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            View My Resume
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
