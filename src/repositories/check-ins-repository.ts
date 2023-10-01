import { ChechIn, Prisma } from "@prisma/client";

export interface CheckInsRepository {
  findById(id: string): Promise<ChechIn | null>;
  create(data: Prisma.ChechInUncheckedCreateInput): Promise<ChechIn>;
  findManyByUserId(userId: string, page: number): Promise<ChechIn[]>;
  findByUserIdOnDate(userId: string, date: Date): Promise<ChechIn | null>;
  countByUserId(userId: string): Promise<number>;
  save(checkIn: ChechIn): Promise<ChechIn>;
}
