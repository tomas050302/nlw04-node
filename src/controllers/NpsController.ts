import { Request, Response } from 'express';

import { getCustomRepository, Not, IsNull } from 'typeorm';
import SurveyUserRepository from '../repositories/SurveyUserRepository';

export default {
  async execute(request: Request, response: Response) {
    const { survey_id } = request.params;

    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const surveyUsers = await surveyUserRepository.find({
      survey_id,
      value: Not(IsNull())
    });

    const nOfDetractors = surveyUsers.filter(
      survey => survey.value >= 0 && survey.value <= 6
    ).length;

    const nOfPassives = surveyUsers.filter(
      survey => survey.value >= 7 && survey.value <= 8
    ).length;

    const nOfPromoters = surveyUsers.filter(
      survey => survey.value >= 9 && survey.value <= 10
    ).length;

    const totalAnswers = surveyUsers.length;

    const nps = (nOfPromoters - nOfDetractors) / totalAnswers;

    const npsPercentage = (nps * 100).toFixed(2);

    return response.json({
      nOfDetractors,
      nOfPassives,
      nOfPromoters,
      totalAnswers,
      npsPercentage
    });
  }
};
