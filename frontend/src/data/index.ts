import { denormalize, normalize, schema } from 'normalizr';
import { LoginUser, MessageRoom, Notification, Request, User } from '../models';
import requests from './requests.json'
import messages from './messages.json'
import notifications from './notifications.json'
import users from './users.json'

const user = new schema.Entity('users');
const comment = new schema.Entity('comments', {
    createdBy: user
});
const request = new schema.Entity('requests', {
    owner: user,
    comments: [comment],
    favUsers: [user],
    subUsers: [user],
});
const message = new schema.Entity('messages', {
    sender: user
})
const messageRoom = new schema.Entity('messageRooms', {
    participants: [user],
    messages: [message],
});

const notification = new schema.Entity('notifications')

const normalizedData = normalize({
    requests,
    messages,
    notifications,
    users,
}, {
    requests: [request],
    messages: [messageRoom],
    notifications: [notification],
    users: [user],
});

export const allRequests = (): Request[] => {
    return denormalize(Object.keys(normalizedData.entities.requests as any), [request], normalizedData.entities);
}

export const findRequesById = (id: string): Request | undefined => {
    return denormalize(id, request, normalizedData.entities);
}

export const findUserById = (id: string): User | undefined => {
    return denormalize(id, user, normalizedData.entities);
}

export const findMessageRoomsForUser = (id: string): MessageRoom[] => {
    const user = findUserById(id) as LoginUser;
    if (user && user.userMessageRooms) {
        const messageRooms = [];
        for (let key in user.userMessageRooms) {
            messageRooms.push(findMessageRoomById(user.userMessageRooms[key]) as MessageRoom)
        }
        return messageRooms;
    }
    return [];
}

export const findMessageRoomById = (id: string): MessageRoom | undefined => {
    return denormalize(id, messageRoom, normalizedData.entities);
}

export const findMessageRoomForRequestId = (loginUserId: string, requestId: string): MessageRoom | undefined => {
    const user = findUserById(loginUserId) as LoginUser;
    if (user && user.requestMessageRooms) {
        if (user.requestMessageRooms[requestId]) {
            return findMessageRoomById(user.requestMessageRooms[requestId])
        }
    }
    return undefined;
}

export const findMessageRoomForUserId = (loginUserId: string, targetUserId: string): MessageRoom | undefined => {
    const user = findUserById(loginUserId) as LoginUser;
    if (user && user.userMessageRooms) {
        if (user.userMessageRooms[targetUserId]) {
            return findMessageRoomById(user.userMessageRooms[targetUserId])
        }
    }
    return undefined;
}

export const allNotifications = (): Notification[] => {
    return denormalize(Object.keys(normalizedData.entities.notifications as any), [notification], normalizedData.entities);
}

export const findNotificationById = (id: string): Notification => {
    return denormalize(id, notification, normalizedData.entities);
}