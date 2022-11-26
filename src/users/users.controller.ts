import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {

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
    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    async profile (@Req() req){
        return 'my info'
    }

    @Get(':id')
    async getUser() {
        const user = await this.usersService.findById(1)
        return {
            data: user
        }
    }
}
