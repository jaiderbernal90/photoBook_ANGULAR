export interface User {
    _id?:string;
    name?:string;
    lastName?:string;
    email?:string;
    role?:string;
    nickname?:string;
    phone?:string;
    password?:string;
    date_creation?: Date;
    date_modification?: Date;
}