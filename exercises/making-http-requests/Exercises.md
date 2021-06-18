# Exploring the Booking App

#### App Description

The *booking app* is a tool for students to book the available schedule slots of staff. Staff provide the schedules that students can book. Note that this is only a simple booking app and by design it does not handle various scenarios and exceptions. For instance, the app doesn't bother to check whether the students who are registering have unique emails nor does it check the quality of the input provided (e.g., well formatted email, valid date value, valid time value).

#### App Specifications

The app has four resources and the following relationship:

- Staff Members: List of staff that can provide available time slots.
  - ID
  - Name
  - Email
- Schedules: List of schedules that students can book. A schedule is booked if there is a value for the student email.
  - ID
  - Staff ID
  - Date
  - Time
  - Student Email
- Students: List of students who can book a schedule.
  - ID
  - Name
  - Email
- Booking Sequences: List of booking sequences. A student who wants to register must have a booking sequence. Students get a booking sequence when they first try to book a schedule and they are not yet in the database.
  - ID
  - Student Email
  - Sequence

![img](https://dbdwvr6p7sskw.cloudfront.net/js-exercises/making_http_requests/booking_app.png)

#### Exercise

You'll be using a booking app throughout the exercise group, "Making HTTP Requests." To help you explore the documentation, try answering the following questions by running the server, opening your browser, visiting `/doc`, and carefully reading the documentation available for each route in the app. The app has seed data, so you can freely test out the different routes. You should only need to visit one route to determine the answer; if you'll need to visit more than one route, then the answer is *"There is no route that will provide this information."*

#### Response

```text
1. How many staff are there?
   5

2. How many students are there?
   5

3. How many schedules exist?
   9

4. How many schedules have bookings?
   3

5. Do all staff have schedules?
   No, staff_id=4 and staff_id=5 do not.

6. Did all students book a schedule?
   No, only 3 of 5 did. Dashawn Bergstrom and Mrs. Randy Roob didn't.

```



#### Solution

```js
If you've played around with the routes and used the routes that add to the database then the values will not be exactly the same. If you wish to reset database to its initial state, visit the /api/reset path.

There are 5 staffs. You can get this by accessing the /api/staff_members route.
There are 5 students. You can get this by accessing the /api/students route.
There are 9 schedules. You can get this by accessing the /api/schedules route.
There are 3 schedules with bookings. You can get this by counting the number of schedules with emails when using the returned data by accessing the /api/schedules route.
There is no route that will provide this information.
There is no route that will provide this information.
```

# Getting Schedules

Implement a function that retrieves all the schedules that are available. If one or more schedules are available, tally the count of schedules for each staff and alert the user of result as "key: value" pairs with the staff id as key (in the format of `'staff {id}'`; e.g, `'staff 1'`) and the count of schedules as the value. If there are no schedules, alert the user that there are currently no schedules available for booking.

When implementing the function, keep in mind that server has been known to slow down when there are more than 7 schedules to retrieve. It doesn't always happen, but be sure to handle it accordingly. Once 5 seconds have passed, cancel the retrieval and inform the user to try again.

Finally, inform the user about the completion of the request regardless of the success or failure (timeout) of the request.

Note: Server slow down for when there are more than 7 schedules to retrieve is manufactured only. For reference, the manufactured time is 7 seconds.

When running the JavaScript code, be sure that you're not doing [cross origin requests](https://launchschool.com/lessons/3728e24b/assignments/b86f1e8e); the app is not set to handle it. The easiest way to avoid it is to create an HTML file in the public directory of the app, access that file (page) via the proper path, and run the JS code from the web page.

For example, if you've created a `public/exercise1.html` file you'll access it via: `http://localhost:3000/exercise1.html`.

#### Response

```js
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
```



#### Solution

```js
function retrieveSchedules() {
  const request = new XMLHttpRequest();

  // Be sure to change your host and port number accordingly
  request.open('GET','http://localhost:3000/api/schedules')
  request.timeout = 5000;
  request.responseType = 'json';

  request.addEventListener('load', event => {
    const schedules = request.response;
    const staffs = [];
    const tally = [];

    if (schedules.length > 0) {
      schedules.forEach(({staff_id}) => {
        const key = `staff ${String(staff_id)}`;
        if (!staffs.includes(key)) {
          staffs.push(key);
          tally.push(1);
        } else {
          tally[staffs.indexOf(key)] += 1;
        }
      });

      alert(tally.map((_, index) => `${staffs[index]}: ${tally[index]}`).join("\n"));
    } else {
      alert('There are currently no schedules available for booking');
    }
  });

  request.addEventListener('timeout', event => {
    alert('It is taking longer than usual, please try again later.')
  });

  request.addEventListener('loadend', event => {
    alert('The request has completed.');
  });

  request.send();
}
```

#### Discussion

With regards to the `XMLHttpRequest` for retrieving the schedules there are two things to note. First, for the possible long wait time, you must set the `timeout` property of the request object. Next, you must have a listener for the `loadend` event. Recall that this listener will fire regardless if a `timeout` or `load` event occurs.

The next thing is the tallying of schedules per staff. For this one, the solution uses two arrays: one to track the unique staff (via their IDs) and another to track the count of schedules for each staff. The solution then iterates over the schedules and checks, for every iteration, if the staff is already part of the `staffs` array. If it isn't, the staff is added to `staffs` and in the corresponding index position for the `tally` array, the value is set to `1`. If the staff is part of the `staffs` array, the index of the staff is looked up and used to increment by `1` the corresponding element for the `tally` array.

#### Further Exploration

An alternative approach for getting the tally is to use the `/schedules/:staff_id` route. Rather than iteratively counting the schedule for each staff, you can just get the length of the value returned.

