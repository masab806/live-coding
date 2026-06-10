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

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
}