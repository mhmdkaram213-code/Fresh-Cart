import React from 'react';
import heroImg from '../assets/images/home-slider-1.png';

const Hero = () => {
  return (
    <section className="relative h-[600px] w-full overflow-hidden rounded-[40px] mb-12 shadow-2xl group">
      {/* Background Image */}
      <img
        src={heroImg}
        alt="Fresh Organic Produce"
        className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-[2000ms] group-hover:scale-105"
      />
      
      {/* Premium Green Overlay */}
      <div className="absolute inset-0 bg-green-600/60 backdrop-blur-[1px] flex items-center">
        
        {/* Luxurious Content Container */}
        <div className="max-w-7xl mx-auto w-full py-24 px-12 md:px-20 text-white flex flex-col items-start justify-center">
          
          {/* Elegant Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 mb-10 shadow-lg animate-fade-in-down">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400 shadow-[0_0_10px_rgba(74,222,128,1)]"></span>
            </span>
            <span className="text-xs md:text-sm font-black tracking-[0.2em] uppercase">
              Fresh Organic Produce Delivered to Your Door
            </span>
          </div>

          {/* Majestic Hero Headline */}
          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1] max-w-4xl tracking-tighter drop-shadow-2xl">
            Eat Healthy, <br />
            <span className="text-green-300">Live Better.</span>
          </h1>
          
          {/* High-End Sub-Headline */}
          <p className="text-xl md:text-2xl font-bold text-white/90 mb-12 max-w-2xl leading-relaxed">
            Get <span className="text-white font-black underline decoration-green-300 underline-offset-8 decoration-4">20% off</span> on your first order with code: 
            <span className="ml-4 px-5 py-2 bg-white/15 rounded-2xl border border-white/30 font-mono text-white tracking-[0.3em] shadow-inner">
              FRESH20
            </span>
          </p>

          {/* Action Call for Interaction */}
          <div className="flex items-center gap-6">
            <button className="px-12 py-5 bg-white text-green-900 rounded-2xl font-black text-lg hover:bg-green-50 shadow-2xl hover:-translate-y-1.5 transition-all duration-300 active:scale-95 flex items-center gap-3">
              Shop Now
              <i className="fa-solid fa-arrow-right text-sm"></i>
            </button>
            
            <button className="px-10 py-5 bg-transparent border-2 border-white/50 text-white rounded-2xl font-black text-lg hover:bg-white/10 hover:border-white transition-all duration-300 active:scale-95">
              View Deals
            </button>
          </div>

        </div>
      </div>

      {/* Modern Slider Indicators (Indicator Circles) */}
      <div className="absolute bottom-12 right-12 flex gap-4">
        {[1, 2, 3].map((_, i) => (
          <div 
            key={i} 
            className={`h-4 rounded-full transition-all duration-500 cursor-pointer ${i === 0 ? 'w-12 bg-white' : 'w-4 bg-white/30 hover:bg-white/50'}`}
          ></div>
        ))}
      </div>

    </section>
  );
};

export default Hero;
