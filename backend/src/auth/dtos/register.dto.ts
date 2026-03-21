import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Role } from "src/users/enums/role.enum";


export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(Role, {
        message: 'Role must e developer or Company'
    })
    role: Role
}