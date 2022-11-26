"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userToObject = void 0;
const userToObject = (user, hiddens = []) => {
    let u = {};
    for (const key in user) {
        if (Object.prototype.hasOwnProperty.call(user, key)) {
            if (!hiddens.includes(key)) {
                u[key] = user[key];
            }
        }
    }
    return u;
};
exports.userToObject = userToObject;
//# sourceMappingURL=utils.js.map