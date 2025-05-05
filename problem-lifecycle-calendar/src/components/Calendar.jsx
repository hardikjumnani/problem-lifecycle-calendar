import { useState } from 'react';
import './Calendar.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // for selectable

export default function Calendar() {

  const [events, setEvents] = useState([]);

  const handleDateClick = (arg) => {
    const title = prompt('Enter event title:');
    if (title) {
      setEvents([...events, { title, date: arg.dateStr }]);
    }
  };
  
  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        aspectRatio={2}
        contentHeight={700}

        selectable= {true}
        selectMirror={true}
        events={events}
        dateClick={handleDateClick}
      />
    </div>
  )
}