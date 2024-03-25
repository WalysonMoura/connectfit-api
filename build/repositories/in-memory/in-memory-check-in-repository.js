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

// src/repositories/in-memory/in-memory-check-in-repository.ts
var in_memory_check_in_repository_exports = {};
__export(in_memory_check_in_repository_exports, {
  InMemoryCheckInsRepository: () => InMemoryCheckInsRepository
});
module.exports = __toCommonJS(in_memory_check_in_repository_exports);
var import_crypto = require("crypto");
var import_dayjs = __toESM(require("dayjs"));
var InMemoryCheckInsRepository = class {
  checkIns = [];
  async countByUserId(userId) {
    return this.checkIns.filter((checkIn) => checkIn.user_id === userId).length;
  }
  async findById(id) {
    const checkIn = await this.checkIns.find((checkIn2) => checkIn2.id === id);
    if (!checkIn) {
      return null;
    }
    return checkIn;
  }
  async findManyByUserId(userId, page) {
    return this.checkIns.filter((check) => check.user_id === userId).splice((page - 1) * 20, page * 20);
  }
  async findByUserIdOnDate(userId, date) {
    const startOfTheDay = (0, import_dayjs.default)(date).startOf("date");
    const endOfTheDay = (0, import_dayjs.default)(date).endOf("date");
    const checkInOnSameDate = await this.checkIns.find((checkIn) => {
      const checkInDate = (0, import_dayjs.default)(checkIn.created_at);
      const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);
      return checkIn.user_id === userId && isOnSameDate;
    });
    if (!checkInOnSameDate) {
      return null;
    }
    return checkInOnSameDate;
  }
  async create({
    gym_id,
    user_id,
    validated_at
  }) {
    const checkIn = {
      id: (0, import_crypto.randomUUID)(),
      user_id,
      gym_id,
      validated_at: validated_at ? new Date(validated_at) : null,
      created_at: /* @__PURE__ */ new Date()
    };
    this.checkIns.push(checkIn);
    return checkIn;
  }
  async save(checkIn) {
    const checkInIndex = await this.checkIns.findIndex(
      (checkInIndex2) => checkInIndex2.id === checkIn.id
    );
    if (checkInIndex >= 0) {
      this.checkIns[checkInIndex] = checkIn;
    }
    return checkIn;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryCheckInsRepository
});
