import React from "react";

export const CheckBoxComponent = React.memo(({ title, checked, onChangeValue }) => {
    return (
        <div className="my-2">
            <label className="flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChangeValue(e.target.checked)}
                    className="w-4 h-4 shrink-0 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-xs ml-2">{title}</span>
            </label>
        </div>
    );
});
