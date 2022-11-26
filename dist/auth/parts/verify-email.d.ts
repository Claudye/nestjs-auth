import { User } from "src/utils/types";
export declare class VerifyEmail {
    auth: User;
    expires: number;
    userId: number | string;
    constructor(auth: User, userId: number | number, exp?: number);
    generate(): string;
    private createToken;
    verify(token: string): boolean;
}
