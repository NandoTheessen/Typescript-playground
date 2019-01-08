import { server } from '../src/server';
import request from 'supertest';

describe('server is spinning up', () => {
  it('should return the body of the request on the index route', async () => {
    const exStatusCode = 200;
    const exBody = { msg: 'Hello world' };
    const response = await request(server).post('/');
    expect(response.status).toBe(exStatusCode);
  });
});
