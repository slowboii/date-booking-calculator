
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

document.addEventListener('DOMContentLoaded', function() {
  const calendarEl = document.getElementById('calendar');
  
  const calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    height: '90vh',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth'
    },
    dayMaxEvents: true,
    expandRows: true,
    contentHeight: 'auto',
    handleWindowResize: true,
    views: {
      dayGridMonth: {
        titleFormat: { year: 'numeric', month: 'long' }
      }
    },
    dateClick: function(info) {
      handleDateClick(info.date);
    }
  });

  calendar.render();
});

function handleDateClick(date) {
  const rooms = [
    { id: '1', name: 'Conference Room A', capacity: 10 },
    { id: '2', name: 'Meeting Room B', capacity: 6 },
    { id: '3', name: 'Board Room', capacity: 15 },
    { id: '4', name: 'Small Meeting Room', capacity: 4 },
  ];

  const formattedDate = date.toLocaleDateString();
  const roomSelection = prompt(`Select a room number for ${formattedDate}:\n${rooms.map((room, index) => 
    `${index + 1}. ${room.name} (Capacity: ${room.capacity})`
  ).join('\n')}`);

  const selectedRoom = rooms[parseInt(roomSelection) - 1];
  if (selectedRoom) {
    alert(`Booked ${selectedRoom.name} for ${formattedDate}`);
  }
}
