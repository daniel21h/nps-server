import request from 'supertest';
import { server } from '../server';

import createConnection from '../database';
import { getConnection } from 'typeorm';

describe('Users', () => {
  beforeAll(async() => {
    const connection = await createConnection();

    await connection.runMigrations();
  });

  // DropDatabase
  afterAll(async () => {
    const connection = getConnection()

    await connection.dropDatabase()
    await connection.close()
  })

  it('should be able to create a new user', async () => {
    const response = await request(server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
    });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a user with exists email', async () => {
    const response = await request(server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
    });

    expect(response.status).toBe(400);
  });
});
