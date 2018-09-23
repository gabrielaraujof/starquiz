function Game(service, { timerLimit }) {
  if (!(this instanceof Game)) {
    return new Game(service, { timerLimit });
  }

  const tipsTaken = [];
  const characterAnswered = [];
  let points = 0;
  let isRunning = false;
  let timer = timerLimit;


  const normalize = name => name.toLowerCase().trim().replace(/\s+/g, ' ');

  function isGuessCorrect(actual, guess) {
    return normalize(actual) === normalize(guess);
  }

  Game.prototype.isRunning = () => isRunning;

  Game.prototype.start = () => {
    isRunning = true;

    const intervalId = setInterval(() => {
      timer -= 1;
    }, 1000);

    setTimeout(() => {
      clearInterval(intervalId);
      isRunning = false;
    }, timer * 1000);
  };

  Game.prototype.guess = (characterId, guessName) => {
    if (!isRunning) throw Error('Your time has ended!');

    const character = service.get(characterId);
    if (!character) return;

    if (characterAnswered.indexOf(characterId) !== -1) {
      throw Error('Already answered this one!');
    }

    characterAnswered.push(characterId);

    if (isGuessCorrect(character.name, guessName)) {
      if (tipsTaken.indexOf(characterId) !== -1) {
        points += 5;
      } else {
        points += 10;
      }
    }
  };

  Game.prototype.getTips = (characterId) => {
    tipsTaken.push(characterId);
    const character = service.get(characterId);
    return character.tips;
  };

  Game.prototype.totalPoints = () => points;

  return this;
}

export default service => (...args) => Game(service, ...args);
