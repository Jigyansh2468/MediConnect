import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Slidbar() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="slider-container w-auto">
      <Slider {...settings} className='mb-10'>
        <div className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10">
          <img src="/Specialization/Psychiatrist.jpg" alt="Card 1" className="w-100" />
          <p className='font-bold text-center'>Psychiatrist</p>
        </div>
        <div className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10">
          <img src="/Specialization/Neurologist.jpg" alt="Card 2" className="w-100" />
          <p className='font-bold text-center'>Neurologist</p>
        </div>
        <div className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10">
          <img src="/Specialization/Cardiologist.jpg" alt="Card 2" className="w-100" />
          <p className='font-bold text-center'>Cardiologist</p>
        </div>
        <div className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10">
          <img src="/Specialization/Surgeon.jpg" alt="Card 3" className="w-100" />
          <p className='font-bold text-center'>Surgeon</p>
        </div>
        <div className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10">
          <img src="/Specialization/Dentist.jpg" alt="Card 3" className="w-100" />
          <p className='font-bold text-center'>Dentist</p>
        </div>
        <div className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10">
          <img src="/Specialization/Dermatologist.jpg" alt="Card 3" className="w-100" />
          <p className='font-bold text-center'>Dermatology</p>
        </div>
      </Slider>
    </div>
  );
}

export default Slidbar;
