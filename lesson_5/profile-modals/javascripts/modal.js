// let background = document.getElementById('modal-background');
// let modal = document.getElementById('modal');

// background.classList.toggle('hidden');
// modal.classList.toggle('hidden');




document.addEventListener('DOMContentLoaded', function() {
  let modelLayer = document.getElementById('modal-background');
  let modal = document.getElementById('modal');
  let closeBtn = document.querySelector('#modal .close-button');
  let headshot = modal.querySelector('img');
  let nameplate = modal.querySelector('h3');
  let bio = modal.querySelector('p');

  // link event handlers:
  let headshotLinks = document.querySelectorAll('#headshots > li > a');
  headshotLinks.forEach(link => link.addEventListener('click', e => showModal(e)));

  // closing actions
  closeBtn.addEventListener('click', e => hideModal(e));
  modelLayer.addEventListener('click', e => hideModal(e));
  document.addEventListener('keyup', e => {
    if (e.key === 'Escape') hideModal();
  });

  function showModal(event) {
    event.preventDefault();
    let anchor = event.target.closest('a');
    let data = anchor.dataset;
    populateModal(data);

    [modelLayer, modal].forEach(element => element.classList.replace('hide', 'show'));
  };

  function populateModal(dataset) {
    headshot.src = dataset.img;
    headshot.alt = dataset.name;
    nameplate.textContent = dataset.name;
    bio.textContent = dataset.bio;
  }

  function hideModal() {
    [modelLayer, modal].forEach(element => element.classList.replace('show', 'hide'));
    // headshot.src = '';
    // headshot.alt = '';
    // nameplate.textContent = '';
    // bio.textContent = '';
  }
});

