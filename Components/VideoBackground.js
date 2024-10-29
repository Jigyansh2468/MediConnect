'use client'
import { useEffect, useState } from 'react';

const VideoBackground = ({ src, className }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className={className}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default VideoBackground; 