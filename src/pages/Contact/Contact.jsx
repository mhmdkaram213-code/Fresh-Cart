import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Form Schema Validation with Zod
const contactSchema = z.object({
  fullName: z.string().min(3, "Full Name must be at least 3 characters long"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters long"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    // Simulate API call
    console.log("Form Data Submitted:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert("Thank you! Your message has been sent successfully.");
    reset();
  };

  const contactInfo = [
    {
      icon: 'fa-map-location-dot',
      title: 'Visit Us',
      content: '123 Fresh Lane, Cairo, Egypt',
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: 'fa-phone',
      title: 'Call Us',
      content: '+20 123 456 7890',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: 'fa-envelope-open-text',
      title: 'Email Us',
      content: 'support@freshcart.com',
      color: 'bg-purple-50 text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in-down">
          <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Get In <span className="text-green-600">Touch</span>
          </h1>
          <p className="text-lg text-gray-500 font-medium max-w-xl mx-auto">
            Have questions or feedback? We'd love to hear from you. 
            Our green-thumbed team is always here to help.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {contactInfo.map((info, i) => (
            <div 
              key={i} 
              className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 text-center group"
            >
              <div className={`w-20 h-20 ${info.color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform`}>
                <i className={`fa-solid ${info.icon} text-3xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h3>
              <p className="text-gray-500 font-medium">{info.content}</p>
            </div>
          ))}
        </div>

        {/* Contact Form Section */}
        <div className="max-w-4xl mx-auto bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-green-900/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -z-0 opacity-50"></div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                <div className="relative">
                  <input
                    {...register('fullName')}
                    type="text"
                    placeholder="John Doe"
                    className={`w-full px-6 py-4 bg-gray-50 rounded-2xl border ${errors.fullName ? 'border-red-500' : 'border-gray-100'} focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-gray-900 font-medium placeholder:text-gray-300`}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs font-bold mt-2 ml-2 flex items-center gap-1 animate-shake">
                      <i className="fa-solid fa-circle-exclamation"></i>
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                <div className="relative">
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="john@example.com"
                    className={`w-full px-6 py-4 bg-gray-50 rounded-2xl border ${errors.email ? 'border-red-500' : 'border-gray-100'} focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-gray-900 font-medium placeholder:text-gray-300`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs font-bold mt-2 ml-2 flex items-center gap-1 animate-shake">
                      <i className="fa-solid fa-circle-exclamation"></i>
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Subject</label>
              <div className="relative">
                <input
                  {...register('subject')}
                  type="text"
                  placeholder="How can we help?"
                  className={`w-full px-6 py-4 bg-gray-50 rounded-2xl border ${errors.subject ? 'border-red-500' : 'border-gray-100'} focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-gray-900 font-medium placeholder:text-gray-300`}
                />
                {errors.subject && (
                  <p className="text-red-500 text-xs font-bold mt-2 ml-2 flex items-center gap-1 animate-shake">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    {errors.subject.message}
                  </p>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Your Message</label>
              <div className="relative">
                <textarea
                  {...register('message')}
                  rows="5"
                  placeholder="Share your thoughts with us..."
                  className={`w-full px-6 py-4 bg-gray-50 rounded-2xl border ${errors.message ? 'border-red-500' : 'border-gray-100'} focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-gray-900 font-medium placeholder:text-gray-300 resize-none`}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-xs font-bold mt-2 ml-2 flex items-center gap-1 animate-shake">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    {errors.message.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full py-5 bg-green-600 text-white rounded-2xl font-black text-xl hover:bg-green-700 active:scale-95 transition-all shadow-xl shadow-green-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Send Message
                  <i className="fa-solid fa-paper-plane text-lg"></i>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
