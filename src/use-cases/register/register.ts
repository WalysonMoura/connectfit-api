import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseRespose {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    name,
    password,
  }: RegisterUseCaseRequest) /* : Promise<RegisterUseCaseRespose> */ {
    
    const password_hash = await hash(password, 6);

    const user = this.usersRepository.create({
      email,
      name,
      password_hash,
    });

    return { user };
  }
}
