function cancelSchedule(scheduleId) {
  let xhr = new XMLHttpRequest();
  xhr.open('DELETE', `/api/schedules/${scheduleId}`);

  xhr.addEventListener('load', function() {
    if (xhr.status === 204) alert('Schedule deleted.');
    else alert(xhr.responseText);
  });

  xhr.send();
}

function cancelBooking(bookingId) {
  let xhr = new XMLHttpRequest();
  xhr.open('PUT', `/api/bookings/${bookingId}`);

  xhr.addEventListener('load', function() {
    if (xhr.status === 204) alert('Booking cancelled.');
    else alert(xhr.responseText);
  });

  xhr.send();
}