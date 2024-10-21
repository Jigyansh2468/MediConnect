import React from 'react';
import './Cards.css';
import Image from 'next/image';
const Card = ({ title, SRC }) => {
    return (
        <>
            <div className='flex flex-col justify-center items-center py-10'>
                <div className="card">
                    <Image src={SRC} alt="LOGO" width={800} height={700} />
                </div>
                <p className="card-title">{title}</p>
            </div>
        </>
    );
}

export default Card;
