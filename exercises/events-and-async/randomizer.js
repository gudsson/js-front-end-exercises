/* Randomizer
Write a randomizer function that accepts n callbacks and calls each callback
at some random point in time between now and 2 * n seconds from now.
For instance, if the caller provides 5 callbacks, the function should
run them all sometime within 10 seconds.

While running, randomizer should log the elapsed time every
second: 1, 2, 3, ..., 2 * n. */

function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

function randomizer(callbacks) {
  callbacks = [...arguments];

  let maxTime = 2 * callbacks.length;

  callbacks.forEach(func => {
    setTimeout(() => func(), (Math.floor(Math.random() * maxTime) + 1) * 1000);
  });

  for (let idx = 1; idx <= maxTime; idx++) {
    setTimeout(() => console.log(idx), idx * 1000);
  }
}

randomizer(callback1, callback2, callback3);