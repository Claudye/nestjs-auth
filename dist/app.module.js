"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const auth_service_1 = require("./auth/auth.service");
const users_module_1 = require("./users/users.module");
const jwt_1 = require("@nestjs/jwt");
const User_1 = require("./users/entities/User");
const hash_module_1 = require("./hash/hash.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, users_module_1.UsersModule, typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                database: 'nest_auth',
                port: 3306,
                username: 'root',
                password: '',
                synchronize: true,
                entities: [User_1.User]
            }), hash_module_1.HashModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, auth_service_1.AuthService, jwt_1.JwtService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map