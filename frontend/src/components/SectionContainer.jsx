import React from 'react';

const SectionContainer = ({ title, subtitle, children }) => {
  return (
    <section className="section">
      <div className="container">
        {(title || subtitle) && (
          <div className="section-heading">
            {title && <h2 className="section-title">{title}</h2>}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default SectionContainer;
