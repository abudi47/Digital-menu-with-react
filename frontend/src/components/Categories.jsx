import React from "react";

export default function Categories({ category, setCategory, isActive }) {
    return (
        <div
            className={`bg-primary max-h-12 p-2 px-4 rounded-full text-white text-nowrap text-lg ${
                isActive && "border-4 border-gray-400"
            }`}
            onClick={() => setCategory(category?.value)}
        >
            {category?.name}
        </div>
    );
}
