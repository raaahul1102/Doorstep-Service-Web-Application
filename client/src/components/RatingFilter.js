import React, { useState } from 'react';

const RatingFilter = () => {
    const [ratings, setRatings] = useState([
        { id: 1, label: '⭐', value: 1, checked: false },
        { id: 2, label: '⭐⭐', value: 2, checked: false },
        { id: 3, label: '⭐⭐⭐', value: 3, checked: false },
        { id: 4, label: '⭐⭐⭐⭐', value: 4, checked: false },
        { id: 5, label: '⭐⭐⭐⭐⭐', value: 5, checked: false }
    ]);

    const handleCheckboxChange = (id) => {
        const updatedRatings = ratings.map(rating => {
            if (rating.id === id) {
                return { ...rating, checked: !rating.checked };
            }
            return rating;
        });
        setRatings(updatedRatings);
    };

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md w-44 mt-8 mx-4 my-0.5">
            <h2 className="text-xl font-bold mb-4">Rating Filter</h2>
            <div className="space-y-2">
                {ratings.map(rating => (
                    <div key={rating.id} className="flex items-center">
                        <input
                            type="checkbox"
                            id={`rating${rating.id}`}
                            checked={rating.checked}
                            onChange={() => handleCheckboxChange(rating.id)}
                            className="rounded text-blue-500 focus:ring-blue-400 focus:ring-2"
                        />
                        <label
                            htmlFor={`rating${rating.id}`}
                            className="ml-2 text-gray-700"
                        >
                            {rating.label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RatingFilter;
