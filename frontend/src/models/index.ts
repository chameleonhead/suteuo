export interface User {
    id: string;
    name: string;
    area: string;
    createdAt: string;
    updatedAt: string;
}

export interface Request {
    id: string;
    area: string;
    title: string;
    detailedText: string;
    owner: User;
    comments: RequestComment[];
    createdAt: string;
    updatedAt: string;
}

export interface RequestComment {
    id: string;
    comment: string;
    createdBy: User;
    createdAt: string;
    updatedAt: string;
}