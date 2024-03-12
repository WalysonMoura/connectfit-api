import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFound } from "../erros/resource-not-found-error";

interface GetUserProfileUserCaseRequest {
  userId: string;
}
interface GetUserProfileUserCaseResponse {
  user: User;
}

export class GetUserProfileUserCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUserCaseRequest): Promise<GetUserProfileUserCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFound();
    }

    return {
      user,
    };
  }
}
