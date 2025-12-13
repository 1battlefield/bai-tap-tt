import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          © {new Date().getFullYear()} 1 Battlefield. {t("footer.rights")}
        </div>

        <div className="footer-links">
          <a href="#!">{t("footer.facebook")}</a>
          <a href="#!">{t("footer.linkedin")}</a>
          <a href="#!">{t("footer.github")}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
