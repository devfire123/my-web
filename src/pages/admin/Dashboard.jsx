import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt } from 'react-icons/fa';
import './Admin.css';

const Dashboard = () => {
    const [writeups, setWriteups] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadWriteups();
    }, []);

    const loadWriteups = async () => {
        const data = await api.getWriteups();
        setWriteups(data);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this writeup?')) {
            await api.deleteWriteup(id);
            loadWriteups();
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin');
    };

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h1>Dashboard</h1>
                <div className="admin-actions">
                    <Link to="/admin/editor/new" className="btn">
                        <FaPlus /> New Post
                    </Link>
                    <button onClick={handleLogout} className="btn btn-outline">
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </div>

            <div className="admin-table-container glass-panel">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Featured</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {writeups.map(writeup => (
                            <tr key={writeup.id}>
                                <td>{writeup.title}</td>
                                <td>
                                    <span className={`type-badge ${writeup.type === 'blog' ? 'type-blog' : 'type-writeup'}`}>
                                        {writeup.type === 'blog' ? 'Blog' : 'Writeup'}
                                    </span>
                                </td>
                                <td>{writeup.category}</td>
                                <td>{writeup.date}</td>
                                <td>{writeup.featured ? 'Yes' : 'No'}</td>
                                <td className="action-cells">
                                    <Link to={`/admin/editor/${writeup.id}`} className="icon-btn edit">
                                        <FaEdit />
                                    </Link>
                                    <button onClick={() => handleDelete(writeup.id)} className="icon-btn delete">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
