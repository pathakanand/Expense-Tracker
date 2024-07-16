import React from 'react';

const Card = ({ title, value, buttonText, onClick }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{value}</p>
      <button onClick={onClick}>{buttonText}</button>
    </div>
  );
};

export default Card;
