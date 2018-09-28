import makeQuiz from '../src/js/game';

const charactersMock = {
  1: { name: 'Luke Skywalker' },
  2: { name: 'Han Solo' },
  3: { name: 'Leia Organa' },
  4: { name: 'Chewbacca' },
};

const service = {
  get: i => charactersMock[i],
};

const quizOpts = {
  timerLimit: 2,
};

describe('Quiz', () => {
  const SWQuiz = makeQuiz(service);
  let quiz;

  beforeEach(() => {
    quiz = new SWQuiz(quizOpts);
  });

  test('is defined', () => {
    expect(quiz).toBeDefined();
  });

  test('is not yet running on creation', () => {
    expect(quiz.isRunning()).toBeFalsy();
  });

  test('starts with 0 points', () => {
    expect(quiz.totalPoints()).toBe(0);
  });

  test('can\'t accept guess before start game', () => {
    expect(quiz.isRunning()).toBeFalsy();
    expect(() => quiz.guess(1, 'Luke')).toThrow();
  });

  describe('not finished', () => {
    beforeEach(() => {
      quiz.start();
    });

    test('is expect to be playing after start game', () => {
      expect(quiz.isRunning()).toBeTruthy();
    });

    test('rewards with 10 points for correct guess and no tips', () => {
      quiz.getTips(3); // different character tip
      quiz.guess(1, 'luke skywalker');
      expect(quiz.totalPoints()).toBe(10);
    });

    test('rewards with 5 points for correct guess with tips', () => {
      quiz.getTips(1);
      quiz.guess(1, 'luke skywalker');
      expect(quiz.totalPoints()).toBe(5);
    });

    test('don\'t penalize the points for wrong guesses', () => {
      quiz.guess(1, 'Luke skywalker');
      expect(quiz.totalPoints()).toBe(10);
      quiz.guess(2, 'bla bla bla');
      quiz.guess(3, 'bla bla bla');
      quiz.guess(4, 'bla bla bla');
      expect(quiz.totalPoints()).toBe(10);
    });

    test('can\'t accept guess for same character more than once', () => {
      quiz.guess(1, 'Luke skywalker');
      expect(() => quiz.guess(1, 'Luke skywalker')).toThrow();
    });
  });

  describe('finished', () => {
    beforeEach(() => {
      jest.useFakeTimers();

      quiz.start();
      jest.runTimersToTime((quizOpts.timerLimit * 1000));
    });

    test('can\'t accept any more guesses', (done) => {
      expect(quiz.isRunning()).toBeFalsy();
      expect(() => quiz.guess(1, 'Luke')).toThrow();
      done();
    });
  });
});
