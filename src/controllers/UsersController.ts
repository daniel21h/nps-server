import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import * as Yup from 'yup';
import { AppError } from '../errors/AppError';

class UsersController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const schema = Yup.object().shape({
      name: Yup.string().required('Name is Required!'),
      email: Yup.string().email('This is not an email.').required('Email is required!')
    })

    // Validation
    // if (!(await schema.isValid(request.body))) {
    //   return response.status(400).json({
    //     error: 'Validation Failed!'
    //   })
    // }

    // Validation
    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ errors: err.errors })
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await usersRepository.findOne({
      email
    });

    if (userAlreadyExists) {
      throw new AppError('User Already exists.')
    }

    const user = usersRepository.create({
      name,
      email
    });

    await usersRepository.save(user);

    return response.status(201).json(user);
  }
}

export { UsersController };
