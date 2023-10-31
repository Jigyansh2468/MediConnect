import React from 'react';
import './Cards.css';
import Image from 'next/image';
const Card = ({ title, SRC }) => {
    return (
        <>
            <div className='flex flex-col justify-center items-center'>
                <div className="card">
                    <Image src={SRC} alt="LOGO" width={400} height={400} />
                </div>
                <p className="card-title">{title}</p>
            </div>
        </>
    );
}

export default Card;
