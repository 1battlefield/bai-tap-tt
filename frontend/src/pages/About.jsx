import React from 'react';
import SectionContainer from '../components/SectionContainer';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  return (
    <>
      <SectionContainer
        title={t("about.title")}
        subtitle={t("about.subtitle")}
      >
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
              <div className="card-title">{t("about.coreValuesTitle")}</div>

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
      </SectionContainer>
    </>
  );
};

export default About;
