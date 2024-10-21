// import video1 from "../assets/video1.mp4";
// import video2 from "../assets/video2.mp4";

// import video1 from "../public/video1.mp4";
// import video2 from "../public/video2.mp4";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center ">
      <div className="flex flex-col items-center mt-6 lg:mt-20">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
          MediConnect is Here
          <br />
          <span className="bg-gradient-to-r from-green-500 to-blue-800 text-transparent bg-clip-text">
            {" "}
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
          <a
            href="/"
            className="bg-gradient-to-r from-green-400 to-green-600 py-3 px-4 mx-3 rounded-md text-white"
          >
            Start a Consultation
          </a>
          <a
            href="/"
            className="bg-gradient-to-r from-blue-400 to-blue-600 py-3 px-4 mx-3 rounded-md text-white"
          >
            About Us
          </a>
        </div>
      </div>
      <div className="flex mt-10 justify-center">
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
        >
          <source src='/video1.mp4' type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
        >
          <source src='/video2.mp4' type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default HeroSection;
