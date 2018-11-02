import makeService from '../src/js/swapi';
import charactersMock from './__mocks__/characters.json';

const { fetch: fetchGlobal } = global;

describe('Service', () => {
  const Service = makeService('https://swapi.co/api');
  let service;

  beforeEach(() => {
    global.fetch = jest.fn(() => ({
      json: jest.fn(() => charactersMock),
    }));
    service = new Service();
  });

  test('is defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    test('10 characters at time', async () => {
      await expect(service.getAll()).resolves.toHaveLength(10);
    });
  });
});

afterAll(() => {
  global.fetch = fetchGlobal;
});
