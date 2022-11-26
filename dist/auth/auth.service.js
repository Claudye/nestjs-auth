"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const env_1 = require("../constants/env");
const hash_service_1 = require("../hash/hash.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, hashService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.hashService = hashService;
    }
    async attempt(email, password) {
        const user = await this.usersService.findByEmail(email);
        if (user && this.checkPassword(user.password, password)) {
            return user;
        }
        return null;
    }
    async login(data) {
        const user = await this.attempt(data.email, data.password);
        if (user) {
            return await this.signAccessToken(user.id, user.email);
        }
        throw new common_1.UnauthorizedException();
    }
    async register(registerUserDto) {
        const hash = await this.hashService.hash(registerUserDto.password);
        registerUserDto.password = hash;
        const user = await this.usersService.create(registerUserDto);
        return this.signAccessToken(user.id, user.email);
    }
    auth(accessToken) {
        const payload = this.jwtService.decode(accessToken.access_token);
        return payload;
    }
    async resetPassword(email, pass, oldpass) {
        const user = await this.usersService.findByEmail(email);
        const throw403 = () => {
            throw new common_1.UnauthorizedException();
        };
        if (!user) {
            throw403();
        }
        if (!this.checkPassword(user.password, oldpass)) {
            throw403();
        }
        this.usersService.update();
    }
    checkPassword(hash, password) {
        return this.hashService.check(hash, password);
    }
    hash(str) {
        return this.hashService.hash(str);
    }
    async signAccessToken(userId, email) {
        const payload = { sub: userId, email: email };
        return {
            access_token: await this.jwtService.signAsync(payload, { secret: env_1.JWT_AUTH_KEY, expiresIn: '172800m' })
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        hash_service_1.HashService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map