import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

export default function SubCategories() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faList} className="text-3xl text-primary-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-3">SubCategories</h1>
            <p className="text-gray-500 max-w-md">
                Browse all subcategories. This page is coming soon with a full list of product subcategories.
            </p>
        </div>
    );
}
