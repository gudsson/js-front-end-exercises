document.querySelector('main').addEventListener('contextmenu', e => {
  e.preventDefault();
  alert("main");
});

document.getElementById('sub').addEventListener('contextmenu', e => {
  e.preventDefault();
  alert("sub");
  e.stopPropagation();
});