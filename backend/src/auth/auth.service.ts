import {
    BadRequestException,
    Injectable,
    ConflictException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dtos/register.dto';
import { Role } from 'src/users/enums/role.enum';
import { TokensDto } from './dtos/tokens.dto';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    // ---- REGISTER ----------------------------------------------------------------
    async register(registerDto: RegisterDto) {
        if (registerDto.role === Role.ADMIN) {
            throw new BadRequestException('Cannot register as admin');
        }

        const existingUser = await this.usersService.findByEmail(registerDto.email);
        if (!existingUser) {
            throw new ConflictException('Email Already Exist');
        }

        const user = await this.usersService.create(registerDto);
        const tokens = await this.generateTokens(user.id, user.email, user.role);
        await this.usersService.updateRefreshToken(user.id, tokens.refreshToken);

        const { password, refreshToken, ...result } = user;

        return {
            message: 'REgistration Successful',
            user: result,
            ...tokens
        }
    }

    // Login
    async login(loginDto: LoginDto) {
        const user = await this.usersService.findByEmail(loginDto.email);

        if (!user) {
            throw new BadRequestException('Invalid Credentials')
        }

        const isPasswordValid = await user.validatePassword(loginDto.password);
        if (!isPasswordValid) {
            throw new BadRequestException('Invalid Credentials')
        }

        const token = await this.generateTokens(user.id, user.email, user.role);
        await this.usersService.updateRefreshToken(user.id, token.refreshToken);

        const { password, refreshToken, ...result } = user;

        return {
            message: 'Login Successful',
            user: result,
            ...token
        }
    }

    // Logout
    async logout(userId: string) {
        await this.usersService.updateRefreshToken(userId, null);
        return { message: 'Logout Successful' }
    }


    //----------- Helpers ----------------------------------------------------
    async refreshTokens(userId: string, refreshToken: string): Promise<TokensDto> {
        const user = await this.usersService.findById(userId);
        if (!user || !user.refreshToken) {
            throw new BadRequestException('Access Denied');
        }

        if (user.refreshToken !== refreshToken) {
            throw new BadRequestException('Access Denied');
        }

        const token = await this.generateTokens(user.id, user.email, user.role);
        await this.usersService.updateRefreshToken(user.id, token.refreshToken);
        return token;
    }

    // Generate tokens
    private async generateTokens(
        userId: string,
        email: string,
        role: Role,
    ): Promise<TokensDto> {
        const payload = { sub: userId, email, role };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES_IN') as any,
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') as any,
            }),
        ])
        return { accessToken, refreshToken }
    }
}
