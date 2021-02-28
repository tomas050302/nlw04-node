import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import UserRepository from '../repositories/UserRepository';
import SurveyRepository from '../repositories/SurveyRepository';
import SurveyUserRepository from '../repositories/SurveyUserRepository';
import SendMailService from '../services/SendMailService';

export default {
  async execute(request: Request, response: Response) {
    const { email, title } = request.body;

    const userRepository = getCustomRepository(UserRepository);
    const surveyRepository = getCustomRepository(SurveyRepository);
    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const existingUser = await userRepository.findOne({ email });

    if (!existingUser)
      return response.status(400).json({ error: 'User not found' });

    const existingSurvey = await surveyRepository.findOne({ title });

    if (!existingSurvey)
      return response.status(400).json({ error: 'Survey not found' });

    try {
      const surveyUser = surveyUserRepository.create({
        user_id: existingUser.id,
        survey_id: existingSurvey.id
      });

      await surveyUserRepository.save(surveyUser);

      await SendMailService.execute(
        email,
        existingSurvey.title,
        existingSurvey.description
      );

      return response.status(201).json(surveyUser);
    } catch (err) {
      return response.status(400).json(err);
    }
  }
};
