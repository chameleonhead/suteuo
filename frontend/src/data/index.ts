import { denormalize, normalize, schema } from 'normalizr';
import { MessageRoom, Notification, Request, User } from '../models';
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

export const allMessageRooms = (): MessageRoom[] => {
    return denormalize(Object.keys(normalizedData.entities.messageRooms as any), [messageRoom], normalizedData.entities);
}

export const findMessageRoomById = (id: string): MessageRoom | undefined => {
    return denormalize(id, messageRoom, normalizedData.entities);
}

export const findMessageRoomForRequestId = (requestId: string, userId: string): MessageRoom | undefined => {
    for (let key in normalizedData.entities.users) {
        if (normalizedData.entities.users[key].requestMessageRooms && normalizedData.entities.users[key].requestMessageRooms.includes(requestId)) {
            return denormalize(key, messageRoom, normalizedData.entities);
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