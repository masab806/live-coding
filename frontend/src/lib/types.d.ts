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