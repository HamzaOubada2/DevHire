import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entites/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './Dtos/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepo: Repository<User>,
    ) { }

    /**
     * Find User By Email
     * @param email
     * @returns User By Email
     */
    async findByEmail(email: string) {
        return this.usersRepo.findOne({ where: { email: email } })
    }

    /**
     * Find User By ID
     * @param id
     * @returns User By Id
     */
    async findById(id: string): Promise<User | null> {
        return this.usersRepo.findOne({ where: { id: id } })
    }


    /**
     * Create User
     * @param createUserDto
     * @returns Save User
     */
    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.usersRepo.create(createUserDto);
        return this.usersRepo.save(user);
    }

    /**
     * Update Refresh Token
     * @param id
     * @param token
     * @returns Update Refresh Token
    */
    async updateRefreshToken(id: string, token: string | null): Promise<void> {
        await this.usersRepo.update(id, { refreshToken: token ?? undefined })
    }


    /**
     * Find All Users
     * @returns All Users
     */
    async findAll(): Promise<User[]> {
        return this.usersRepo.find();
    }
}
