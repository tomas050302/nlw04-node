import request from 'supertest';
import faker from 'faker';

import app from '../src/server';

import createConnection from '../src/database';
import { getConnection } from 'typeorm';

describe('User', () => {
  beforeAll(async () => {
    const connection = await createConnection();

    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = await getConnection();

    await connection.dropDatabase();
    await connection.close();
  });

  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.exampleEmail(firstName, lastName);

  it('should create a new user', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        name: `${firstName} ${lastName}`,
        email
      });

    expect(response.status).toBe(201);
  });

  it('should not allow creation of user with same email', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        name: `${firstName} ${lastName}`,
        email
      });

    expect(response.status).toBe(400);
  });
});
