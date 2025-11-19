import React from "react";

export default function GoodForFarmers() {
  const benefits = [
    "Better crop planning based on season and soil conditions",
    "Save resources like water, fertilizer, and time",
    "Increase productivity and boost income with modern methods",
    "Easily connect with markets and get better prices",
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-green-100 via-green-50 to-green-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Centered Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-12 text-center">
          Good for Farmers
        </h2>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Big Image */}
          <div>
            <img
              src="https://images.pexels.com/photos/1084540/pexels-photo-1084540.jpeg"
              alt="Farmers working in the field"
              className="w-full h-[420px] object-cover shadow-2xl border-4 border-white"
            />
          </div>

          {/* Right: Description */}
          <div className="bg-white/80 backdrop-blur-md p-8 shadow-lg">
            <p className="text-gray-700 mb-6">
              Our platform empowers farmers with the right tools and knowledge to
              improve yield, save resources, and connect directly with markets.
            </p>

            <ul className="space-y-4">
              {benefits.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-green-600 text-xl">✔</span>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
