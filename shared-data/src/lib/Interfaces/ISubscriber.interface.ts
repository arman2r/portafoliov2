export interface IsSubscriber {
    exists: boolean;
    subscriber: ISubscriber;
}

export interface ISubscriber {
    id?: number;
    email: string;
    name?: string;
    lastNames?: string;
    phone?: string;
    isConfirmed?: boolean;
}