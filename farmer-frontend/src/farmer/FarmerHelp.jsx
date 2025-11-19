import React from "react";
import {
  GiPlantWatering,
  GiFarmTractor,
  GiFertilizerBag,
  GiMedicines,
  GiSeedling,
  
 
} from "react-icons/gi";

function FarmerHelp() {
  const features = [
    {
      title: "Season",
      desc: "Farmers often lose crops due to lack of seasonal knowledge. We provide guidance on which crops to grow in each season.",
      icon: <GiFarmTractor className="text-green-600 text-5xl mx-auto mb-4" />,
    },
    {
      title: "Land Condition",
      desc: "Continuous farming makes land less fertile. We suggest techniques to restore soil health for better productivity.",
      icon: <GiFarmTractor className="text-green-600 text-5xl mx-auto mb-4" />,
    },
    {
      title: "Water",
      desc: "We guide farmers on when and how much water to give, ensuring crops grow healthier and saving resources.",
      icon: <GiPlantWatering className="text-green-600 text-5xl mx-auto mb-4" />,
    },
    {
      title: "Fertilizer",
      desc: "Fertilizers improve soil fertility and help crops grow stronger. We suggest the right fertilizers for each crop.",
      icon: <GiFertilizerBag className="text-green-600 text-5xl mx-auto mb-4" />,
    },
    {
      title: "Medicine",
      desc: "Bad weather and insects can damage crops. We provide solutions and crop protection methods to avoid losses.",
      icon: <GiMedicines className="text-green-600 text-5xl mx-auto mb-4" />,
    },
    {
      title: "Seeds",
      desc: "We guide farmers with information about quality seeds that improve yield and reduce crop failure.",
      icon: <GiSeedling className="text-green-600 text-5xl mx-auto mb-4" />,
    },
  ];

  return (
    <section className="bg-green-200 py-16 px-6 ">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-12">
        what we offer to Farmers
      </h2>
      <div className="container mx-auto grid md:grid-cols-3 gap-8">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 shadow-md hover:shadow-lg transition text-center"
          >
            {item.icon}
            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FarmerHelp;
