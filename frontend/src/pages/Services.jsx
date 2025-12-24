import React, { useEffect, useState } from 'react';
import SectionContainer from '../components/SectionContainer';
import { getServices } from '../services/api';
import { useTranslation } from 'react-i18next';
import { serviceImages } from '../assets/services';

const Services = () => {
  const [services, setServices] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    getServices()
      .then((res) => {
        console.log('SERVICES:', res.data);
        setServices(res.data);
      })
      .catch((err) => console.error('SERVICE ERROR:', err));
  }, []);

  return (
    <SectionContainer
      title={t('services.title')}
      subtitle={t('services.subtitle')}
    >
      <div className="card-grid">
        {services.map((service) => (
          <div key={service.id} className="card">
            {/* IMAGE */}
            <img
              src={serviceImages[service.id]}
              alt={service.name}
              style={{
                width: '100%',
                height: 160,
                objectFit: 'cover',
                borderRadius: '0.75rem',
                marginBottom: '0.75rem',
              }}
            />

            <div className="card-title">{service.name}</div>
            <div className="card-text">{service.description}</div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default Services;
