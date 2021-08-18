/* Write a JavaScript function that takes an element's id and returns the
DOM tree of the element in a two-dimensional array. The first subarray
contains the element and its siblings, the second contains the parent
of the element and its siblings, so on and so forth, all the way up
to the "grandest" parent. Assume that the grandest parent is the
element with an id of "1".
Use the following HTML and test cases to test your code: */

function domTreeTrace(id) {
  let element = document.getElementById(id);
  let parent = element.parentNode;
  let res = [];

  while (true) {
    let siblings = parent.children;
    res.push(Array.from(siblings).map(e => e.nodeName));
    if (parent.nodeName === 'BODY') return res;
    parent = parent.parentNode;
  }
}