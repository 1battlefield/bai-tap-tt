import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="hero">
      <div className="container hero-inner">

        <div>
          {/* ⭐ Badge */}
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            <span>{t('hero.badge')}</span>
          </div>

          {/* ⭐ Title */}
          <h1 className="hero-title">{t('hero.title')}</h1>

          {/* ⭐ Subtitle */}
          <p className="hero-subtitle">{t('hero.subtitle')}</p>

          {/* ⭐ Buttons */}
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => navigate('/contact')}>
              {t('hero.contactButton')}
            </button>
            <button className="btn btn-outline" onClick={() => navigate('/services')}>
              {t('hero.servicesButton')}
            </button>
          </div>
        </div>

        {/* ⭐ HERO RIGHT CARD */}
        <div className="hero-card">
          <p
            style={{
              fontSize: '0.85rem',
              color: '#6b7280',
              marginBottom: '0.75rem'
            }}
          >
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '0.8rem'
            }}
          >
             </div>

           <div className="hero-card">
  <div className="hero-card-corners">
    <div className="corner top-left">
      <div className="card-title">{t('hero.card.stat1.value')}</div>
      <div className="card-text">{t('hero.card.stat1.text')}</div>
    </div>

    <div className="corner top-right">
      <div className="card-title">{t('hero.card.stat2.value')}</div>
      <div className="card-text">{t('hero.card.stat2.text')}</div>
    </div>

    <div className="corner bottom-left">
      <div className="card-title">{t('hero.card.stat3.value')}</div>
      <div className="card-text">{t('hero.card.stat3.text')}</div>
    </div>

    <div className="corner bottom-right">
      <div className="card-title">{t('hero.card.stat4.value')}</div>
      <div className="card-text">{t('hero.card.stat4.text')}</div>
    </div>
  </div>
</div>
          </div>
      </div>
    </section>
  );
};

export default Hero;
