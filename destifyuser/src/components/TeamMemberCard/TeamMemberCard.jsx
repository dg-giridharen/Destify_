import React from 'react';
import './TeamMemberCard.css';

const TeamMemberCard = ({ name, title, image }) => {
  return (
    <div className="team-member-card">
      <img src={image} alt={name} className="team-member-image" />
      <h4 className="team-member-name">{name}</h4>
      <p className="team-member-title">{title}</p>
    </div>
  );
};

export default TeamMemberCard;