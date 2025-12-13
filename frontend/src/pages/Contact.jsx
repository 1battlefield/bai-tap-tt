import React, { useState } from "react";
import SectionContainer from "../components/SectionContainer";
import { sendContact } from "../services/api";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!form.name || !form.email || !form.message) {
      setStatus({ type: "error", message: t("contact.fillRequired") });
      return;
    }

    try {
      setLoading(true);
      await sendContact(form);
      setStatus({ type: "success", message: t("contact.success") });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: t("contact.error") });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionContainer
      title={t("contact.title")}
      subtitle={t("contact.subtitle")}
    >
      <div className="two-column">
        <div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-control">
                <label className="form-label">
                  {t("contact.name")} <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  className="form-input"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t("contact.namePlaceholder")}
                />
              </div>
              <div className="form-control">
                <label className="form-label">
                  {t("contact.email")} <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  className="form-input"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t("contact.emailPlaceholder")}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="form-label">{t("contact.phone")}</label>
              <input
                className="form-input"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder={t("contact.phonePlaceholder")}
              />
            </div>

            <div className="form-control">
              <label className="form-label">
                {t("contact.message")} <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <textarea
                className="form-textarea"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder={t("contact.messagePlaceholder")}
              />
            </div>

            {status.message && (
              <div
                style={{
                  fontSize: "0.85rem",
                  color: status.type === "error" ? "#b91c1c" : "#15803d",
                }}
              >
                {status.message}
              </div>
            )}

            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? t("contact.sending") : t("contact.send")}
            </button>
          </form>
        </div>

        <div>
          <div className="card">
            <div className="card-title">{t("contact.office")}</div>
            <div className="card-text">
              12 Nguyen Trai, District 1
              <br />
              Ho Chi Minh City, Vietnam
            </div>
            <div className="card-text" style={{ marginTop: "0.7rem" }}>
              <strong>Email:</strong> hello@novatech.com
              <br />
              <strong>Phone:</strong> +84 90 000 0000
            </div>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <div className="card">
              <div className="card-title">{t("contact.map")}</div>
              <div className="card-text">{t("contact.mapPlaceholder")}</div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Contact;
