import React, { useState } from 'react';

const SortingFilter = ({ onSortChange }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleSortChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        onSortChange(selectedValue);
    };

    return (
        <div className="my-2">
            <h2 className="text-lg font-semibold mb-2">Sorting Options:</h2>
            <select
                value={selectedOption}
                onChange={handleSortChange}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            >
                <option value="">Select Sorting Option</option>
                <option value="price">Sort by Price</option>
                <option value="rating">Sort by Rating</option>
            </select>
        </div>
    );
};

export default SortingFilter;
