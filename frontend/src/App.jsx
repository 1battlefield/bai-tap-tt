import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Team from './pages/Team';
import Careers from './pages/Careers';
import Contact from './pages/Contact';

import './i18n';
import { useTranslation } from 'react-i18next';

const App = () => {
  const { i18n } = useTranslation();

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="app">

      {/* Nút đổi ngôn ngữ */}
      <div style={{ textAlign: "right", padding: "10px 20px" }}>
        <button onClick={() => changeLang("vi")}>🇻🇳 VN</button>
        <button onClick={() => changeLang("en")}>🇺🇸 EN</button>
      </div>

      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/team" element={<Team />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;

