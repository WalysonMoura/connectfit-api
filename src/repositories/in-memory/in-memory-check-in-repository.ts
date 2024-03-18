import { CheckIn, Prisma } from "@prisma/client";
import { CheckInRepository } from "../checkin-repository";
import { randomUUID } from "crypto";

export class InMemoryCheckInsRepository implements CheckInRepository {
  public checkIns: CheckIn[] = [];

  async countByUserId(userId: string): Promise<number> {
    return this.checkIns.filter((checkIn) => checkIn.user_id === userId).length;
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    return this.checkIns
      .filter((check) => check.user_id === userId)
      .splice((page - 1) * 20, page * 20);
  }

  async create({
    gym_id,
    user_id,
    validated_at,
  }: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      user_id,
      gym_id,
      validated_at: validated_at ? new Date(validated_at) : null,
      created_at: new Date(),
    };

    this.checkIns.push(checkIn);

    return checkIn;
  }

}
