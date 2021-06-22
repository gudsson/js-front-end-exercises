document.addEventListener('DOMContentLoaded', function() {
  let itemName = document.querySelector('input[name=name]');
  let itemQty = document.querySelector('input[name=quantity]');
  let ul = document.querySelector('ul#grocery-list');
  let form = document.querySelector('form');

  form.addEventListener('submit', e => {
    e.preventDefault();
  
    let [name, qty] = [itemName.value, itemQty.value];

    if (qty === '' || Number.isNaN(+qty)) qty = 1;

    let li = document.createElement('li');
    li.appendChild(document.createTextNode(`${qty} ${name}`));
    ul.appendChild(li);

    form.reset();
  });
});


