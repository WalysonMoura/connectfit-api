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

// src/use-cases/validate-check-ins/index.ts
var validate_check_ins_exports = {};
__export(validate_check_ins_exports, {
  ValidateCheckInsUseCase: () => ValidateCheckInsUseCase
});
module.exports = __toCommonJS(validate_check_ins_exports);

// src/use-cases/erros/resource-not-found-error.ts
var ResourceNotFound = class extends Error {
  constructor() {
    super("Resource not found.");
  }
};

// src/use-cases/validate-check-ins/index.ts
var import_dayjs = __toESM(require("dayjs"));

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
    const distaceInMinutesFromInCreation = (0, import_dayjs.default)(/* @__PURE__ */ new Date()).diff(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ValidateCheckInsUseCase
});
