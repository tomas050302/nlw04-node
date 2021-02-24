import request from 'supertest';
import faker from 'faker';

import app from '../src/server';

import createConnection from '../src/database';

describe('User CRUD', () => {
  beforeAll(async () => {
    const connection = await createConnection();

    await connection.runMigrations();
  });

  it('should create a new user', async () => {
    const response = await request(app).post('/user').send({
      name: faker.name.findName(),
      email: faker.internet.email()
    });

    expect(response.status).toBe(201);
  });
});
