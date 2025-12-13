import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import SectionContainer from '../components/SectionContainer';
import { getServices, getProjects } from '../services/api';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getServices()
      .then((res) => setServices(res.data.slice(0, 3)))
      .catch(() => {});

    getProjects()
      .then((res) => setProjects(res.data.slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <>
      <Hero />

      {/* --- SERVICES SECTION --- */}
      <SectionContainer
        title={t("home.services.title")}
        subtitle={t("home.services.subtitle")}
      >
        <div className="card-grid">
          {services.length === 0 && (
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
              {t("home.services.empty")}
            </p>
          )}
          {services.map((service) => (
            <div key={service.id} className="card">
              <div className="chip" style={{ marginBottom: '0.6rem' }}>
                {service.icon || t("home.services.default_icon")}
              </div>
              <div className="card-title">{service.name}</div>
              <div className="card-text">{service.description}</div>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* --- PROJECTS SECTION --- */}
      <SectionContainer
        title={t("home.projects.title")}
        subtitle={t("home.projects.subtitle")}
      >
        <div className="card-grid">
          {projects.length === 0 && (
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
              {t("home.projects.empty")}
            </p>
          )}
          {projects.map((project) => (
            <div key={project.id} className="card">
              <div className="card-title">{project.name}</div>
              <div className="card-meta">
                {project.client || t("home.projects.client_nda")}
              </div>
              <div className="card-text">{project.description}</div>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* --- TESTIMONIALS SECTION --- */}
      <SectionContainer
        title={t("home.testimonials.title")}
        subtitle={t("home.testimonials.subtitle")}
      >
        <div className="card-grid">
          <div className="card">
            <div className="card-text">{t("home.testimonials.item1.text")}</div>
            <div className="card-meta">{t("home.testimonials.item1.meta")}</div>
          </div>

          <div className="card">
            <div className="card-text">{t("home.testimonials.item2.text")}</div>
            <div className="card-meta">{t("home.testimonials.item2.meta")}</div>
          </div>
        </div>
      </SectionContainer>
    </>
  );
};

export default Home;
