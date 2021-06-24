document.addEventListener('DOMContentLoaded', function() {
  let apples = document.getElementById('apples');
  let message = document.getElementById('message');
  let replay = document.getElementById('replay');
  let spaces = document.getElementById('spaces');
  let guesses = document.getElementById('guesses');
  let body = document.body;

  const randomWord = function() {
    let words = ['apple', 'pear'];

    return function() {
      let idx = Math.floor(Math.random() * words.length);
      return words.splice(idx, 1)[0];
    }
  }();

  class Game {
    constructor() {
      this.word = randomWord();
      console.log(this.word);
      if (!this.word) {
        this.displayMessage(`Sorry, I've run out of words!`);
        replay.classList.add('hide');
        return;
      }
      this.letters = this.word.toUpperCase().split('');
      this.lettersRemaining = this.letters.length;
      this.incorrectGuesses = 0;
      this.lettersGuessed = [];
      this.allowedWrong = 6;
      this.clearBoard();
      this.createSpaces();
      document.addEventListener('keyup', handleKeypress);
    }

    clearBoard() {
      replay.classList.add('hide');
      body.classList.remove(...body.classList);
      this.clearSpaces(spaces);
      this.clearSpaces(guesses);
      this.displayMessage('');
    }

    clearSpaces(parent) {
      while (parent.lastChild.tagName === 'SPAN') {
        parent.removeChild(parent.lastChild);
      }
    }

    createSpaces() {
      this.letters.forEach(letter => spaces.appendChild(document.createElement('span')));
    }

    displayMessage(msg) {
      message.textContent = msg;
    }

    addGuess(letter) {
      this.lettersGuessed.push(letter.toUpperCase());
      let newSpan = document.createElement('span');
      newSpan.textContent = letter;
      guesses.appendChild(newSpan);
    }

    isGuessCorrect(letter) {
      return this.letters.includes(letter.toUpperCase());
    }

    processGuess(guess) {
      let letter = guess.toUpperCase();
      if (this.lettersGuessed.includes(letter)) return;
      this.addGuess(letter);

      if (this.isGuessCorrect(letter)) {
        this.processCorrect(letter);
      } else this.processIncorrect();
    }

    processCorrect(guess) {
      let slots = spaces.querySelectorAll('span');
      
      this.letters.forEach((letter, idx) => {
        if (guess === letter) {
          slots[idx].textContent = letter;
          this.lettersRemaining -= 1;
        }
      });

      if (this.isGameOver()) {
        this.displayMessage('You win!\n');
        document.body.classList.add('win');
        this.endGame();
      }
    }

    endGame() {
      document.removeEventListener('keyup', handleKeypress);
      replay.classList.remove('hide');
    }

    isGameOver() {
      return (this.incorrectGuesses === this.allowedWrong
        || this.lettersRemaining === 0);
    }

    processIncorrect() {
      this.removeApple();

      if (this.isGameOver()) {
        this.displayMessage('Sorry, you\'re out of guesses\n');
        document.body.classList.add('lose');
        this.endGame();
      }
    }

    removeApple() {
      apples.classList.remove(`guess_${this.incorrectGuesses}`);
      this.incorrectGuesses += 1;
      apples.classList.add(`guess_${this.incorrectGuesses}`);
    }
  }

  let game = new Game();

  replay.addEventListener('click', function() {game = new Game()});

  function handleKeypress(e) {
    let guess = e.key;
    if (guess.match(/[a-z]{1}/gi)) game.processGuess(guess);
  }
});