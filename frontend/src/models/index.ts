export interface LoginUser extends User {
}

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

export interface Message {
    id: string;
    messageRoomId: string;
    sender: User;
    body: string;
    createdAt: string;
    updatedAt: string;
}

export interface MessageRoom {
    id: string;
    participants: User[];
    messages: Message[];
    createdAt: string;
    updatedAt: string;
}