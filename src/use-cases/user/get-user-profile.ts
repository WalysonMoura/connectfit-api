import { User } from "@prisma/client";
import { UsersRepository } from "../../repositories/users-repository";
import { ResourceNotFoundErro } from "../errors/resource-not-found-error";

interface GetUserUseCaseRequest {
  userId: string;
}

interface GetUserUseCaseResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundErro();
    }

    return {
      user,
    };
  }
}
