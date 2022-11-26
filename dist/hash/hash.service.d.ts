export declare class HashService {
    hash(str: string): Promise<string>;
    check(hash: string, str: string): Promise<boolean>;
}
