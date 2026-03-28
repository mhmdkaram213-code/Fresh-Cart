import React from 'react';

const Features = () => {
  const features = [
    {
      icon: 'fa-truck',
      title: 'Free Delivery',
      desc: 'On all orders over $100',
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: 'fa-undo',
      title: '30 Days Return',
      desc: 'Hassle-free money back guarantee',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: 'fa-shield-halved',
      title: 'Secure Payment',
      desc: '100% secure payment methods',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      icon: 'fa-headset',
      title: '24/7 Support',
      desc: 'Dedicated support team',
      color: 'bg-orange-50 text-orange-600'
    }
  ];

  return (
    <section className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 px-12">
      {features.map((f, i) => (
        <div
          key={i}
          className="group p-8 bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
        >
          <div className={`w-24 h-24 ${f.color} rounded-[2rem] flex items-center justify-center mb-8 mx-auto group-hover:rotate-6 transition-transform shadow-sm`}>
            <i className={`fa-solid ${f.icon} fa-3x`}></i>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight group-hover:text-green-600 transition-colors">
              {f.title}
            </h3>
            <p className="text-sm text-gray-400 font-bold leading-relaxed px-4">
              {f.desc}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Features;
