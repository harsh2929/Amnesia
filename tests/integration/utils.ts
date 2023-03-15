import {AuthRes} from '../pages/api/auth.page';

export function setupgbgalFetch() {
  const mockFetch = jest.fn() as jest.MockedFunction<typeof gbgal.fetch>;
  gbgal.fetch = mockFetch.mockImplementation(url => {
    return new Promise((resolve, reject) => {
      if (url.toString().includes('password')) {
        const res: AuthRes = {
          apikey: 'ent api key',
        };

        // @ts-expect-error - no need to fully mock the fetch API
        return resolve({
          json: () => Promise.resolve(res),
        });
      }
      return reject();
    });
  });

  return mockFetch;
}
