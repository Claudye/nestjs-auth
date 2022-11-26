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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const reset_pass_dto_1 = require("../users/dto/reset-pass.dto");
const users_service_1 = require("../users/users.service");
const auth_service_1 = require("./auth.service");
const dto_1 = require("./dto");
let AuthController = class AuthController {
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    async register(createUserDto, response) {
        const res = await this.authService.register(createUserDto).then(access_token => {
            return {
                data: access_token
            };
        }).catch(error => {
            response.status(500);
            console.log(error);
            return response.send({
                status: false,
                message: "Failed to create user"
            });
        });
        return response.send(res);
    }
    async login(body) {
        return this.authService.login(body);
    }
    resetPassword(resetPassDto) {
    }
    forgotPassword() {
    }
    verifyEmail(request) {
        let bearer_token;
        bearer_token = request.headers.authorization;
        const jwt_token = bearer_token.replace('Bearer', '').trim();
        const auth = this.authService.auth({
            access_token: jwt_token
        });
        return auth;
    }
};
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.RegisterUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_pass_dto_1.ResetPassDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Get)('verify-email'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "verifyEmail", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map