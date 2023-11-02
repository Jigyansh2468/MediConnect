import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Slidbar() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="slider-container">
      <Slider {...settings} className='mb-10'>
        <div>
          <img src="/Specialization/Psychiatrist.jpg" alt="Card 1" />
          <p className='font-bold text-center'>Psychiatrist</p>
        </div>
        <div>
          <img src="/Specialization/Neurologist.jpg" alt="Card 2" />
          <p className='font-bold text-center'>Neurologist</p>
        </div>
        <div>
          <img src="/Specialization/Cardiologist.jpg" alt="Card 2" className='max-w-full max-h-full' />
          <p className='font-bold text-center'>Cardiologist</p>
        </div>
        <div>
          <img src="/Specialization/Surgeon.jpg" alt="Card 3" />
          <p className='font-bold text-center'>Surgeon</p>
        </div>
        <div>
          <img src="/Specialization/Dentist.jpg" alt="Card 3" />
          <p className='font-bold text-center'>Dentist</p>
        </div>
        <div>
          <img src="/Specialization/Dermatologist.jpg" alt="Card 3" />
          <p className='font-bold text-center'>Dermatology</p>
        </div>
        {/* Add more card items as needed */}
      </Slider>
    </div>
  );
}

export default Slidbar;
