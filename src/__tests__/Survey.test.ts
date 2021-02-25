import request from 'supertest';
import { server } from '../server';

import createConnection from '../database';

describe('Surveys', () => {
  beforeAll(async() => {
    const connection = await createConnection();

    await connection.runMigrations();
  });

  it('should be able to create a new survey', async () => {
    const response = await request(server).post('/surveys').send({
      title: 'Title Example',
      description: 'Description example.',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should be able to get all surveys', async () => {
    await request(server).post('/surveys').send({
      title: 'Title Example2',
      description: 'Description example2.',
    });

    const response = await request(server).get('/surveys');

    expect(response.body.length).toBe(2);
    expect(response.status).toBe(200);
  });
});
