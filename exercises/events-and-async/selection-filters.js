let lookup = {
  'Vertebrate': ['Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
  'Warm-blooded': ['Bear', 'Whale', 'Ostrich'],
  'Cold-blooded': ['Salmon', 'Turtle'],
  'Mammal': ['Bear', 'Whale'],
  'Bird': ['Ostrich']
}

let classDropdown = document.getElementById('animal-classifications');
let animalDropdown = document.getElementById('animals');

let classes = [...classDropdown.children].map(child => child.value).slice(1);
let animals = [...animalDropdown.children].map(child => child.value).slice(1);

classDropdown.addEventListener('focusout', e => {
  let classVal = classDropdown.value;
  if (classVal !== 'Classifications') {
    animals.forEach(animal => {
      let animalOption = animalDropdown.querySelector(`option[value="${animal}"]`);
      if (!lookup[classVal].includes(animal)) {
        animalOption.setAttribute('hidden', 'hidden');
      } else animalOption.removeAttribute('hidden');
    });
  } else {
    clear(animals);
  }
});

animalDropdown.addEventListener('focusout', e => {
  let animal = animalDropdown.value;
  if (animal !== 'Animal') {
    classes.forEach(classification => {
      let classOption = classDropdown.querySelector(`option[value="${classification}"]`);
      if (!lookup[classification].includes(animal)) {
        classOption.setAttribute('hidden', 'hidden');
      } else classOption.removeAttribute('hidden');
    });
  } else clear(classes);
});

document.getElementById('clear').addEventListener('click', e => {
  e.preventDefault();
  clear(classes);
  clear(animals);
});

function clear(elements) {
  elements.forEach(element => {
    let elementOption = document.querySelector(`option[value="${element}"]`);
    elementOption.removeAttribute('hidden');
  });
}