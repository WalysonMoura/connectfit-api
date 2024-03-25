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

// src/repositories/in-memory/in-memory-users-repository.ts
var in_memory_users_repository_exports = {};
__export(in_memory_users_repository_exports, {
  InMemoryUsersRepositories: () => InMemoryUsersRepositories
});
module.exports = __toCommonJS(in_memory_users_repository_exports);
var import_crypto = require("crypto");
var InMemoryUsersRepositories = class {
  users = [];
  async create(data) {
    const user = {
      id: (0, import_crypto.randomUUID)(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: /* @__PURE__ */ new Date()
    };
    await this.users.push(user);
    return user;
  }
  async findByEmail(email) {
    const user = await this.users.find((user2) => user2.email === email);
    if (!user) {
      return null;
    }
    return user;
  }
  async findById(userId) {
    const user = await this.users.find((user2) => user2.id === userId);
    if (!user) {
      return null;
    }
    return user;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryUsersRepositories
});
