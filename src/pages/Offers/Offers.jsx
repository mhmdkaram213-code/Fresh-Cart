import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

export default function Offers() {
    return (
        <div className="text-center py-20 px-4">
            <FontAwesomeIcon icon={faTag} className="text-5xl text-primary-600 mb-4" />
            <h1 className="text-3xl font-bold text-primary-600 mb-4">
                Offers & Deals
            </h1>
            <p className="text-gray-500 max-w-md mx-auto">
                Discover amazing deals and limited-time offers across all categories.
                Save big on your favorite products every day.
            </p>
        </div>
    );
}
