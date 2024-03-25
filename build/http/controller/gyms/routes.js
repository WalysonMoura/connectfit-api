"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/http/controller/gyms/routes.ts
var routes_exports = {};
__export(routes_exports, {
  gymsRoutes: () => gymsRoutes
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

// src/use-cases/search-gyms/index.ts
var SearchGymUseCase = class {
  constructor(gymsRepository) {
    this.gymsRepository = gymsRepository;
  }
  async execute({
    page,
    query
  }) {
    const gyms = await this.gymsRepository.searchMany(query, page);
    return {
      gyms
    };
  }
};

// src/use-cases/factory/make-search-gyms-use-case.ts
function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const searchGymsUseCase = new SearchGymUseCase(gymsRepository);
  return searchGymsUseCase;
}

// src/http/controller/gyms/search.ts
var import_zod2 = require("zod");
async function search(request, reply) {
  const searchGymBodySchema = import_zod2.z.object({
    q: import_zod2.z.string(),
    page: import_zod2.z.coerce.number().min(1).default(1)
  });
  const { page, q } = searchGymBodySchema.parse(request.body);
  const searchUseCase = makeSearchGymsUseCase();
  const { gyms } = await searchUseCase.execute({
    page,
    query: q
  });
  return reply.status(200).send({ gyms });
}

// src/use-cases/fetch-nearby-gyms/index.ts
var FetchNearbyGymsUseCase = class {
  constructor(gymsRepository) {
    this.gymsRepository = gymsRepository;
  }
  async execute({
    userLatitude,
    userLogitude
  }) {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLogitude
    });
    return {
      gyms
    };
  }
};

// src/use-cases/factory/make-fetch-nearby-gyms-use-case.ts
function makeFetchNearbyGyms() {
  const gymsRepository = new PrismaGymsRepository();
  const fetchNearbyGyms = new FetchNearbyGymsUseCase(gymsRepository);
  return fetchNearbyGyms;
}

// src/http/controller/gyms/nearby.ts
var import_zod3 = require("zod");
async function nearby(request, reply) {
  const nearbyGymsQuerySchema = import_zod3.z.object({
    latitude: import_zod3.z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: import_zod3.z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    })
  });
  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query);
  const searchGymUseCase = makeFetchNearbyGyms();
  const { gyms } = await searchGymUseCase.execute({
    userLatitude: latitude,
    userLogitude: longitude
  });
  return reply.status(201).send({ gyms });
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

// src/use-cases/create-gym/index.ts
var CreateGymUseCase = class {
  constructor(gymsRepository) {
    this.gymsRepository = gymsRepository;
  }
  async execute({
    description,
    latitude,
    longitude,
    phone,
    title
  }) {
    const gym = await this.gymsRepository.create({
      latitude,
      longitude,
      title,
      description,
      phone
    });
    return {
      gym
    };
  }
};

// src/use-cases/factory/make-create-gym-use-case.ts
function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const createGym = new CreateGymUseCase(gymsRepository);
  return createGym;
}

// src/http/controller/gyms/create.ts
var import_zod4 = require("zod");
async function create(request, reply) {
  const createGymBodySchema = import_zod4.z.object({
    title: import_zod4.z.string(),
    description: import_zod4.z.string().nullable(),
    phone: import_zod4.z.string().nullable(),
    latitude: import_zod4.z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: import_zod4.z.number().refine((value) => {
      return Math.abs(value) <= 100;
    })
  });
  const { description, latitude, longitude, phone, title } = createGymBodySchema.parse(request.body);
  const createGymUseCase = makeCreateGymUseCase();
  await createGymUseCase.execute({
    description,
    latitude,
    longitude,
    phone,
    title
  });
  return reply.status(201).send();
}

// src/http/controller/gyms/routes.ts
async function gymsRoutes(app) {
  app.addHook("onRequest", verifyTwt);
  app.get("/gyms/search", search);
  app.get("/gyms/nearby", nearby);
  app.post("/gyms", { onRequest: [verifyUserRole("ADMIN")] }, create);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  gymsRoutes
});
