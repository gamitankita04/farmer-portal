import React from "react";
import { FaSeedling, FaTractor, FaTint, FaShoppingBasket } from "react-icons/fa";

export default function HowWeHelp() {
  const services = [
    {
      icon: <FaSeedling className="text-green-700 text-3xl" />,
      title: "Crop Guidance",
      desc: "Know which crops are best suited for your soil and season.",
    },
    {
      icon: <FaTractor className="text-green-700 text-3xl" />,
      title: "Modern Machinery",
      desc: "Access modern tools and machinery for efficient farming.",
    },
    {
      icon: <FaTint className="text-green-700 text-3xl" />,
      title: "Water Management",
      desc: "Get advice on irrigation and optimal water usage.",
    },
    {
      icon: <FaShoppingBasket className="text-green-700 text-3xl" />,
      title: "Market Access",
      desc: "Connect directly with buyers to get fair prices for your crops.",
    },
  ];

  return (
    <section className="py-20 bg-green-100 text-green-900">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Title */}
        <h2 className="text-4xl md:text-4xl font-bold text-center mb-12 tracking-tight text-green-900">
          How We Help Farmers
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left: Text & Features */}
          <div className="space-y-6">
            <p className="text-green-800 text-lg leading-relaxed">
              Our platform empowers farmers with knowledge, tools, and access to resources
              that enhance productivity, save water, and connect them directly to the market.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mt-6">
              {services.map((service, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-white p-4 shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
                >
                  <div className="flex-shrink-0">{service.icon}</div>
                  <div>
                    <h3 className="font-semibold text-green-900 text-lg">{service.title}</h3>
                    <p className="text-green-700 text-sm mt-1">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative  overflow-hidden shadow-xl">
            <img
              src="https://images.pexels.com/photos/2252618/pexels-photo-2252618.jpeg"
              alt="Farmers working in the field"
              className="w-full h-[420px] object-cover transform hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-green-900/20"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
