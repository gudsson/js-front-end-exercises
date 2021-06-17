/* Bold Element + Custom

Implement a function that makes an element bold and allows the
user of the function to optionally do something else with it. */

function makeBold(element, callback) {
  element.style.fontWeight = 'bold';
  if (callback && typeof callback === 'function') {
    callback(element);
  }
}