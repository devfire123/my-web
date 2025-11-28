import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { api } from '../services/api';
import { useState, useEffect } from 'react';
import { FaArrowLeft, FaCalendar, FaTag } from 'react-icons/fa';
import './WriteupDetail.css';

const WriteupDetail = () => {
    const { id } = useParams();
    const [writeup, setWriteup] = useState(null);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const allWriteups = await api.getWriteups();
                const meta = allWriteups.find(w => w.id === id);
                setWriteup(meta);

                if (meta) {
                    const data = await api.getWriteup(id);
                    setContent(data.content);
                }
            } catch (error) {
                console.error("Failed to load writeup", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id]);

    if (loading) {
        return <div className="container" style={{ paddingTop: '100px' }}>Loading...</div>;
    }

    if (!writeup) {
        return <div className="container" style={{ paddingTop: '100px' }}>Writeup not found</div>;
    }

    return (
        <div className="writeup-detail-page">
            <div className="container">
                <Link to="/writeups" className="back-link">
                    <FaArrowLeft /> Back to Writeups
                </Link>

                <header className="writeup-header">
                    <h1 className="writeup-title">{writeup.title}</h1>
                    <div className="writeup-meta">
                        <span className="meta-item"><FaCalendar /> {writeup.date}</span>
                        <span className={`meta-item category-${writeup.category.toLowerCase().replace(/\s+/g, '-')}`}>
                            {writeup.category}
                        </span>
                    </div>
                    <div className="writeup-tags">
                        {writeup.tags.map(tag => (
                            <span key={tag} className="tag"><FaTag /> {tag}</span>
                        ))}
                    </div>
                </header>

                <div className="markdown-content">
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default WriteupDetail;
