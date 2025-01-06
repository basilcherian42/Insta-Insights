import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import "./styles.css";

const FlipCard = ({ click,link, name, description, gifUrl }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="car-card">
            <ReactCardFlip
                isFlipped={isFlipped}
                flipDirection="vertical"
            >
                {/* Front side */}
                <div
                className="card-front"
                onClick={handleClick}
                style={{
                    cursor: "pointer",
                }}
                >
                <div className="front-content">
                    <h2>{name}</h2>
                    <p>{link}</p>
                    <div className="description">
                    <p>{description}</p>
                    <p>{click}</p>
                    </div>
                </div>
            </div>
        {/* Back side */}
        <div className="card-back" onClick={handleClick}>
          <img src={gifUrl} alt={`${name}-gif`} />
        </div>
        </ReactCardFlip>
    </div>
  );
};

export default FlipCard;