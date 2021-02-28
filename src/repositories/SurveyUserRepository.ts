import { EntityRepository, Repository } from 'typeorm';

import SurveyUser from '../models/SurveyUser';

@EntityRepository(SurveyUser)
export default class SurveyUserRepository extends Repository<SurveyUser> {}
