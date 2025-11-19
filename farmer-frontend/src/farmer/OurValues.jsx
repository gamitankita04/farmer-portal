import React from "react";
import { GiPlantWatering, GiFarmTractor, GiFruitBowl } from "react-icons/gi";

export default function OurValues() {
  const values = [
    {
      icon: <GiPlantWatering className="text-green-500 text-5xl mx-auto mb-4" />,
      title: "Sustainability",
      desc: "Promoting eco-friendly farming practices for future generations.",
    },
    {
      icon: <GiFarmTractor className="text-green-500 text-5xl mx-auto mb-4" />,
      title: "Innovation",
      desc: "Bringing modern technology and solutions to everyday farming.",
    },
    {
      icon: <GiFruitBowl className="text-green-500 text-5xl mx-auto mb-4" />,
      title: "Community",
      desc: "Building strong connections among farmers, experts, and markets.",
    },
  ];

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1600&auto=format&fit=crop"
          alt="Farm background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-900 bg-opacity-30"></div> {/* Overlay for readability */}
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-10">
          Our Values
        </h2>

        {/* Scroll Container */}
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-scroll gap-8 px-6 ">
            {[...values, ...values, ...values].map((val, idx) => (
              <div
                key={idx}
                className="bg-white/90 p-6  shadow-md hover:shadow-lg transition w-80 flex-shrink-0 text-center"
              >
                {val.icon}
                <h3 className="text-xl font-semibold mb-2 text-green-800">{val.title}</h3>
                <p className="text-gray-700">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tailwind Custom Animation */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-scroll {
          animation: scroll 18s linear infinite;
        }
      `}</style>
    </section>
  );
}
