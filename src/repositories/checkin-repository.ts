import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInRepository {
  countByUserId: (userId: string) => Promise<number>;
  create: (data: Prisma.CheckInUncheckedCreateInput) => Promise<CheckIn>;
  findById: (id: string) => Promise<CheckIn | null>;
  findManyByUserId: (userId: string, page: number) => Promise<CheckIn[]>;
  findByUserIdOnDate: (userId: string, date: Date) => Promise<CheckIn | null>;
  save: (CheckIn: CheckIn) => Promise<CheckIn>;
}
