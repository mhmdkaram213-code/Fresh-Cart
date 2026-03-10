import React from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderTree } from '@fortawesome/free-solid-svg-icons';

export default function CategoryDetail() {
    const { categoryName } = useParams();

    // Simple formatting for the category name (e.g., electronics -> Electronics)
    const formattedName = categoryName
        ? categoryName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : 'Category';

    return (
        <div className="text-center py-20 px-4">
            <FontAwesomeIcon icon={faFolderTree} className="text-5xl text-primary-600 mb-4" />
            <h1 className="text-3xl font-bold text-primary-600 mb-4 capitalize">
                {formattedName}
            </h1>
            <p className="text-gray-500 max-w-md mx-auto">
                Browsing through our {formattedName} collection. Find everything you need right here,
                curated specifically for this category.
            </p>
        </div>
    );
}
