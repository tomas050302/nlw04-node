import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import SurveyRepository from '../repositories/SurveyRepository';

export default {
  async index(request: Request, response: Response) {
    const surveyRepository = getCustomRepository(SurveyRepository);

    const surveys = await surveyRepository.find();

    return response.json(surveys);
  },

  async store(request: Request, response: Response) {
    const { title, description } = request.body;

    const surveyRepository = getCustomRepository(SurveyRepository);

    const survey = surveyRepository.create({
      title,
      description
    });

    try {
      const data = await surveyRepository.save(survey);

      return response.status(201).json(data);
    } catch (err) {
      return response.status(400).json(err);
    }
  }
};
