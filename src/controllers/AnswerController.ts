import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import SurveyUserRepository from '../repositories/SurveyUserRepository';

export default {
  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { id } = request.query;

    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    if (!id) {
      return response.status(400).json({ error: 'Id is required.' });
    }

    const surveyUser = await surveyUserRepository.findOne({ id: String(id) });

    if (!surveyUser) {
      return response.status(404).json({ error: 'Invalid survey for user.' });
    }

    surveyUser.value = Number(value);

    surveyUserRepository.save(surveyUser);

    return response.json({ surveyUser });
  }
};
