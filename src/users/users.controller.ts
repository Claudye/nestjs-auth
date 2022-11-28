import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { userToObject } from './utils';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
        ) {

    }
    /**
     * Get users list
     * @returns 
     */
    @Get()
    async getUsers() {
        const users = await this.usersService.get()

        return {
            data: users
        }
    }

    async updateUser (){

    }

    async createUser () {

    }
    @UseGuards(AuthGuard('jwt-auth'))
    @Get('profile')
    async profile (@Req() req){
        return userToObject(req.user,['password'])
    }

    @Get(':id')
    async getUser() {
        const user = await this.usersService.findById(1)
        return {
            data: user
        }
    }
}
