export interface IAuth {
    sub: number,
    email: string,
    names: string,
    lastNames: string,
    phone: string,
    likes: Like[],
    isConfirmed: boolean,
}

export interface Like {
    id: number;
    urlSection: string;
}