import { Request, Response } from "express";
import { resolve } from "path";
import { getCustomRepository } from "typeorm";
import AppError from "../errors/AppError";
import SurveysRepository from "../repositories/SurveysRepository";
import SurveyUsersRepository from "../repositories/SurveyUsersRepository";
import UsersRepository from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";

class SendMailController {
    async execute(req: Request, res: Response) {
        const { email, survey_id } = req.body

        const usersRepository = getCustomRepository(UsersRepository)
        const surveyRepository = getCustomRepository(SurveysRepository)
        const surveyUsersRepository = getCustomRepository(SurveyUsersRepository)

        const user = await usersRepository.findOne({ email })

        if (!user) {
            throw new AppError('User does not exists')
        }

        const survey = await surveyRepository.findOne({ id: survey_id })

        if (!survey) {
            throw new AppError('Survey does not exist')
        }

        const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs')

        const surveyUserExists = await surveyUsersRepository.findOne({
            where: { user_id: user.id, value: null },
            relations: ['user', 'survey'],
        })

        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: '',
            link: process.env.URL_MAIL,
        }

        if (surveyUserExists) {
            variables.id = surveyUserExists.id

            await SendMailService.execute(email, survey.title, variables, npsPath)
            
            return res.json(surveyUserExists)
        }

        const surveyUser = surveyUsersRepository.create({
            user_id: user.id,
            survey_id,
        })

        await surveyUsersRepository.save(surveyUser)

        variables.id = surveyUser.id

        await SendMailService.execute(email, survey.title, variables, npsPath)

        return res.json(surveyUser)
    }
}

export default SendMailController
