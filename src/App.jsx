import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Writeups from './pages/Writeups';
import WriteupDetail from './pages/WriteupDetail';
import Rankings from './pages/Rankings';
import Blogs from './pages/Blogs';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Editor from './pages/admin/Editor';
import ProtectedRoute from './components/ProtectedRoute';
import ParticleBackground from './components/ParticleBackground';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/writeups" element={<Writeups />} />
        <Route path="/writeups/:id" element={<WriteupDetail />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/rankings" element={<Rankings />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/editor/:id" element={
          <ProtectedRoute>
            <Editor />
          </ProtectedRoute>
        } />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <Router>
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
        <div className="scanlines" />
        <ParticleBackground />

        {/* Custom Cursor */}
        <div
          className="cursor-dot"
          style={{ left: cursorPosition.x, top: cursorPosition.y }}
        />
        <div
          className="cursor-outline"
          style={{ left: cursorPosition.x, top: cursorPosition.y }}
        />

        <Navbar />
        <main className="main-content" style={{ flex: 1, position: 'relative', zIndex: 1 }}>
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
