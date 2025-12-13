import React, { useEffect, useState } from 'react';
import SectionContainer from '../components/SectionContainer';
import { getProjects } from '../services/api';
import { useTranslation } from 'react-i18next';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    getProjects()
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <SectionContainer
      title={t("projects.title")}
      subtitle={t("projects.subtitle")}
    >
      <div className="card-grid">
        {projects.length === 0 && (
          <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
            {t("projects.empty")}
          </p>
        )}

        {projects.map((project) => (
          <div key={project.id} className="card">
            <div className="card-title">{project.name}</div>

            <div className="card-meta">
              {project.client || t("projects.clientNDA")} •{" "}
              {(project.start_date && project.start_date.substring(0, 10)) ||
                t("projects.unknownDate")}
            </div>

            <div className="card-text" style={{ marginBottom: '0.6rem' }}>
              {project.description}
            </div>

            {project.image_url && (
              <div
                style={{
                  fontSize: '0.8rem',
                  color: '#9ca3af'
                }}
              >
                {t("projects.asset")}: {project.image_url}
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default Projects;
