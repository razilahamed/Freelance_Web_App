import React from "react";
import "./ProfileCard.scss";

function ProfileCard({ card }) {
  return (
    <div className="profileCard">
      <img src={card.img} alt="" />
      <div className="info">
        <img src={card.pp} alt="" />
        <div className="texts">
          <h2>{card.cat}</h2>
          <span>{card.username}</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
