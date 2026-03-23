export enum Role {
    DEVELOPER = 'developer',
    COMPANY = 'company',
    ADMIN = 'admin',
}

export interface User {
    id: string;
    email: string;
    name: string;
    role: Role;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponse {
    message: string;
    user: User;
    accessToken: string;
    refreshToken: string;
}

export interface ApiError {
    message: string;
    error: string;
    statusCode: number;
}