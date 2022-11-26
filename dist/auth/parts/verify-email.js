"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyEmail = void 0;
class VerifyEmail {
    constructor(auth, userId, exp) {
        this.expires = 60;
        this.auth = auth;
        this.userId = userId;
        if (exp) {
            this.expires = exp;
        }
    }
    generate() {
        return this.createToken();
    }
    createToken() {
        return this.auth.email;
    }
    verify(token) {
        return false;
    }
}
exports.VerifyEmail = VerifyEmail;
//# sourceMappingURL=verify-email.js.map