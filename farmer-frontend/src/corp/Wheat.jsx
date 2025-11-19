import { FaLeaf, FaGlobe, FaTint, FaFlask, FaSeedling, FaPhoneAlt, FaChartBar, FaCloudSunRain, FaTractor } from "react-icons/fa";

export default function CropDetails() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <header className="text-center mb-16">
        <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
          <FaTractor className="text-5xl text-green-700" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">Wheat Farming Guide</h1>
        <p className="mt-2 text-gray-700 max-w-3xl mx-auto text-lg">
          Complete guidance for farmers to grow wheat more effectively with modern practices and scientific approaches.
        </p>
      </header>

      {/* Info Sections */}
      <div className="max-w-6xl mx-auto space-y-16">
        
       {/* 1. Season */}
        <div className="bg-white p-10 h-[500px] shadow-lg flex flex-col md:flex-row items-center md:gap-16 gap-8 hover:shadow-xl transition-shadow duration-300">
          {/* Image + shadow cube */}
          <div className="relative w-full md:w-2/5">
            {/* Shadow cube */}
            <div
              className="
                absolute -left-6 -bottom-6
                w-full h-full
                bg-green-400
                shadow-2xl
              "
              aria-hidden="true"
            />

            {/* Main image */}
            <img
              src="/src/assets/pp.jpg"
              alt="Season Farming"
              className="relative w-full h-72 object-cover shadow-lg"
            />
          </div>

          {/* Text */}
          <div className="w-full md:w-3/5 md:ml-6">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 mr-4">
                <FaLeaf className="text-2xl text-green-700" />
              </div>
              <h2 className="text-2xl font-semibold text-green-800">
                Optimal Season for Wheat Cultivation
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              Wheat is typically grown in the Rabi season (winter season) from October to December, with harvesting 
              occurring between February and April. The ideal temperature for wheat cultivation is between 20-25°C 
              during growth and slightly higher during maturation.
            </p>
          </div>
        </div>


        {/* 2. Land Condition */}
        <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col md:flex-row-reverse items-center gap-8 hover:shadow-xl transition-shadow duration-300">
          <div className="w-full md:w-2/5">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
              alt="Land Condition"
              className="w-full object-cover h-64 shadow-md"
            />
          </div>
          <div className="w-full md:w-3/5">
            <div className="flex items-center mb-4">
              <div className="bg-amber-100 p-3 rounded-full mr-4">
                <FaGlobe className="text-2xl text-amber-700" />
              </div>
              <h2 className="text-2xl font-semibold text-green-800">Ideal Land Conditions</h2>
            </div>
            <p className="text-gray-700 mb-4">
              Wheat grows best in well-drained loamy soil with a pH between 6.0 and 7.5.
            </p>
          </div>
        </div>

        {/* 3. Water */}
        <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-8 hover:shadow-xl transition-shadow duration-300">
          <div className="w-full md:w-2/5">
            <img
              src="https://images.unsplash.com/photo-1524593166156-312f362cada5"
              alt="Water Irrigation"
              className="w-full rounded-2xl object-cover h-64 shadow-md"
            />
          </div>
          <div className="w-full md:w-3/5">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <FaTint className="text-2xl text-blue-700" />
              </div>
              <h2 className="text-2xl font-semibold text-green-800">Water Management</h2>
            </div>
            <p className="text-gray-700 mb-4">
              Wheat requires about 4-6 irrigations depending on soil type and climate.
            </p>
          </div>
        </div>

        {/* 4. Fertilizer */}
        <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col md:flex-row-reverse items-center gap-8 hover:shadow-xl transition-shadow duration-300">
          <div className="w-full md:w-2/5">
            <img
              src="https://images.unsplash.com/photo-1603366906539-1f7e9c59a0a7"
              alt="Fertilizer"
              className="w-full rounded-2xl object-cover h-64 shadow-md"
            />
          </div>
          <div className="w-full md:w-3/5">
            <div className="flex items-center mb-4">
              <div className="bg-amber-100 p-3 rounded-full mr-4">
                <FaSeedling className="text-2xl text-amber-700" />
              </div>
              <h2 className="text-2xl font-semibold text-green-800">Fertilizer Application</h2>
            </div>
          </div>
        </div>

        {/* 5. Medicine */}
        <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-8 hover:shadow-xl transition-shadow duration-300">
          <div className="w-full md:w-2/5">
            <img
              src="https://images.unsplash.com/photo-1587654780291-d4d38d6f3d23"
              alt="Crop Medicine"
              className="w-full rounded-2xl object-cover h-64 shadow-md"
            />
          </div>
          <div className="w-full md:w-3/5">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <FaFlask className="text-2xl text-red-700" />
              </div>
              <h2 className="text-2xl font-semibold text-green-800">Disease & Pest Management</h2>
            </div>
          </div>
        </div>

        {/* 6. Seeds */}
        <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col md:flex-row-reverse items-center gap-8 hover:shadow-xl transition-shadow duration-300">
          <div className="w-full md:w-2/5">
            <img
              src="https://images.unsplash.com/photo-1568605114967-8130f3a36994"
              alt="Seeds"
              className="w-full rounded-2xl object-cover h-64 shadow-md"
            />
          </div>
          <div className="w-full md:w-3/5">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <FaSeedling className="text-2xl text-yellow-700" />
              </div>
              <h2 className="text-2xl font-semibold text-green-800">Seed Selection & Treatment</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="max-w-6xl mx-auto mt-20 bg-green-800 text-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Need More Specific Advice?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-700 p-6 rounded-lg text-center">
            <FaPhoneAlt className="text-3xl mb-3 mx-auto" />
            <h3 className="font-semibold mb-2">Expert Helpline</h3>
            <p className="text-green-100">Connect with agricultural experts for personalized guidance</p>
          </div>
          <div className="bg-green-700 p-6 rounded-lg text-center">
            <FaChartBar className="text-3xl mb-3 mx-auto" />
            <h3 className="font-semibold mb-2">Soil Testing</h3>
            <p className="text-green-100">Get your soil tested for precise fertilizer recommendations</p>
          </div>
          <div className="bg-green-700 p-6 rounded-lg text-center">
            <FaCloudSunRain className="text-3xl mb-3 mx-auto" />
            <h3 className="font-semibold mb-2">Weather Advisory</h3>
            <p className="text-green-100">Receive localized weather forecasts for better planning</p>
          </div>
        </div>
      </div>
    </div>
  );
}
