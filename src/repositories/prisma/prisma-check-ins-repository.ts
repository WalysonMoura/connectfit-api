import { CheckIn, Prisma } from "@prisma/client";
import { CheckInRepository } from "../checkin-repository";
import { prisma } from "@/lib/prisma";

export class PrimsCheckInsRepository implements CheckInRepository {
  async countByUserId(userId: string) {}
  async create(data: Prisma.CheckInUncheckedCreateInput) {}
  async findById(id: string) {}
  async findManyByUserId(userId: string, page: number) {}
  async findByUserIdOnDate(userId: string, date: Date) {}
  async save(data: CheckIn) {}
}
