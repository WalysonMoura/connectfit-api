import { User } from "@prisma/client";
import { UsersRepository } from "../../repositories/users-repository";
import { invalidCredentialsError } from "../errors/invalid-credentials-error";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private usersRepositry: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepositry.findByEmail(email);

    if (!user) {
      throw new invalidCredentialsError();
    }


    
    return {
      user,
    };
  }
}
