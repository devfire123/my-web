import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { api } from '../../services/api';
import './Admin.css';

const Editor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = id === 'new';

    const [formData, setFormData] = useState({
        id: '',
        title: '',
        type: 'writeup', // Default type
        category: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        tags: '',
        featured: false,
        content: ''
    });

    useEffect(() => {
        if (!isNew) {
            loadWriteup();
        }
    }, [id]);

    const loadWriteup = async () => {
        const writeups = await api.getWriteups();
        const meta = writeups.find(w => w.id === id);
        const contentData = await api.getWriteup(id);

        if (meta) {
            setFormData({
                ...meta,
                tags: meta.tags.join(', '),
                content: contentData.content
            });
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleContentChange = (value) => {
        setFormData(prev => ({ ...prev, content: value }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const data = await api.uploadImage(file);
            const imageMarkdown = `\n![Image Description](${data.url})\n`;
            setFormData(prev => ({
                ...prev,
                content: prev.content + imageMarkdown
            }));
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Failed to upload image');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
        };

        await api.saveWriteup(payload);
        navigate('/admin/dashboard');
    };

    const mdeOptions = useMemo(() => {
        return {
            autofocus: true,
            spellChecker: false,
            status: false,
            placeholder: "Write your writeup here...",
        };
    }, []);

    return (
        <div className="admin-editor">
            <div className="editor-header">
                <h2>{isNew ? 'New Writeup' : 'Edit Writeup'}</h2>
                <div className="editor-actions">
                    <button type="button" onClick={() => navigate('/admin/dashboard')} className="btn btn-outline">Cancel</button>
                    <button type="submit" form="editor-form" className="btn">Save</button>
                </div>
            </div>

            <form id="editor-form" onSubmit={handleSubmit} className="editor-form glass-panel">
                <div className="form-row">
                    <div className="form-group">
                        <label>ID (Filename)</label>
                        <input
                            type="text"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            disabled={!isNew}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        >
                            <option value="writeup">Writeup</option>
                            <option value="blog">Blog Post</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Tags (comma separated)</label>
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                name="featured"
                                checked={formData.featured}
                                onChange={handleChange}
                            />
                            Featured on Home
                        </label>
                    </div>
                </div>

                <div className="form-group editor-container">
                    <div className="editor-toolbar-custom">
                        <label>Content (Markdown)</label>
                        <div className="upload-btn-wrapper">
                            <button type="button" className="btn btn-sm" onClick={() => document.getElementById('image-upload').click()}>
                                Upload Image
                            </button>
                            <input
                                type="file"
                                id="image-upload"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                            />
                        </div>
                    </div>
                    <SimpleMDE
                        value={formData.content}
                        onChange={handleContentChange}
                        options={mdeOptions}
                    />
                </div>
            </form>
        </div>
    );
};

export default Editor;
