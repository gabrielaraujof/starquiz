import makeService from '../src/js/swapi';

fetch = jest.fn(); // eslint-disable-line no-global-assign

const baseUrl = 'https://example.com/api';

describe('Service', () => {
  const Service = makeService(baseUrl);
  let service;

  beforeEach(() => {
    service = new Service();
  });

  test('is defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    beforeEach(() => {
      fetch.mockReturnValue(Promise.resolve({
        json: () => Promise.resolve({
          results: [
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ],
        }),
      }));
    });

    test('10 characters at time', async () => {
      await expect(service.getAll()).resolves.toHaveLength(10);
    });
  });
});
