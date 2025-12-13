import React, { useEffect, useState } from 'react';
import SectionContainer from '../components/SectionContainer';
import { getServices } from '../services/api';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const [services, setServices] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    getServices()
      .then((res) => setServices(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <SectionContainer
      title={t("services.title")}
      subtitle={t("services.subtitle")}
    >
      <div className="card-grid">
        {services.length === 0 && (
          <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
            {t("services.empty")}
          </p>
        )}

        {services.map((service) => (
          <div key={service.id} className="card">
            <div className="chip" style={{ marginBottom: '0.6rem' }}>
              {service.icon || t("services.defaultIcon")}
            </div>
            <div className="card-title">{service.name}</div>
            <div className="card-text">{service.description}</div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default Services;
