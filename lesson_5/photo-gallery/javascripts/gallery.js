document.addEventListener('DOMContentLoaded', function() {
  let imageContainer = document.getElementById('thumbnails');
  let thumbnails = document.querySelectorAll('li > img');
  let jumbotron = document.querySelector('figure');
  let jumbotronImg = jumbotron.querySelector('img');
  let jumbotronCaption = jumbotron.querySelector('figcaption');

  imageContainer.addEventListener('click', event => {
    if (event.target.tagName === 'IMG') {
      selectPhoto(event.target);
    }
  });

  function selectPhoto(photoElement) {
    [...thumbnails].forEach(thumbnail => thumbnail.classList.remove('active'));
    photoElement.classList.add('active');
    jumbotronImg.classList.remove('fade-in');
    jumbotronImg.classList.add('fade-out');

    setTimeout(() => {
      jumbotronImg.src = photoElement.src;
      jumbotronCaption.textContent = photoElement.title;
      jumbotronImg.classList.replace('fade-out', 'fade-in');
    }, 300);
});