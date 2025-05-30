import React from "react";
export const SelectComponent = React.memo(({ value, options, onChangeValue }) => {
    return (
        <select
            value={value}
            onChange={(e) => onChangeValue(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
})
