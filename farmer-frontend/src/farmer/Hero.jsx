import React from 'react'

function Hero() {
  return (
    <div>
      <section className="relative h-[500px] w-full overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="src/assets/ff.mp4"   // 👉 replace with your farm video path
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold">Welcome to Smart Farming</h1>
        <p className="mt-4 max-w-xl text-lg md:text-xl">
          Modern solutions for farmers to grow smarter and better.
        </p>
        <div className="mt-6 flex gap-4">
          <button className="px-6 py-3 bg-green-600  shadow-md hover:bg-green-700">
            Get Started
          </button>
          <button className="px-6 py-3 bg-white text-green-700  shadow-md hover:bg-gray-100">
            Learn More
          </button>
        </div>
      </div>
    </section>
    </div>
  )
}

export default Hero



