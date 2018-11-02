const request = require('supertest');

let app;

describe('Test the root path', () => {
  const oldToken = process.env.TOKEN;

    beforeEach(() => {
      process.env.TOKEN = 'verification-token';

      jest.resetModules();
      app = require('../app');
    });

    test('It should provide a response to the GET method without matching token', () => {
        return request(app).get('/').expect(401);
    });

    test('It should provide a response to the GET method with matching token', async () => {

        await request(app).get('/').query({token: 'verification-token'}).expect(200);

    });
})
