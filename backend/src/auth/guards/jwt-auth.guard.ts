import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";



export class JwtAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractToken(request);

        if (!token) {
            throw new UnauthorizedException('No Token provided');
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('JWT_ACCESS_SECRET')
            });
            // this Request from this User
            /*
            !1- Extract Payload
                payload = {
                    "sub": "123",
                    "email": "hamza@gmail.com",
                    "role": "USER"
                }
            !2- give this request to user:
                request['user'] = payload;
            !3- Now requtes like this:
                request.user = {
                    sub: "123",
                    email: "hamza@gmail.com",
                    role: "USER"
                }
            */
            request['user'] = payload;
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }

        return true;
    }


    private extractToken(request: Request): string | null {
        const authHeader = request.headers.authorization;
        if (!authHeader) return null;
        const [type, token] = authHeader.split(' ');
        return type === 'Bearer' ? token : null;
    }
}