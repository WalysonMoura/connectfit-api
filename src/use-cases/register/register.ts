import { User } from "@prisma/client";
import { UsersRepository } from "../../repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExists } from "../erros/user-already-exists";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}
interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    email,
    name,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExists();
    }

    const password_hash = await hash(password, 6);

    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
    });

    return {
      user,
    };
  }
}
