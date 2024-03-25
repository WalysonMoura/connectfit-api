"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/http/controller/check-ins/routes.ts
var routes_exports = {};
__export(routes_exports, {
  checkInsRoutes: () => checkInsRoutes
});
module.exports = __toCommonJS(routes_exports);

// src/http/middlewares/verify-jwt.ts
async function verifyTwt(request, reply) {
  try {
    await request.jwtVerify();
  } catch (error) {
    return reply.status(401).send({ message: "Uanuthorized." });
  }
}

// src/http/middlewares/verify-user-role.ts
function verifyUserRole(roleToVerify) {
  return async (request, reply) => {
    const { role } = request.user;
    if (role !== roleToVerify) {
      return reply.status(401).send({ message: "Uanuthorized." });
    }
  };
}

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["dev", "test", "production"]).default("dev"),
  JWT_SECRET: import_zod.z.string(),
  PORT: import_zod.z.coerce.number().default(3333)
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("\u274C Invalid environment variables", _env.error.format());
  throw new Error("Invalid environment variables.");
}
var env = _env.data;

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: env.NODE_ENV === "dev" ? ["query", "error"] : []
});

// src/repositories/prisma/prisma-gyms-repository.ts
var PrismaGymsRepository = class {
  async create(data) {
    const gym = await prisma.gym.create({
      data
    });
    return gym;
  }
  async findById(id) {
    const gym = await prisma.gym.findUnique({
      where: { id }
    });
    return gym;
  }
  async searchMany(query, page) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query
        }
      },
      take: 20,
      skip: (page - 1) * 20
    });
    return gyms;
  }
  async findManyNearby({ latitude, longitude }) {
    const gyms = await prisma.$queryRaw`
    SELECT * FROM gyms WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;
    return gyms;
  }
};

// src/use-cases/erros/resource-not-found-error.ts
var ResourceNotFound = class extends Error {
  constructor() {
    super("Resource not found.");
  }
};

// src/utils/get-distance-between-coordinates.ts
function getDistaceBetweenCoordinates(from, to) {
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0;
  }
  const fromRadian = Math.PI * from.latitude / 180;
  const toRadian = Math.PI * to.latitude / 180;
  const theta = from.longitude - to.longitude;
  const radTheta = Math.PI * theta / 180;
  let dist = Math.sin(fromRadian) * Math.sin(toRadian) + Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344;
  return dist;
}

// src/use-cases/erros/max-distance-erros.ts
var MaxDistanceError = class extends Error {
  constructor() {
    super("Max distance reaced.");
  }
};

// src/use-cases/erros/max-number-check-ins-error.ts
var MaxNumberCheckInsError = class extends Error {
  constructor() {
    super("Max number check-ins reaced.");
  }
};

// src/use-cases/check-in/index.ts
var CheckInUseCase = class {
  constructor(checkInsRepository, gymsRepository) {
    this.checkInsRepository = checkInsRepository;
    this.gymsRepository = gymsRepository;
  }
  async execute({
    gymId,
    userId,
    userLatitude,
    userLongitude
  }) {
    const gym = await this.gymsRepository.findById(gymId);
    if (!gym) {
      throw new ResourceNotFound();
    }
    const distance = await getDistaceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    );
    const MAX_DISTANCE_IN_KILOMETERS = 0.1;
    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError();
    }
    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      /* @__PURE__ */ new Date()
    );
    if (checkInOnSameDay) {
      throw new MaxNumberCheckInsError();
    }
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId
    });
    return {
      checkIn
    };
  }
};

// src/repositories/prisma/prisma-check-ins-repository.ts
var import_dayjs = __toESM(require("dayjs"));
var PrimsCheckInsRepository = class {
  async countByUserId(userId) {
    const count = await prisma.checkIn.count({
      where: { user_id: userId }
    });
    return count;
  }
  async create(data) {
    const checkIn = await prisma.checkIn.create({
      data
    });
    return checkIn;
  }
  async findById(id) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id
      }
    });
    return checkIn;
  }
  async findManyByUserId(userId, page) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId
      },
      take: 20,
      skip: (page - 1) * 20
    });
    return checkIns;
  }
  async findByUserIdOnDate(userId, date) {
    const startOfTheDay = (0, import_dayjs.default)(date).startOf("date");
    const endOfTheDay = (0, import_dayjs.default)(date).startOf("date");
    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate()
        }
      }
    });
    return checkIn;
  }
  async save(data) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id
      },
      data
    });
    return checkIn;
  }
};

// src/use-cases/factory/make-check-in-use-case.ts
function makeCheckInUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const checkInsRepository = new PrimsCheckInsRepository();
  const checkInUseCase = new CheckInUseCase(checkInsRepository, gymsRepository);
  return checkInUseCase;
}

// src/http/controller/check-ins/create.ts
var import_zod2 = require("zod");
async function create(request, reply) {
  const createCheckInsParamsSchema = import_zod2.z.object({
    gymId: import_zod2.z.string().uuid()
  });
  const createCheckInsBodySchema = import_zod2.z.object({
    latitude: import_zod2.z.coerce.number().refine((value) => {
      Math.abs(value) <= 90;
    }),
    longitude: import_zod2.z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    })
  });
  const { latitude, longitude } = createCheckInsBodySchema.parse(request.body);
  const { gymId } = createCheckInsParamsSchema.parse(request.params);
  const checkInUseCase = makeCheckInUseCase();
  const { checkIn } = await checkInUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude
  });
  return reply.status(201).send();
}

// src/use-cases/validate-check-ins/index.ts
var import_dayjs2 = __toESM(require("dayjs"));

// src/use-cases/erros/late-check-in-validate-error.ts
var LateCheckInValidateError = class extends Error {
  constructor() {
    super("The check in can only be validate until 20 minutes if its creation");
  }
};

// src/use-cases/validate-check-ins/index.ts
var ValidateCheckInsUseCase = class {
  constructor(checkInsRepository) {
    this.checkInsRepository = checkInsRepository;
  }
  async execute({
    checkInId
  }) {
    const checkIn = await this.checkInsRepository.findById(checkInId);
    if (!checkIn) {
      throw new ResourceNotFound();
    }
    const distaceInMinutesFromInCreation = (0, import_dayjs2.default)(/* @__PURE__ */ new Date()).diff(
      checkIn.created_at,
      "minutes"
    );
    if (distaceInMinutesFromInCreation > 20) {
      throw new LateCheckInValidateError();
    }
    checkIn.validated_at = /* @__PURE__ */ new Date();
    await this.checkInsRepository.save(checkIn);
    return {
      checkIn
    };
  }
};

// src/use-cases/factory/make-validate-check-ins-use-case.ts
function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrimsCheckInsRepository();
  const validateCheckInUseCase = new ValidateCheckInsUseCase(
    checkInsRepository
  );
  return validateCheckInUseCase;
}

// src/http/controller/check-ins/validate.ts
var import_zod3 = require("zod");
async function validade(request, reply) {
  const validadeCheckInParamsSchema = import_zod3.z.object({
    checkInId: import_zod3.z.string().uuid()
  });
  const { checkInId } = validadeCheckInParamsSchema.parse(request.params);
  const validadeCheckInUseCase = makeValidateCheckInUseCase();
  const {} = await validadeCheckInUseCase.execute({
    checkInId
  });
  return reply.status(204).send();
}

// src/http/controller/check-ins/routes.ts
async function checkInsRoutes(app) {
  app.addHook("onRequest", verifyTwt);
  app.get("/check-ins/history");
  app.get("/check-ins/metrics");
  app.post("/gyms/:gymId/check-ins", create);
  app.patch(
    "/check-ins/:checkInId/validate",
    {
      onRequest: [verifyUserRole("ADMIN")]
    },
    validade
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkInsRoutes
});
