export interface User {
    id: string;
    name: string;
    area: string;
}

export interface Request {
    id: string;
    area: string;
    title: string;
    detailedText: string;
    requester: User;
    updatedAt: string;
}