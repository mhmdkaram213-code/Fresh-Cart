import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { categories } from '../../data/categories';

export default function Categories() {
    return (
        <div className="container mx-auto px-4 py-16">
            {/* Header Section */}
            <div className="text-center mb-16 animate-fadeIn">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-50 rounded-3xl mb-6 shadow-sm ring-1 ring-primary-100">
                    <FontAwesomeIcon icon={faLayerGroup} className="text-4xl text-primary-600" />
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                    Shop by <span className="text-primary-600">Categories</span>
                </h1>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                    Explore our wide selection of products curated across various categories. 
                    From the latest electronics to trendy fashion, find everything you need in one place.
                </p>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                {categories.map((category, index) => (
                    <NavLink
                        key={category.path}
                        to={category.path}
                        className="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary-100 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center animate-fadeInUp"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        {/* Icon Container */}
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-50 group-hover:scale-110 transition-all duration-300 shadow-inner">
                            <FontAwesomeIcon 
                                icon={category.icon} 
                                className="text-2xl text-gray-400 group-hover:text-primary-600 transition-colors duration-300" 
                            />
                        </div>

                        {/* Category Name */}
                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-primary-600 transition-colors duration-300">
                            {category.name}
                        </h3>
                        
                        {/* Subtle Badge/Count Placeholder */}
                        <span className="mt-2 text-xs font-semibold text-gray-400 uppercase tracking-widest group-hover:text-primary-400 transition-colors duration-300">
                            Explore Items
                        </span>

                        {/* Bottom Accent Bar */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-primary-600 rounded-t-full group-hover:w-1/3 transition-all duration-300" />
                    </NavLink>
                ))}
            </div>
        </div>
    );
}