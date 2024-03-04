import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInRepository {
  findyById: () => Promise<CheckIn | null>;
  findByUserIdOnDate: (userId: string, date: Date) => Promise<CheckIn | null>;
  findManyByUserId: (userId: string, page: number) => Promise<CheckIn[]>;
  countByUserId: (userId: string) => Promise<number>;
  create: (data: Prisma.CheckInCreateInput) => Promise<CheckIn>;
  save: (checkIn: CheckIn) => Promise<CheckIn>;
}
