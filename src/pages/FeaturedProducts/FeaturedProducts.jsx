import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function FeaturedProducts() {
    return (
        <div className="text-center py-20 px-4">
            <FontAwesomeIcon icon={faStar} className="text-5xl text-primary-600 mb-4" />
            <h1 className="text-3xl font-bold text-primary-600 mb-4">
                Featured Products
            </h1>
            <p className="text-gray-500 max-w-md mx-auto">
                Handpicked for you! Explore our range of top-rated and trending products that our customers love most.
                Quality and style in every featured item.
            </p>
        </div>
    );
}
