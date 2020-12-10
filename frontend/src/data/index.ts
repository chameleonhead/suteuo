import { denormalize, normalize, schema } from 'normalizr';
import { MessageRoom, Notification, Request, User } from '../models';
import requests from './requests.json'
import messages from './messages.json'
import notifications from './notifications.json'

const user = new schema.Entity('users');
const comment = new schema.Entity('comments', {
    createdBy: user
});
const request = new schema.Entity('requests', {
    owner: user,
    comments: [comment],
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
    notifications
}, {
    requests: [request],
    messages: [messageRoom],
    notifications: [notification]
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

export const findMessageRoomById = (id: string): MessageRoom => {
    return denormalize(id, messageRoom, normalizedData.entities);
}

export const allNotifications = (): Notification[] => {
    return denormalize(Object.keys(normalizedData.entities.notifications as any), [notification], normalizedData.entities);
}

export const findNotificationById = (id: string): Notification => {
    return denormalize(id, notification, normalizedData.entities);
}