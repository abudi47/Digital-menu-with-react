import React from "react";

export default function Categories({ category,handleClick }) {

    return (
        <div
            className="bg-primary max-h-12 p-2 px-4 rounded-full text-white text-nowrap text-lg"
            onClick={handleClick}
        >
            Soft Drinks
        </div>
    );
}
