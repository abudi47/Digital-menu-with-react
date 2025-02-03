import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export default function SearchField({ placeholder = "Search...", value, changeHandler }) {
    return (
        <div className="flex flex-row bg-gray-100 p-2 rounded-lg">
            <SearchOutlinedIcon className="text-gray-500" />
            <input
                type="text"
                placeholder={placeholder}
                className="outline-none rounded-sm text-gray-500 px-2 bg-gray-100"
            />
        </div>
    );
}
