import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';

export default function RecentlyAdded() {
    return (
        <div className="text-center py-20 px-4">
            <FontAwesomeIcon icon={faClockRotateLeft} className="text-5xl text-primary-600 mb-4" />
            <h1 className="text-3xl font-bold text-primary-600 mb-4">
                Recently Added
            </h1>
            <p className="text-gray-500 max-w-md mx-auto">
                Check out our latest arrivals! We're constantly adding new and exciting products to our collection.
                Don't miss the newest trends and items.
            </p>
        </div>
    );
}
