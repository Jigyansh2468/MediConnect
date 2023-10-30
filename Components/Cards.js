import React from 'react';
import './Cards.css';

function Card({ title, src }) {
    return (
        <>
            <div className='flex flex-col justify-center items-center'>
                <div className="card">
                    <img src={src} alt={title} />
                </div>
                <p className="card-title">{title}</p>
            </div>
        </>
    );
}

export default Card;
