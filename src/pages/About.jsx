import { motion } from 'framer-motion';
import { FaUserSecret, FaBug, FaCode, FaShieldAlt } from 'react-icons/fa';
import './About.css';

const About = () => {
    const skills = [
        { name: "Web Exploitation", level: 90, icon: <FaBug /> },
        { name: "Full Stack Dev", level: 85, icon: <FaCode /> },
        { name: "Reverse Engineering", level: 75, icon: <FaCode /> },
        { name: "Network Security", level: 85, icon: <FaShieldAlt /> },
        { name: "Cryptography", level: 70, icon: <FaUserSecret /> },
    ];

    return (
        <div className="about-page">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="about-header"
                >
                    <h1 className="page-title">About Me</h1>
                    <p className="page-subtitle">Who is behind the keyboard?</p>
                </motion.div>

                <div className="about-content">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bio-section"
                    >
                        <h2>The Operator</h2>
                        <p>
                            I am a passionate cybersecurity researcher and Full Stack Developer dedicated to understanding
                            how systems work and how to break them. My journey began with a curiosity for
                            technology and evolved into a relentless pursuit of security knowledge and building robust applications.
                        </p>
                        <p>
                            When I'm not hacking, I'm building full-stack web applications, analyzing malware, or participating in
                            CTF competitions. I have successfully delivered multiple complex projects, combining secure coding practices
                            with modern development frameworks.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="skills-section"
                    >
                        <h2>Skills & Arsenal</h2>
                        <div className="skills-grid">
                            {skills.map((skill) => (
                                <div key={skill.name} className="skill-card">
                                    <div className="skill-icon">{skill.icon}</div>
                                    <h3 className="skill-name">{skill.name}</h3>
                                    <div className="skill-bar-container">
                                        <motion.div
                                            className="skill-bar"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${skill.level}%` }}
                                            transition={{ duration: 1, delay: 0.8 }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default About;
