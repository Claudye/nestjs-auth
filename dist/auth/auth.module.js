"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const users_module_1 = require("../users/users.module");
const auth_service_1 = require("./auth.service");
const jwt_1 = require("@nestjs/jwt");
const auth_controller_1 = require("./auth.controller");
const strategy_1 = require("./strategy");
const hash_module_1 = require("../hash/hash.module");
const env_1 = require("../constants/env");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: env_1.JWT_AUTH_KEY
            }),
            hash_module_1.HashModule
        ],
        providers: [auth_service_1.AuthService, strategy_1.JwtStrategy],
        controllers: [auth_controller_1.AuthController]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map