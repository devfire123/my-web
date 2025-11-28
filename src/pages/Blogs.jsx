import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import { useState, useEffect } from 'react';
import './Writeups.css'; // Reusing Writeups CSS for consistency

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const data = await api.getWriteups();
            setBlogs(data.filter(item => item.type === 'blog'));
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
                    <h1 className="page-title">Security Blogs</h1>
                    <p className="page-subtitle">Thoughts, tutorials, and industry insights.</p>
                </motion.div>

                {blogs.length === 0 ? (
                    <div className="no-content">
                        <p>No blog posts yet. Check back soon!</p>
                    </div>
                ) : (
                    <div className="writeups-grid">
                        {blogs.map((blog, index) => (
                            <motion.div
                                key={blog.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="writeup-card"
                            >
                                <div className="card-header">
                                    <span className={`card-category category-${blog.category.toLowerCase().replace(/\s+/g, '-')}`}>
                                        {blog.category}
                                    </span>
                                    <span className="card-date">{blog.date}</span>
                                </div>
                                <h2 className="card-title">{blog.title}</h2>
                                <p className="card-desc">{blog.description}</p>
                                <div className="card-tags">
                                    {blog.tags.map(tag => (
                                        <span key={tag} className="tag">#{tag}</span>
                                    ))}
                                </div>
                                <Link to={`/writeups/${blog.id}`} className="read-more">
                                    Read Article &rarr;
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blogs;
