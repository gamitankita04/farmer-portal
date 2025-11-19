import React from "react";
import { GiPlantWatering, GiFarmTractor, GiFruitBowl } from "react-icons/gi";
import FarmerHelp from "./FarmerHelp";
import GoodForFarmers from "./GoodForFarmers";

function About() {
  return (
    <div className="w-full">
      
<section className="relative w-full h-[70vh] flex items-center justify-center text-center">
  {/* Background Video */}
  <video
    className="absolute top-0 left-0 w-full h-full object-cover"
    autoPlay
    loop
    muted
    playsInline
  >
    <source
      src="src/assets/f2.mp4" // replace with your farming video URL
      type="video/mp4"
    />
    Your browser does not support the video tag.
  </video>

  {/* Overlay */}
  <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

  {/* Text Content */}
  <div className="relative z-10 text-white px-6">
    <h1 className="text-4xl md:text-5xl font-bold mb-4">
      About Farmer Portal
    </h1>
    <p className="text-lg max-w-3xl mx-auto">
      Farmer Portal is built to empower farmers with knowledge, tools, and
      resources to improve productivity, sustainability, and profits.
    </p>
  </div>
</section>


      {/* Mission Section */}
      <section className="container mx-auto py-12 px-10 grid md:grid-cols-2 gap-10 items-center bg-green-100">
        <div>
          <h2 className="text-3xl font-bold text-green-600 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to support farmers by providing updated information
            about crops, weather, soil health, and best farming practices. We
            connect farmers with modern solutions while respecting traditional
            wisdom.
          </p>
        </div>
        <div className="flex justify-center">
           {/* Shadow cube */}
            
          <img
            src="src/assets/p1 (4).jpg"
            alt="Farmer in field"
            className="relative w-full h-72 object-cover shadow-lg"
          />
        </div>
      </section>

     

      <section>
        <FarmerHelp />
      </section>
      <section>
        <GoodForFarmers/>
      </section>
      
    </div>
  );
}

export default About;
