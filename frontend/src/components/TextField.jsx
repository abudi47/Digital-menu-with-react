import React from "react";

export default function TextField({ placeholder, title, type, fieldStyle, required, containerStyle }) {
    return (
        <div class={containerStyle}>
            <label for={title} class="block mb-2 text-sm font-medium text-gray-800">
                {title}
            </label>
            <input
                type={type}
                id={title}
                class={`border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ${fieldStyle}`}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
}
