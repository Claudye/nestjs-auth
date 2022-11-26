import {Injectable} from '@nestjs/common';
import * as argon from 'argon2';

@Injectable()
export class HashService{
    /**
     * Hash a string provide
     * @param str 
     * @returns 
     */
    async hash (str: string):Promise<string>{
        return await argon.hash(str)
    }
    /**
     * Verify if hash match with string provided
     * 
     * @param hash 
     * @param str 
     * @returns 
     */
    async check (hash: string, str: string): Promise<boolean>{
        return argon.verify(hash, str)
    }
}