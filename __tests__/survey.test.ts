import request from 'supertest';
import faker from 'faker';

import app from '../src/server';

import createConnection from '../src/database';

describe('Surveys', () => {
  beforeAll(async () => {
    const connection = await createConnection();

    await connection.runMigrations();
  });

  it('should be able to create a new survey', async () => {
    const response = await request(app).post('/survey').send({
      title: faker.random.words(),
      description: faker.random.words()
    });

    expect(response.status).toBe(201);
  });

  it('should be able to list all surveys', async () => {
    // Create another survey data
    await request(app).post('/survey').send({
      title: faker.random.words(),
      description: faker.random.words()
    });

    const response = await request(app).get('/survey');

    expect(response.body.length).toBe(2);
  });
});
