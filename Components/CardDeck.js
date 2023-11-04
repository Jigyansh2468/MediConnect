import React from 'react'
import Link from 'next/link';
import Card from './Cards';

function CardDeck() {
    return (
        <>
            <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-20 mt-10 px-4 sm:px-10 md:px-16 lg:px-20 xl:px-24 justify-around">
                <Link href="/FindDoctor">
                    <Card
                        title="Find Doctor"
                        SRC="/FindDoctor.jpg"
                    />
                </Link>
                <Link href="/VideoConsultation">
                    <Card
                        title="Video Consultation"
                        SRC="/VideoConsultation.jpg"
                    />
                </Link>
                <Link href="/FindDoctor">
                    <Card
                        title="Book Appointmnet"
                        SRC="/BookAppointment.jpg"
                    />
                </Link>
            </div>
        </>
    )
}

export default CardDeck