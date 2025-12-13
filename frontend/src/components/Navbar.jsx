import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const navLinkClass = ({ isActive }) =>
    'nav-link ' + (isActive ? 'nav-link-active' : '');

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <header className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        1 Battlefield
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <nav className="nav-links">
          <NavLink to="/" className={navLinkClass} end>{t("navbar.home")}</NavLink>
          <NavLink to="/about" className={navLinkClass}>{t("navbar.about")}</NavLink>
          <NavLink to="/services" className={navLinkClass}>{t("navbar.services")}</NavLink>
          <NavLink to="/projects" className={navLinkClass}>{t("navbar.projects")}</NavLink>
          <NavLink to="/team" className={navLinkClass}>{t("navbar.team")}</NavLink>
          <NavLink to="/careers" className={navLinkClass}>{t("navbar.careers")}</NavLink>
          <NavLink to="/contact" className={navLinkClass}>{t("navbar.contact")}</NavLink>
         </nav>
        <div className="lang-switch">
          <button onClick={() => changeLang('vi')} className="lang-btn">VI</button>
          <button onClick={() => changeLang('en')} className="lang-btn">EN</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
