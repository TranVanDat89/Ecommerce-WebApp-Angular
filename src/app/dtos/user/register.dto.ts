import { IsDate, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class RegisterDTO {
    @IsString()
    fullName: string;
    @IsPhoneNumber()
    @IsNotEmpty()
    phoneNumber: string;
    @IsString()
    address: string;
    @IsString()
    @IsNotEmpty()
    password: string;
    @IsDate()
    dateOfBirth: Date;
    constructor(registerDTO: any) {
        this.fullName = registerDTO.fullname;
        this.phoneNumber = registerDTO.phone_number;
        this.address = registerDTO.address;
        this.password = registerDTO.password;
        this.dateOfBirth = registerDTO.dateOfBirth;
    }
}