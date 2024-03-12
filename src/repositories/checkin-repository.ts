import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInRepository {
  countByUserId: (userId: string) => Promise<number>;
  create: (data: Prisma.CheckInUncheckedCreateInput) => Promise<CheckIn>;
}
