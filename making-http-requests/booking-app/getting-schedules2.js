// document.addEventListener('DOMContentLoaded', function() {
  const request = new XMLHttpRequest();

  request.open('GET', 'http://localhost:3000/api/schedules');
  request.timeout = 5000;
  request.responseType = 'json';

  request.addEventListener('load', e => {
    let schedules = request.response;

    if (schedules.length === 0) {
      alert(`there are currently no schedules available for booking.`);
      return;
    }

    let countObj = {};

    schedules.forEach(schedule => {
      let key = `staff ${schedule.staff_id}`;
      if (!countObj[key]) countObj[key] = 0;
      countObj[key] += 1;
    })

    let staffSchedules = Object.entries(countObj).map(entry => entry.join(': '));
    alert(staffSchedules.join('\n'));
  });

  request.addEventListener('timeout', event => {
    alert('Requested timeout.  Please try again.')
  });

  request.addEventListener('loadend', event => {
    alert('Request completed.');
  });

  request.send();
// });