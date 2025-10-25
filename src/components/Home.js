import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaArrowDown, FaPhoneAlt } from "react-icons/fa";

import heroImg from "../assets/hero-interview.jpg";
import featureCandidate from "../assets/feature-candidate.jpg";
import featureInterviewer from "../assets/feature-interviewer.jpg";
import featureCoordination from "../assets/feature-coordination.jpg";
import featureAnalytics from "../assets/feature-analytics.jpg";

const AnimatedSection = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    {children}
  </motion.div>
);

const Home = () => {
  const navigate = useNavigate();
  const aboutRef = useRef(null);
  const featuresRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => ref.current?.scrollIntoView({ behavior: "smooth" });

  const featureCards = [
    {
      image: featureCandidate,
      title: "For Candidates",
      description:
        "Apply for jobs, track your interview progress, and receive instant feedback — all in one place.",
    },
    {
      image: featureInterviewer,
      title: "For Interviewers",
      description:
        "Easily schedule interviews, manage sessions, and record structured evaluations with automation support.",
    },
    {
      image: featureCoordination,
      title: "Seamless Coordination",
      description:
        "Empowers HR teams and candidates to stay aligned with real-time notifications and calendar integration.",
    },
    {
      image: featureAnalytics,
      title: "Smart Analytics",
      description:
        "Gain insights into hiring efficiency and team performance with intuitive visual dashboards.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* 🧭 Navbar */}
      <header className="fixed top-0 w-full bg-indigo-900 text-white shadow-lg z-50">
        <nav className="flex justify-between items-center px-10 py-4">
          <h1
            className="text-2xl font-bold text-yellow-400 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Interview Scheduler
          </h1>

          <div className="flex items-center gap-8 font-medium">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-yellow-400 transition-all"
            >
              Home
            </button>
            <button onClick={() => scrollToSection(aboutRef)} className="hover:text-yellow-400 transition-all">
              About
            </button>
            <button onClick={() => scrollToSection(featuresRef)} className="hover:text-yellow-400 transition-all">
              Features
            </button>
            <button onClick={() => scrollToSection(contactRef)} className="hover:text-yellow-400 transition-all">
              Contact
            </button>

            <button
              onClick={() => navigate("/login")}
              className="border border-yellow-400 px-4 py-1 rounded-lg hover:bg-yellow-400 hover:text-indigo-900 transition-all"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-yellow-400 text-indigo-900 font-semibold px-4 py-1 rounded-lg hover:bg-yellow-500 transition-all"
            >
              Sign Up
            </button>
          </div>
        </nav>
      </header>

      {/* 🏠 Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center min-h-screen text-center text-white pt-24"
        style={{
          backgroundImage: `linear-gradient(rgba(26,35,126,0.7), rgba(26,35,126,0.7)), url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4"
        >
          Simplify Your Hiring Process
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-2xl text-lg text-gray-100 mb-6"
        >
          Streamline scheduling, coordination, and feedback between <b>candidates</b> and <b>interviewers</b> — all from one intuitive platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4"
        >
          <button
            onClick={() => navigate("/login")}
            className="bg-yellow-400 text-indigo-900 font-bold px-6 py-2 rounded-lg hover:bg-yellow-500 transition-all"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/register")}
            className="border border-yellow-400 text-yellow-400 font-bold px-6 py-2 rounded-lg hover:bg-yellow-400 hover:text-indigo-900 transition-all"
          >
            Join Now
          </button>
        </motion.div>

        {/* Scroll Arrow */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-10 flex flex-col items-center cursor-pointer"
          onClick={() => scrollToSection(aboutRef)}
        >
          <span className="text-yellow-400 font-semibold mb-1">Explore Features</span>
          <FaArrowDown size={26} color="#FFB300" />
        </motion.div>
      </section>

      {/* 💡 About Section (Replaced with Animated Version) */}
      <section ref={aboutRef} className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-8">
                About Our <span className="text-yellow-500">Platform</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Text Section */}
                <motion.div
                  className="text-left space-y-4"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Interview Scheduler revolutionizes the way companies manage their hiring process. 
                    Our intelligent platform automates interview coordination, eliminating scheduling conflicts 
                    and reducing administrative overhead.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    With real-time updates, seamless communication, and powerful analytics, we empower HR teams 
                    to focus on what matters most — finding the perfect candidates for their organization.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Join thousands of companies who have transformed their hiring experience and reduced 
                    time-to-hire by up to <span className="font-semibold text-yellow-600">40%</span>.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Our platform ensures transparency and collaboration at every stage, enabling both candidates 
                    and recruiters to stay informed and connected through intuitive dashboards and smart notifications.
                  </p>

                </motion.div>

                {/* Image Section */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="relative animate-float">
                    <div className="absolute -inset-4 bg-yellow-400/20 rounded-lg blur-xl"></div>
                    <img
                      src={heroImg}
                      alt="Interview management platform"
                      className="relative rounded-lg shadow-xl"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ⚙️ Features Section */}
      <section
        ref={featuresRef}
        className="py-20 bg-gradient-to-r from-white via-gray-100 to-white overflow-hidden"
      >
        <h3 className="text-3xl font-bold text-center text-indigo-900 mb-10">
          Platform Features
        </h3>

        <motion.div
          className="flex gap-6 px-6 md:px-20 overflow-x-auto pb-6"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {featureCards.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="min-w-[300px] bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-44 object-cover"
              />
              <div className="p-6 text-center">
                <h4 className="text-xl font-semibold text-indigo-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 🤝 Contact Section */}
      <section ref={contactRef} className="py-16 bg-indigo-50 text-center">
        <h3 className="text-3xl font-bold text-indigo-900 mb-4">Get in Touch</h3>
        <p className="text-gray-700 max-w-xl mx-auto mb-6">
          Have any questions or suggestions? Our team would love to hear from you!
        </p>
        <button
          onClick={() => (window.location.href = "mailto:support@interviewscheduler.com")}
          className="bg-indigo-900 text-yellow-400 font-semibold px-6 py-2 rounded-lg hover:bg-indigo-800 transition-all flex items-center gap-2 mx-auto"
        >
          <FaPhoneAlt /> Contact Us
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white text-center py-4 text-sm">
        © {new Date().getFullYear()} Interview Scheduler — All Rights Reserved
      </footer>
    </div>
  );
};

export default Home;
