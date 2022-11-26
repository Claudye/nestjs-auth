import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { User } from './entities/User';
import { RegisterUserDto } from 'src/auth/dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>) {
    
  }
  /**
   * Responsible for creating a new user
   * @param RegisterUserDto 
   * @returns 
   */
  create(createUserDto:RegisterUserDto){
    const newUser =this.userRepository.create(createUserDto)
    return this.userRepository.save(newUser)
  }

  /**
   * Find user by email
   * @param email user email
   * @returns 
   */
  findByEmail(email:string){
    return this.userRepository.findOneBy({email:email})
  }
  /**
   * Find user by id
   * @param id user id
   * @returns 
   */
  findById(id:number){
    return this.userRepository.findOneBy({id:id})
  }
  /**
   * 
   * @param count the count
   * @returns 
   */
  get(count?:number){
    return this.userRepository.find()
  }

  update() {
    //this.userRepository.update()
  }
}
