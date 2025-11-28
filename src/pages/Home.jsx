import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import { FaArrowRight } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
    const [featuredWriteups, setFeaturedWriteups] = useState([]);
    const [text, setText] = useState('');
    const fullText = "Hack The Planet";

    useEffect(() => {
        const loadData = async () => {
            const data = await api.getWriteups();
            setFeaturedWriteups(data.filter(w => w.featured));
        };
        loadData();

        let i = 0;
        const interval = setInterval(() => {
            setText(fullText.slice(0, i + 1));
            i++;
            if (i > fullText.length) clearInterval(interval);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="home-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <section className="hero-section">
                <div className="container hero-container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hero-content centered"
                    >
                        <h1 className="hero-title">
                            <span className="glitch-text">{text}</span>
                            <span className="cursor-blink">|</span>
                        </h1>
                        <p className="hero-subtitle">
                            Exploring the depths of cybersecurity, one exploit at a time.
                        </p>
                        <div className="hero-cta">
                            <Link to="/writeups" className="btn">
                                Read Writeups <FaArrowRight className="btn-icon" />
                            </Link>
                            <Link to="/about" className="btn btn-outline">
                                Who Am I?
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="featured-section">
                <div className="container">
                    <h2 className="section-title">Featured Writeups</h2>
                    <div className="writeups-grid">
                        {featuredWriteups.map((writeup, index) => (
                            <motion.div
                                key={writeup.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="writeup-card glass-panel"
                            >
                                <div className="card-header">
                                    <span className="card-category">{writeup.category}</span>
                                    <span className="card-date">{writeup.date}</span>
                                </div>
                                <h3 className="card-title">{writeup.title}</h3>
                                <p className="card-desc">{writeup.description}</p>
                                <div className="card-tags">
                                    {writeup.tags.map(tag => (
                                        <span key={tag} className="tag">#{tag}</span>
                                    ))}
                                </div>
                                <Link to={`/writeups/${writeup.id}`} className="read-more">
                                    Read More &rarr;
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default Home;
