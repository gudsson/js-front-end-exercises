/* eslint-disable max-lines-per-function */
document.addEventListener('DOMContentLoaded', () => {
  let textField = document.querySelector('.text-field');
  let cursor;

  textField.addEventListener('click', event => {
    event.stopPropagation();
    textField.classList.add('focused');

    if (!cursor) {
      cursor = setInterval(() => textField.classList.toggle('cursor'), 500);
    }
  });

  document.addEventListener('keydown', event => {
    if (textField.classList.contains('focused')) {
      let contentField = textField.querySelector('.content');

      if (event.key === 'Backspace') {
        contentField.textContent = contentField.textContent.slice(0, -1);
      } else {
        contentField.textContent += event.key;
      }
    }
  });

  document.addEventListener('click', event => {
    textField.classList.remove('focused');
    textField.classList.remove('cursor');
    clearInterval(cursor);
  });
});
