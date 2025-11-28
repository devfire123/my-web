import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-content">
                    <p>&copy; {new Date().getFullYear()} BugHunter. All rights reserved.</p>
                    <p className="footer-tagline">Securing the digital frontier, one flag at a time.</p>
                </div>
                <div className="footer-socials">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <FaGithub />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <FaTwitter />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <FaLinkedin />
                    </a>
                    <a href="mailto:contact@example.com" aria-label="Email">
                        <FaEnvelope />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
