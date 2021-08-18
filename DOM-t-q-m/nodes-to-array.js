/* Nodes to Array
Implement a function that converts the DOM, starting from the body, to nested
arrays. Each element in the DOM is represented as

["PARENT_TAG_NAME", [children]]

where children are elements as well and as such follow the same format.
When an element has no children, it's represented as

["PARENT_TAG_NAME", []]

For instance, if the HTML doesn't have any elements inside the body,
the result array would be:

["BODY", []]

Likewise, if the HTML only
has a div element as its content, the result array would be:

["BODY", [["DIV", []]]] */

function nodesToArr() {
  let currentNode = document.body;
  let res = getArr(currentNode);

  return res.map(node => getTags(node));
}

function getTags(element) {
  if (Array.isArray(element)) {
    return element.map(subElement => getTags(subElement));
  }
  return element.tagName;
}

function getArr(node) {
  let children = node.children;

  if (children.length === 0) return [node, []];

  return [node, [...children].map(child => getArr(child))];
}