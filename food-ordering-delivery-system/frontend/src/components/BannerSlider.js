import React, { useState, useEffect } from "react";

const slides = [
  {
    img: "/images/banner1.jpg",
    
  },
  {
    img: "/images/banner2.jpg",
   
  },
  {
    img: "/images/banner3.jpg",
   
  },
];

export default function BannerSlider() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setIdx((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(iv);
  }, []);

  const { img, title, subtitle, btnText } = slides[idx];

  return (
    <div className="relative h-96 rounded-lg overflow-hidden">
      <img
        src={img}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-16 bg-black bg-opacity-30 text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-2">{title}</h1>
        <p className="mb-4 max-w-lg">{subtitle}</p>
        
      </div>
      {/* dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              i === idx ? "bg-orange-500" : "bg-white"
            }`}
            onClick={() => setIdx(i)}
          />
        ))}
      </div>
    </div>
  );
}
