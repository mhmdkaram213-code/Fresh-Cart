import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
    return (
        <div className="text-center py-20 px-4">
            <FontAwesomeIcon icon={faHouse} className="text-5xl text-primary-600 mb-4" />
            <h1 className="text-3xl font-bold text-primary-600 mb-4">
                Home
            </h1>
            <p className="text-gray-500 max-w-md mx-auto">
                Welcome to FreshCart, your one-stop shop for everything fresh! Discover incredible products across all categories
                at the best prices. We're happy to have you here.
            </p>
        </div>
    );
}