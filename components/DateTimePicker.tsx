import React, { useState, useEffect } from 'react';

interface DateTimePickerProps {
    label: string;
    value: Date | null;
    onChange: (date: Date | null) => void;
    min?: string; // min date in 'YYYY-MM-DD' format
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ label, value, onChange, min }) => {
    // Local state for the string values of the inputs.
    // These will be updated immediately on user input for a smooth experience.
    const [dateStr, setDateStr] = useState('');
    const [timeStr, setTimeStr] = useState('');

    // This effect syncs the local string state when the parent's `value` prop changes.
    // This is needed for initial values and for any programmatic changes from the parent.
    useEffect(() => {
        if (value && !isNaN(value.getTime())) {
            // Format the Date object into strings for the inputs.
            // Using local time parts to avoid timezone shift issues that can occur with toISOString().
            const year = value.getFullYear();
            const month = ('0' + (value.getMonth() + 1)).slice(-2); // Month is 0-indexed
            const day = ('0' + value.getDate()).slice(-2);
            
            setDateStr(`${year}-${month}-${day}`);
            setTimeStr(('0' + value.getHours()).slice(-2) + ':' + ('0' + value.getMinutes()).slice(-2));
        } else {
            // A null or invalid date was passed from the parent, so clear the local input values.
            setDateStr('');
            setTimeStr('');
        }
    }, [value]);

    // This function parses the local string state and updates the parent component.
    // It's called when the user finishes editing an input field (onBlur).
    const updateParentState = () => {
        if (dateStr) {
            const timeToUse = timeStr || '00:00'; // Default to midnight if time isn't set
            const newDate = new Date(`${dateStr}T${timeToUse}`);

            // Check if the constructed date is valid and if it's different from the parent's current value.
            // This prevents redundant re-renders.
            if (!isNaN(newDate.getTime()) && newDate.getTime() !== value?.getTime()) {
                onChange(newDate);
            }
        } else {
            // If the date input is empty, the value should be null.
            if (value !== null) {
                onChange(null);
            }
        }
    };
    
    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <div className="flex flex-col sm:flex-row gap-2">
                <input
                    type="date"
                    value={dateStr}
                    onChange={e => setDateStr(e.target.value)}
                    onBlur={updateParentState} // Update parent state on blur
                    min={min}
                    className="flex-1 w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
                    aria-label={`${label} - data`}
                />
                <input
                    type="time"
                    value={timeStr}
                    onChange={e => setTimeStr(e.target.value)}
                    onBlur={updateParentState} // Update parent state on blur
                    disabled={!dateStr}
                    className="flex-1 w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                    aria-label={`${label} - godzina`}
                />
            </div>
        </div>
    );
};

export default DateTimePicker;
