import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class LoginDTO {
    @IsPhoneNumber()
    @IsNotEmpty()
    phoneNumber: string;
    @IsString()
    @IsNotEmpty()
    password: string;
    constructor(loginDTO: any) {
        this.phoneNumber = loginDTO.phoneNumber;
        this.password = loginDTO.password;
    }
}