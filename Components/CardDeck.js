import React from 'react'
import Link from 'next/link';
import Card from './Cards';
import BookAppointment from './BookAppointment';
import Image from 'next/image'

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
                <Link href={{
                    pathname: '/FindDoctor',
                    query: { data: 'fromhome' },
                }}>
                    <div className='flex flex-col justify-center items-center py-10'>
                        <div className="card">
                            <Image src='/BookAppointment.jpg' alt="LOGO" width={800} height={700} />
                        </div>
                        <p className="card-title">BookAppointment</p>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default CardDeck