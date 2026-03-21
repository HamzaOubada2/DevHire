import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../enums/role.enum";
import * as bcrypt from 'bcrypt';




@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.DEVELOPER
    })
    role: Role;

    @Column({ default: false })
    isActive: boolean;

    @Column({ nullable: true })
    refreshToken: string;

    @CreateDateColumn()
    createdAt: Date;


    @UpdateDateColumn()
    updatedAt: Date;



    // Auth Hash Password Before sava
    @BeforeInsert()
    @BeforeUpdate()

    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }

    //Compare Password Helper
    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password)
    }
}