import React from "react";

export default function Button({ text, type, containerStyle }) {
    return (
        <button
            className={`bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 ${containerStyle}`}
            type={type}
        >
            {text}
        </button>
    );
}
