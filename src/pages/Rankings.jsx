import { motion } from 'framer-motion';
import { FaTrophy, FaMedal, FaFlag, FaChartLine } from 'react-icons/fa';
import './Rankings.css';

const Rankings = () => {
    const overallStats = {
        place: 111,
        points: 331.015,
        year: 2025,
        team: "THEM?!"
    };

    const ctfParticipations = [
        { rank: 2, name: "ImaginaryCTF 2025", points: 8625.0, rating: 89.277 },
        { rank: 6, name: "QnQSec CTF 2025", points: 8161.0, rating: 22.757 },
        { rank: 7, name: "PatriotCTF 2025", points: 6613.0, rating: 47.235 },
        { rank: 7, name: "PwnSec CTF 2025", points: 5040.0, rating: 16.061 },
        { rank: 7, name: "NNS CTF 2025", points: 11243.0, rating: 19.515 },
        { rank: 9, name: "World Wide CTF 2025", points: 9418.0, rating: 18.761 },
        { rank: 13, name: "Lexington Informatics Tournament CTF 2025", points: 5354.0, rating: 57.773 },
        { rank: 14, name: "ToH CTF 2025", points: 1282.0, rating: 9.090 },
        { rank: 15, name: "Infobahn CTF 2025", points: 2200.0, rating: 8.923 },
        { rank: 24, name: "V1t CTF 2025", points: 5412.0, rating: 13.706 },
        { rank: 26, name: "idekCTF 2025", points: 2357.0, rating: 15.606 },
        { rank: 28, name: "osu!gaming CTF 2025", points: 3335.0, rating: 10.234 },
        { rank: 44, name: "EnigmaXplore 3.0", points: 1250.0, rating: 11.938 },
        { rank: 45, name: "CTFZone 2025 Quals", points: 453.0, rating: 5.774 },
        { rank: 51, name: "L3akCTF 2025", points: 3271.0, rating: 6.001 },
        { rank: 52, name: "Securinets CTF Quals 2025", points: 3175.0, rating: 26.637 },
        { rank: 54, name: "Hack.lu CTF 2025", points: 1015.0, rating: 20.094 },
        { rank: 60, name: "SunshineCTF 2025", points: 2910.0, rating: 20.056 },
        { rank: 80, name: "MaltaCTF 2025 Quals", points: 310.0, rating: 1.705 },
        { rank: 90, name: "CrewCTF 2025", points: 397.0, rating: 2.410 },
        { rank: 175, name: "BDSec CTF 2025", points: 800.0, rating: 2.130 },
        { rank: 223, name: "Google Capture The Flag 2025", points: 50.0, rating: 1.070 },
        { rank: 240, name: "HITCON CTF 2025", points: 50.0, rating: 1.409 }
    ];

    return (
        <div className="rankings-page">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="rankings-header"
                >
                    <h1 className="page-title">CTF Rankings</h1>
                    <div className="team-badge">
                        <FaFlag className="team-icon" />
                        <span>Team: <span className="highlight">{overallStats.team}</span></span>
                    </div>
                </motion.div>

                <motion.div
                    className="overall-stats-card glass-panel"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="stat-box">
                        <FaTrophy className="stat-icon gold" />
                        <div className="stat-info">
                            <h3>Global Rank</h3>
                            <p>#{overallStats.place}</p>
                        </div>
                    </div>
                    <div className="stat-box">
                        <FaChartLine className="stat-icon cyan" />
                        <div className="stat-info">
                            <h3>Rating Points</h3>
                            <p>{overallStats.points}</p>
                        </div>
                    </div>
                    <div className="stat-box">
                        <FaMedal className="stat-icon purple" />
                        <div className="stat-info">
                            <h3>Year</h3>
                            <p>{overallStats.year}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="ctf-list-section"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h2 className="section-title">2025 Participation</h2>
                    <div className="ctf-table-container glass-panel">
                        <table className="ctf-table">
                            <thead>
                                <tr>
                                    <th>Event</th>
                                    <th>Rank</th>
                                    <th>Points</th>
                                    <th>Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ctfParticipations.map((ctf, index) => (
                                    <tr key={index}>
                                        <td className="ctf-name">{ctf.name}</td>
                                        <td className={`ctf-rank ${ctf.rank <= 3 ? 'top-rank' : ''}`}>#{ctf.rank}</td>
                                        <td className="ctf-points">{ctf.points}</td>
                                        <td className="ctf-rating">{ctf.rating}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Rankings;
