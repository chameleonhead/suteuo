export interface LoginUser extends User {
    requestMessageRooms: { [requestId: string]: string };
    userMessageRooms: { [userId: string]: string };
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
    state: 'OPEN' | 'CLOSED';
    area: string;
    title: string;
    detailedText: string;
    owner: User;
    favUsers: User[];
    subUsers: User[];
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
    requestId?: string;
    participants: User[];
    messages: Message[];
    createdAt: string;
    updatedAt: string;
}

export interface Notification {
    id: string;
    title: string;
    body: string;
    href: string;
    createdAt: string;
    updatedAt: string;
}