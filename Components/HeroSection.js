'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import VideoBackground from './VideoBackground';

const HeroSection = () => {
  const [isClient, setIsClient] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  if (!isClient) {
    // Return a placeholder or loading state
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px]">
        <div className="animate-pulse bg-gray-200 h-8 w-3/4 mb-4"></div>
        <div className="animate-pulse bg-gray-200 h-8 w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center relative">
      <div className="flex flex-col items-center mt-6 lg:mt-20 z-10">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
          MediConnect is Here
          <br />
          <span className="bg-gradient-to-r from-green-500 to-blue-800 text-transparent bg-clip-text">
            for seamless healthcare
          </span>
        </h1>
        <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
          Connect with healthcare professionals from the comfort of your home.
          Our telemedicine platform enables secure video calls, allowing you to
          receive timely consultations, follow-ups, and support. Experience
          healthcare like never before!
        </p>
        <div className="flex justify-center my-10">
          <Link
            href="/FindDoctor"
            className="bg-gradient-to-r from-green-400 to-green-600 py-3 px-4 mx-3 rounded-md text-white hover:opacity-90 transition-opacity"
          >
            Start a Consultation
          </Link>
          <Link
            href="/about"
            className="bg-gradient-to-r from-blue-400 to-blue-600 py-3 px-4 mx-3 rounded-md text-white hover:opacity-90 transition-opacity"
          >
            About Us
          </Link>
        </div>
      </div>
      {isClient && (
        <div className="flex mt-10 justify-center w-full">
          <VideoBackground
            src="/video1.mp4"
            className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 px-2 py-2 my-4"
          />
          <VideoBackground
            src="/video2.mp4"
            className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 px-2 py-2 my-4 mx-2"
          />
        </div>
      )}
    </div>
  );
};

export default HeroSection;
