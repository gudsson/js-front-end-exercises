let header = document.body.querySelector('body > header');
document.body.insertBefore(header, document.body.firstChild);

let h1 = document.body.querySelector('main > h1');
header.insertBefore(h1, header.firstChild);

let [chinStickFig, babyMopFig] = document.querySelectorAll('figure');

let babyMopImg = chinStickFig.querySelector('img');
let chinStickImg = babyMopFig.querySelector('img');

chinStickFig.insertBefore(chinStickImg, chinStickFig.firstChild);
babyMopFig.insertBefore(babyMopImg, babyMopFig.firstChild);

let article = document.body.querySelector('section > article');
article.appendChild(chinStickFig);
article.appendChild(babyMopFig);