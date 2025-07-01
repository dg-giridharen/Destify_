// Full/src_admin/components/CalendarWidget/CalendarWidget.jsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './CalendarWidget.css'; // Ensure this CSS file exists for styling

// Accept bookedDateRanges as a prop, defaulting to an empty array
const CalendarWidget = ({ bookedDateRanges = [] }) => { 
    const [date, setDate] = useState(new Date());

    // This function adds custom classes to specific dates
    const tileClassName = ({ date: calendarDate, view }) => {
        // Only apply highlighting in the month view
        if (view === 'month') {
            // Check if the current calendarDate falls within any of the bookedDateRanges
            const isBooked = bookedDateRanges.some(range => {
                // Create new Date objects for comparison, ensuring only date (not time) is considered
                const startDate = new Date(range.start.getFullYear(), range.start.getMonth(), range.start.getDate());
                const endDate = new Date(range.end.getFullYear(), range.end.getMonth(), range.end.getDate());
                const currentTileDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), calendarDate.getDate());

                // Return true if the current tile date is on or after the start date AND on or before the end date
                return currentTileDate >= startDate && currentTileDate <= endDate;
            });

            if (isBooked) {
                return 'highlight-booked'; // Apply this CSS class for booked dates
            }
        }
        return null; // Return null if no special class is needed for this tile
    };

    return (
        <div className="calendar-widget">
            <div className="calendar-header">
                <h4>Calendar</h4>
            </div>
            <Calendar
                onChange={setDate}
                value={date}
                tileClassName={tileClassName} // Apply the custom class logic
                prev2Label={null} // Hide the double back arrows
                next2Label={null} // Hide the double forward arrows
            />
        </div>
    );
};

export default CalendarWidget;