import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/users/enums/role.enum";
import { ROLES_KEY } from "../decorators/roles.decorator";

export class RolesGuard implements CanActivate {
    constructor(private reflactor: Reflector) { }

    // Get required roles from decorator
    canActivate(context: ExecutionContext): boolean {
        const requiredRole = this.reflactor.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ])

        if (!requiredRole) return true;

        //Get user from request (set by JwtAuthGuard)
        const { user } = context.switchToHttp().getRequest();

        if (!user) {
            throw new ForbiddenException('No user found')
        }


        // check If user has required role:
        const hasRole = requiredRole.includes(user.role);
        if (!hasRole) {
            throw new ForbiddenException(
                `Access Denied. Required role: ${requiredRole.join(', ')}`
            )
        }
        return true
    }
}
//This Guard check If this user have acces(authorization)
/*
    1- @Roles(Role.ADMIN)
       @Get('dashboard')
    !This Route just for Admin 

    2- Reflectore Comm and read metaData from Decoratore
*/