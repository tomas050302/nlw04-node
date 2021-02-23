import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';

export default {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const userRepository = getRepository(User);

    const userAlreadyExists = await userRepository.findOne({ email });

    if (userAlreadyExists) {
      return response.status(400).json({ error: 'User already exists' });
    }

    const user = userRepository.create({
      name,
      email
    });

    try {
      const data = await userRepository.save(user);

      return response.status(200).json(data);
    } catch (err) {
      return response.status(400).json(err);
    }
  }
};
