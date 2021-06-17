/* Article Highlighter

Given the HTML and CSS from the codepen, implement JS code
that does the following:


When the user clicks on a navigation link (Articles 1-4),
the browser scrolls to that article in the <main> element
and adds the highlight class to it. If another element
already has the highlight class, the browser removes the
class from that element.
When the user clicks on an article element or any of its
child elements, the browser adds the highlight class to it.
If another element already has the highlight class, the browser
removes the class from that element.
When the user clicks anywhere else on the page, the browser
adds the highlight class to the main element. If another element
already has the highlight class, the browser removes the class
from that element. */

let links = document.querySelectorAll('a');
let articles = document.querySelectorAll('article');

function clearHightlights() {
  document.querySelector('main').classList.remove('highlight');
  document.querySelectorAll('article').forEach(article => {
    article.classList.remove('highlight');
  });
}

links.forEach(link => {
  link.addEventListener('click', e => {
    clearHightlights();
    let articleName = link.getAttribute('href').slice(1);
    let article = document.getElementById(articleName);
    article.classList.add('highlight');
  });
});

articles.forEach(article => {
  article.addEventListener('click', e => {
    clearHightlights();
    article.classList.add('highlight');
    e.stopPropagation();
  });
});

document.body.addEventListener('click', e => {
  clearHightlights();
  document.querySelector('main').classList.add('highlight');
}, true);