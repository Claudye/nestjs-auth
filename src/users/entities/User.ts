import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'
@Entity({name: 'users'})
export class User{
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number

    @Column({unique: true,length:100})
    email: string

    @Column()
    password: string

    @Column({length:40, nullable:true})
    fname: string

    @Column({length:40, nullable:true})
    lname: string

    @Column({length:22, nullable:true})
    phone: string

    @Column({nullable:true})
    email_verified_at?: string
}