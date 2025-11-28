import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import { useState, useEffect } from 'react';
import './Writeups.css';

const Writeups = () => {
    const [writeups, setWriteups] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const data = await api.getWriteups();
            setWriteups(data.filter(item => !item.type || item.type === 'writeup'));
        };
        loadData();
    }, []);

    return (
        <div className="writeups-page">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="writeups-header"
                >
                    <h1 className="page-title">Writeups & Research</h1>
                    <p className="page-subtitle">Documenting the process of exploitation.</p>
                </motion.div>

                <div className="writeups-grid">
                    {writeups.map((writeup, index) => (
                        <motion.div
                            key={writeup.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="writeup-card"
                        >
                            <div className="card-header">
                                <span className={`card-category category-${writeup.category.toLowerCase().replace(/\s+/g, '-')}`}>
                                    {writeup.category}
                                </span>
                                <span className="card-date">{writeup.date}</span>
                            </div>
                            <h2 className="card-title">{writeup.title}</h2>
                            <p className="card-desc">{writeup.description}</p>
                            <div className="card-tags">
                                {writeup.tags.map(tag => (
                                    <span key={tag} className="tag">#{tag}</span>
                                ))}
                            </div>
                            <Link to={`/writeups/${writeup.id}`} className="read-more">
                                Read Full Writeup &rarr;
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Writeups;
