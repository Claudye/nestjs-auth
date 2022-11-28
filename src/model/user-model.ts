interface DynamicObject {
    [key: string]: any
}

export class UserModel implements DynamicObject {
    [key: string]: any
    id: string|number
    email: string
    email_verified_at: string|null 
    constructor(private user: any) {
        this.fill()
    }
    fill() {
        if (typeof (this.user) == 'object') {
            for (const key in this.user) {
                if (Object.prototype.hasOwnProperty.call(this.user, key)) {
                    this[key] = this.user[key];
                }
            }
        }
    }

    isVerified():boolean{
        return this.email_verified_at !=null ||  this.email_verified_at != undefined
    }
}

