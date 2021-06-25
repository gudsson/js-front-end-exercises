document.addEventListener('DOMContentLoaded', event => {
  const templates = {};
  let photos;
  let currentPhoto;

  document.querySelectorAll("script[type='text/x-handlebars']").forEach(template => {
    templates[template["id"]] = Handlebars.compile(template["innerHTML"]);
  });

  document.querySelectorAll("[data-type=partial]").forEach(template => {
    Handlebars.registerPartial(template["id"], template["innerHTML"]);
  });

  fetch('/photos', { method: 'GET' })
    .then((response) => response.json())
    .then((data) => {
      photos = data;
      currentPhoto = photos[0];
      renderPhotos();
      renderPhotoInfo(currentPhoto);
      getComments(currentPhoto);
    });

  function renderPhotos() {
    let slides = document.getElementById('slides');
    slides.insertAdjacentHTML('beforeend', templates.photos({ photos: photos }));
  }

  function renderPhotoInfo(photo) {
    let header = document.querySelector("section > header");
    header.innerHTML = templates.photo_information(photo);
    bindButtons();
  }

  function bindButtons() {
    document.querySelector('a.like').addEventListener('click', addLike);
    document.querySelector('a.favorite').addEventListener('click', addFave);
  }

  function addLike(e) {
    e.preventDefault();
    fetch('/photos/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
      body: `photo_id=${currentPhoto.id}`,
    })
    .then(response => response.json())
    .then(data => {
      e.target.textContent = e.target.textContent.replace(/\d+/, data.total);
    });
  }

  function addFave(e) {
    e.preventDefault();
    fetch('/photos/favorite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
      body: `photo_id=${currentPhoto.id}`,
    })
    .then(response => response.json())
    .then(data => {
      e.target.textContent = e.target.textContent.replace(/\d+/, data.total);
    });
  }

  function getComments(photo) {
    fetch(`/comments?photo_id=${photo.id}`, { method: 'GET' })
      .then((response) => response.json())
      .then((comments) => {
        let commentList = document.querySelector('#comments ul');
        commentList.innerHTML = templates.photo_comments({ comments: comments });
      });
  }
  
  document.querySelector('a.prev').addEventListener('click', e => {
    e.preventDefault();
    prevSlide();
  });

  document.querySelector('a.next').addEventListener('click', e => {
    e.preventDefault();
    nextSlide();
  });

  function prevSlide() {
    let slides = document.querySelector('#slides > figure').parentNode;
    slides.insertBefore([...slides.children].pop(), slides.children[0]);
    setCurrentPhoto(slides.children[0]);
  }

  function nextSlide() {
    let slides = document.querySelector('#slides > figure').parentNode;
    slides.appendChild(slides.children[0]);
    setCurrentPhoto(slides.children[0]);
  }

  function setCurrentPhoto(slide) {
    currentPhoto = photos.filter(photo => +photo.id === +slide.dataset.id)[0];
    renderPhotoInfo(currentPhoto);
    getComments(currentPhoto);
  }

  document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    let form = e.target;
    let formData = new FormData(form);
    formData.set('photo_id', String(currentPhoto.id));

    fetch(form.action, {
      method: form.method,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
      body: new URLSearchParams([...formData])
    })
    .then(response => response.json())
    .then(data => {
      let commentList = document.querySelector('#comments ul');
      commentList.insertAdjacentHTML('beforeend', templates.photo_comment(data));
      form.reset();
    })
  });
});