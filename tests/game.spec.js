import makeGame from '../src/js/game';

const charactersMock = {
  1: { name: 'Luke Skywalker' },
  2: { name: 'Han Solo' },
  3: { name: 'Leia Organa' },
  4: { name: 'Chewbacca' },
};

const service = {
  get: i => charactersMock[i],
};

const gameOpts = {
  timerLimit: 2,
};

describe('Game', () => {
  const Game = makeGame(service);
  let game;

  beforeEach(() => {
    game = new Game(gameOpts);
  });

  test('is defined', () => {
    expect(game).toBeDefined();
  });

  test('is not yet running on creation', () => {
    expect(game.isRunning()).toBeFalsy();
  });

  test('starts with 0 points', () => {
    expect(game.totalPoints()).toBe(0);
  });

  test('can\'t accept guess before start game', () => {
    expect(game.isRunning()).toBeFalsy();
    expect(() => game.guess(1, 'Luke')).toThrow();
  });

  describe('not finished', () => {
    beforeEach(() => {
      game.start();
    });

    test('is expect to be playing after start game', () => {
      expect(game.isRunning()).toBeTruthy();
    });

    test('rewards with 10 points for correct guess and no tips', () => {
      game.getTips(3); // different character tip
      game.guess(1, 'luke skywalker');
      expect(game.totalPoints()).toBe(10);
    });

    test('rewards with 5 points for correct guess with tips', () => {
      game.getTips(1);
      game.guess(1, 'luke skywalker');
      expect(game.totalPoints()).toBe(5);
    });

    test('don\'t penalize the points for wrong guesses', () => {
      game.guess(1, 'Luke skywalker');
      expect(game.totalPoints()).toBe(10);
      game.guess(2, 'bla bla bla');
      game.guess(3, 'bla bla bla');
      game.guess(4, 'bla bla bla');
      expect(game.totalPoints()).toBe(10);
    });

    test('can\'t accept guess for same character more than once', () => {
      game.guess(1, 'Luke skywalker');
      expect(() => game.guess(1, 'Luke skywalker')).toThrow();
    });
  });

  describe('finished', () => {
    beforeEach(() => {
      jest.useFakeTimers();

      game.start();
      jest.runTimersToTime((gameOpts.timerLimit * 1000));
    });

    test('can\'t accept any more guesses', (done) => {
      expect(game.isRunning()).toBeFalsy();
      expect(() => game.guess(1, 'Luke')).toThrow();
      done();
    });
  });
});
