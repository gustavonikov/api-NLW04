import { Request, Response } from "express";
import { getCustomRepository, IsNull, Not } from "typeorm";
import SurveyUsersRepository from "../repositories/SurveyUsersRepository";

class NpsController {
    async execute(req: Request, res: Response) {
        const { survey_id } = req.params

        const surveyUsersRepository = getCustomRepository(SurveyUsersRepository)

        const surveyUsers = await surveyUsersRepository.find({
            survey_id,
            value: Not(IsNull()),
        })

        const detractors = surveyUsers.filter(survey => {
            return (survey.value >= 0 && survey.value <= 6)
        }).length

        const promoters = surveyUsers.filter(survey => {
            return (survey.value >=  9 && survey.value <= 10)
        }).length

        const passive = surveyUsers.filter(survey => {
            return (survey.value >= 7 && survey.value <= 8)
        }).length

        const totalAnswers = surveyUsers.length

        const calculate = Number((((promoters - detractors) / totalAnswers) * 100).toFixed(2))

        return res.json({
            detractors,
            promoters,
            passive,
            totalAnswers,
            nps: calculate
        })
    }
}

export default NpsController
