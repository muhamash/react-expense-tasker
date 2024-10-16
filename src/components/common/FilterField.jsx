/* eslint-disable react/prop-types */
// import React from 'react';

export default function FilterField({ handleFilterChange, text, id }) {
    return (
        <label className="inline-flex items-center px-4 py-2 text-sm text-gray-700">
            <input
                onChange={handleFilterChange}
                type="checkbox"
                className="form-checkbox h-4 w-4 rounded-md text-gray-600"
                id={id}
                value={id}
            />
            <span className="ml-2">{ text }</span>
        </label>
    );
}