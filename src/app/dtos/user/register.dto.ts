export class RegisterDTO {
    fullName: string;
    phoneNumber: string;
    address: string;
    password: string;
    dateOfBirth: Date;
    constructor(registerDTO: any) {
        this.fullName = registerDTO.fullname;
        this.phoneNumber = registerDTO.phone_number;
        this.address = registerDTO.address;
        this.password = registerDTO.password;
        this.dateOfBirth = registerDTO.dateOfBirth;
    }
}