import { UserResponseDTO } from "./UserResponseDTO";

export interface UserAuthResponseDTO{
    user: UserResponseDTO,
    token: string
}