import React from 'react';
import SectionContainer from '../components/SectionContainer';
import { useTranslation } from 'react-i18next';
import { aboutImages } from '../assets/about/aboutImages';

const About = () => {
  const { t } = useTranslation();

  return (
    <>
      <SectionContainer
        title={t("about.title")}
        subtitle={t("about.subtitle")}
      >
        {/* Text + Core values */}
        <div className="two-column">
          <div>
            <p className="card-text" style={{ marginBottom: "1rem" }}>
              {t("about.p1")}
            </p>

            <p className="card-text" style={{ marginBottom: "1rem" }}>
              {t("about.p2")}
            </p>

            <p className="card-text">
              {t("about.p3")}
            </p>
          </div>

          <div>
            <div className="card">
              <div className="card-title">
                {t("about.coreValuesTitle")}
              </div>

              <ul
                style={{
                  paddingLeft: "1.1rem",
                  fontSize: "0.9rem",
                  color: "#4b5563",
                }}
              >
                <li>{t("about.values.v1")}</li>
                <li>{t("about.values.v2")}</li>
                <li>{t("about.values.v3")}</li>
                <li>{t("about.values.v4")}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 6 ảnh giới thiệu */}
        <div className="about-image-grid">
          {aboutImages.map((img, index) => (
            <div key={index} className="about-image-item">
              <img
                src={img}
                alt={`about-${index + 1}`}
              />
            </div>
          ))}
        </div>
      </SectionContainer>
    </>
  );
};

export default About;
