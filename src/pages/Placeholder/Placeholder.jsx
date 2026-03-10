import React from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

export default function PlaceholderPage() {
    const location = useLocation();
    const title = location.pathname.split('/').pop().replace(/-/g, ' ');
    const formattedTitle = title.charAt(0).toUpperCase() + title.slice(1);

    return (
        <div className="text-center py-20 px-4">
            <FontAwesomeIcon icon={faCircleInfo} className="text-5xl text-primary-600 mb-4" />
            <h1 className="text-3xl font-bold text-primary-600 mb-4 capitalize">
                {formattedTitle || 'Page'}
            </h1>
            <p className="text-gray-500 max-w-md mx-auto">
                This is a placeholder for the {formattedTitle} page. We are currently working on bringing you
                the best content for this section. Stay tuned!
            </p>
        </div>
    );
}
