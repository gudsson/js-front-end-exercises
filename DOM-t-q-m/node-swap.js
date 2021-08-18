/* Node Swap

Write a function that takes two element ids as arguments and swaps the
positions of the elements represented by the ids. The function returns
true for valid swaps and undefined for invalid. To put the focus on the
node swapping functionality, you can assume that nodes will have a value
for the id attribute and two arguments will always be provided. Use the
following HTML and sample codes to test your output: */

function nodeSwap(id1, id2) {
  let [element1, element2] = [id1, id2].map(id => document.getElementById(id));
  if (!element1 || !element2 || element1.contains(element2)
  || element2.contains(element1)) return undefined;

  element1.parentNode.insertBefore(element2.cloneNode(true), element1);
  element2.parentNode.insertBefore(element1.cloneNode(true), element2);

  element1.remove();
  element2.remove();

  return true;
}