import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';

export default function Brands() {
    return (
        <div className="text-center py-20 px-4">
            <FontAwesomeIcon icon={faBuilding} className="text-5xl text-primary-600 mb-4" />
            <h1 className="text-3xl font-bold text-primary-600 mb-4">
                Brands
            </h1>
            <p className="text-gray-500 max-w-md mx-auto">
                Explore our partner brands! We work with the best names in the industry to bring you high-quality products
                you can trust.
            </p>
        </div>
    );
}