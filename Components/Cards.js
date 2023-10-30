import React from 'react';
import './Cards.css';

function Card({ title, src }) {
    return (
        <div className="card">
            <img src={src} alt={title} />
            <div className="card-content">
                <p className="card-title">{title}</p>
            </div>
        </div>
    );
}

export default Card;
