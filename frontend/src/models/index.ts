export interface User {
    id: string;
    name: string;
}

export interface Request {
    id: string;
    title: string;
    requester: User;
    requestedAt: string;
}