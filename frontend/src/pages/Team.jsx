// src/pages/Team.jsx
import React, { useEffect, useState } from "react";
import SectionContainer from "../components/SectionContainer";
import { getTeamMembers } from "../services/api";
import { useTranslation } from "react-i18next";
import { teamImages } from "../assets/team/index.js"; // sửa đường dẫn

const Team = () => {
  const [team, setTeam] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    getTeamMembers()
      .then((res) => {
        console.log("API DATA:", res.data); // log dữ liệu API
        setTeam(res.data);
      })
      .catch((err) => console.error("API ERROR:", err));
  }, []);

  return (
    <SectionContainer
      title={t("team.title")}
      subtitle={t("team.subtitle")}
    >
      <div className="card-grid">
        {team.length === 0 && (
          <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
            {t("team.empty")}
          </p>
        )}

        {team.map((member) => (
          <div key={member.id} className="card">
            <img
              src={
                member.avatar_url
                  ? member.avatar_url
                  : teamImages[Number(member.id)]
              }
              alt={member.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/team/placeholder.svg";
              }}
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "0.5rem",
              }}
            />
            <div className="card-title">{member.name}</div>
            <div className="card-meta">{member.position}</div>
            <div className="card-text">{member.bio}</div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default Team;
