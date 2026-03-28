import React from 'react';

const About = () => {
  const values = [
    {
      icon: 'fa-leaf',
      title: '100% Organic',
      desc: 'We source only the finest organic produce from local certified farmers.',
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: 'fa-bolt',
      title: 'Lightning Fast',
      desc: 'Get your groceries delivered to your doorstep in under 60 minutes.',
      color: 'bg-yellow-50 text-yellow-600'
    },
    {
      icon: 'fa-face-smile',
      title: 'Happy Customers',
      desc: 'Over 50,000 satisfied families trust Fresh Cart every single day.',
      color: 'bg-blue-50 text-blue-600'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-green-50/50 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            About Our <span className="text-green-600">Store</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Welcome to Fresh Cart, your ultimate destination for the freshest produce, 
            handpicked with love and delivered with care.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 leading-tight">
              Our Mission: Freshness <br />
              <span className="text-green-600">Without Compromise.</span>
            </h2>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                Founded in 2024, Fresh Cart began with a simple observation: finding truly fresh, organic produce in the city was harder than it should be. We set out to change that by building direct relationships with local growers.
              </p>
              <p>
                Today, we bridge the gap between the farm and your kitchen. Our state-of-the-art cold chain ensures that every tomato, apple, and leaf of spinach retains its nutritional value and taste from the moment it is harvested.
              </p>
              <p>
                We believe that eating healthy shouldn't be a chore. It should be an experience that brings joy and vitality to your home.
              </p>
            </div>
            <button className="mt-10 px-8 py-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-100 flex items-center gap-3">
              Learn More
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative group">
              <div className="absolute -inset-4 bg-green-100 rounded-[3rem] -rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
              <div className="relative aspect-[4/3] bg-gray-200 rounded-[2.5rem] overflow-hidden shadow-2xl">
                 <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold italic">
                   [ Image: Fresh Market Display ]
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Grid */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
              Why Choose Fresh Cart?
            </h2>
            <div className="w-20 h-1.5 bg-green-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {values.map((v, i) => (
              <div 
                key={i} 
                className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`w-16 h-16 ${v.color} rounded-2xl flex items-center justify-center mb-8 shadow-sm`}>
                  <i className={`fa-solid ${v.icon} text-3xl`}></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {v.title}
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
