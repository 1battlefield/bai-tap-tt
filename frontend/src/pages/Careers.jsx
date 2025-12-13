import React, { useEffect, useState } from 'react';
import SectionContainer from '../components/SectionContainer';
import { getJobs } from '../services/api';
import { useTranslation } from 'react-i18next';

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    getJobs()
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <SectionContainer
      title={t("careers.title")}
      subtitle={t("careers.subtitle")}
    >
      <div className="card-grid">
        {jobs.length === 0 && (
          <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
            {t("careers.noJobs")}
          </p>
        )}

        {jobs.map((job) => (
          <div key={job.id} className="card">
            <div className="card-title">{job.title}</div>

            <div className="card-meta">
              {job.location || t("careers.remote")}
              {job.salary ? ` • ${job.salary}` : ""}
            </div>

            <div className="card-text" style={{ marginBottom: "0.5rem" }}>
              {job.description}
            </div>

            {job.requirements && (
              <div style={{ fontSize: "0.85rem", color: "#4b5563" }}>
                <strong>{t("careers.requirements")}:</strong> {job.requirements}
              </div>
            )}

            <button className="btn btn-outline" style={{ marginTop: "0.6rem" }}>
              {t("careers.apply")}
            </button>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default Careers;
