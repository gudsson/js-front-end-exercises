/* Write a function that colors a specific generation of the DOM tree.
A generation is a set of elements that are on the same level of
indentation. We'll be using a "styled" HTML for this exercise to
better visualize the generations. You may use the .generation-color
class to color the specific generation. You can assume that only
non-negative integers will be provided as arguments. Following
are some sample output to help you test your code: */

function colorGeneration(level) {
  if (level === 0) return;
  let elements = [document.body];

  for (let count = 1; count <= level; count++) {
    elements = elements.map(node => [...node.children]).flat();
  }

  elements.forEach(element => element.classList.toggle('generation-color'));
}