import { denormalize, normalize, schema } from 'normalizr';
import { Request, User } from '../models';
import requests from './requests.json'

const user = new schema.Entity('users');
const comments = new schema.Entity('comments');
const request = new schema.Entity('requests', {
    requester: user,
    comments: comments,
});

const normalizedData = normalize(requests, [request]);
console.log()

export const allRequests = (): Request[] => {
    return denormalize(Object.keys(normalizedData.entities.requests as any), [request], normalizedData.entities);
}

export const findRequestById = (id: string): Request | undefined => {
    return denormalize(id, request, normalizedData.entities);
}

export const findUserById = (id: string): User | undefined => {
    return denormalize(id, user, normalizedData.entities);
}