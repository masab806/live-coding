export interface LanguageType{
    name: string,
    TextColor: string,
    border: string,
    CircleDot: string,
}

export type LoginFormData = {
    email: string,
    password: string
}

export type SignupFormData = {
    fullName: string,
    email: string,
    password: string,
    confirmPassword: string
}

export type UserType = {
    _id: string
    fullName: string,
    email: string,
    token: string
}

export type User = {
    _id: string
    fullName: string
}

export type RoomData = {
    _id: string
}

export type sendOtpType = {
    email: string
}

export type resetPasswordType = {
    email: string,
    otp: string,
    password: string,
    confirmPassword: string
}



