import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { AppModule } from 'src/app.module';

@Injectable()
export class EncryptionService {

    private algo = "aes-256-ctr"

    private random_bytes_lengh = AppModule.ENCRYPTION_KEY_LENGHT

    private secretkey;
    constructor(private config: ConfigService) {
        this.setSecret()
    }

    encrypt(text: string, as_string: boolean = true) {
        const iv = crypto.randomBytes(this.random_bytes_lengh)

        const cipher = crypto.createCipheriv(this.algo, this.secretkey, iv)

        const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
        let hash: string | object = `${iv.toString('hex')}${encrypted.toString('hex')}`
        if (!as_string) {
            hash = {
                iv: iv.toString('hex'),
                content: encrypted.toString('hex')
            }
        }
        return hash
    }

    decrypt(encrypted: string | { iv: string, hash: string }) {
        let hash = encrypted;
        let buffer: { iv: Buffer, hash: Buffer }
        if (typeof (hash) != 'object') {
            const ivlen = crypto.randomBytes(this.random_bytes_lengh).toString('hex').length
            buffer = {
                iv: Buffer.from(hash.substring(0, ivlen), 'hex'),
                hash: Buffer.from(hash.substring(ivlen), 'hex')
            }
        } else {
            buffer = {
                iv: Buffer.from(hash.iv, 'hex'),
                hash: buffer.hash = Buffer.from(hash.hash, 'hex')
            }

        }

        const decipher = crypto.createDecipheriv(this.algo, this.secretkey, buffer.iv)
        return Buffer.concat([decipher.update(buffer.hash), decipher.final()]).toString()
    }

    private setSecret() {
        this.secretkey = this.config.get('APP_KEY')
    }
}
