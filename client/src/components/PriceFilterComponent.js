import React, { useState } from 'react';

const PriceFilterComponent = () => {
    const [priceRanges, setPriceRanges] = useState([
        { id: 1, label: '$0 - $50', checked: false },
        { id: 2, label: '$50 - $100', checked: false },
        { id: 3, label: '$100 - $200', checked: false },
        { id: 4, label: '$200+', checked: false }
    ]);

    const handleCheckboxChange = (id) => {
        const updatedPriceRanges = priceRanges.map(range => {
            if (range.id === id) {
                return { ...range, checked: !range.checked };
            }
            return range;
        });
        setPriceRanges(updatedPriceRanges);
    };

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md w-44 mt-8 mx-4">
            <h2 className="text-xl font-bold mb-4">Price Range</h2>
            <div className="space-y-2">
                {priceRanges.map(range => (
                    <div key={range.id} className="flex items-center">
                        <input
                            type="checkbox"
                            id={`priceRange${range.id}`}
                            checked={range.checked}
                            onChange={() => handleCheckboxChange(range.id)}
                            className="rounded text-blue-500 focus:ring-blue-400 focus:ring-2"
                        />
                        <label
                            htmlFor={`priceRange${range.id}`}
                            className="ml-2 text-gray-700"
                        >
                            {range.label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PriceFilterComponent;
