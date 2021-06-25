const request = new XMLHttpRequest();

request.open('GET', 'http://localhost:3000/api/schedules');
request.timeout = 5000;
request.responseType = 'json';

request.addEventListener('load', event => {
  const schedules = request.response;

  if (schedules.length > 0) {
    let countObj = {};
    
    schedules.forEach(({staff_id}) => {
      let key = `staff ${staff_id}`;
      if (!countObj.hasOwnProperty(key)) countObj[key] = 0;
      countObj[key] += 1;
    });

    let staffSchedules = Object.entries(countObj).map(entry => entry.join(': '));
    alert(staffSchedules.join('\n'));
    
  } else alert('There are currently no schedules available for booking');
});

request.addEventListener('timeout', event => {
  alert('Requested timeout.  Please try again.')
});

request.addEventListener('loadend', event => {
  alert('Request completed.');
});

request.send();