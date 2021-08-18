/* Implement a function that converts a nested array of nodeNames
(see Nodes to Array exercise for examples) to nodes. Go over the
sample code and the corresponing return values below as a guide
for what you will implement.

example1
// Nested array of nodes
const nodes = ["BODY",[["HEADER",[]],["MAIN",[]],["FOOTER",[]]]];

// OR
//
// ["BODY", [
//   ["HEADER", []],
//   ["MAIN", []],
//   ["FOOTER", []]]]

arrayToNodes(nodes);
example1-return-value
<body>
  <header></header>
  <main></main>
  <footer></footer>
</body> */

function arrayToNodes(nodes) {
  if (nodes.length === 0) return;
  let parent = nodes[0];

}

var nodeA = document.body.firstElementChild;
console.log(document.querySelector('footer').children.length);
console.log(document.querySelector('body').replaceChild(document.querySelector('footer'), document.body.firstElementChild).tagName);
console.log(document.body.appendChild(nodeA));

console.log(document.querySelector('section').textContent.split("\n").map(function(text) {
  return text.trim();
}).filter(function(text) {
  return text.length > 0;
}));