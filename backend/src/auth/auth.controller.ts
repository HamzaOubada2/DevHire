import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { RolesGuard } from './guards/roles.guard';
import { Role } from 'src/users/enums/role.enum';
import { Roles } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }


    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens(@Body() body: { userId: string, refreshToken: string }) {
        return this.authService.refreshTokens(body.userId, body.refreshToken);
    }


    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@Body() body: { userId: string }) {
        return this.authService.logout(body.userId);
    }

    //Test Protected Route
    @Get('me')
    @UseGuards(JwtAuthGuard)
    getMe(@CurrentUser() user: any) {
        return user;
    }

    // Test Role Route
    @Get('developer-only')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    developerOnly(@CurrentUser() user: any) {
        return { message: `Hello Developer ${user.email}` }
    }

}
