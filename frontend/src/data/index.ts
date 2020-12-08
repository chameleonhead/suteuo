import { denormalize, normalize, schema } from 'normalizr';
import { Request, User } from '../models';
import requests from './requests.json'

const user = new schema.Entity('users');
const comment = new schema.Entity('comments', {
    createdBy: user
});
const request = new schema.Entity('requests', {
    owner: user,
    comments: [comment],
});

const normalizedData = normalize(requests, [request]);

export const allRequests = (): Request[] => {
    return denormalize(Object.keys(normalizedData.entities.requests as any), [request], normalizedData.entities);
}

export const findRequestById = (id: string): Request | undefined => {
    return denormalize(id, request, normalizedData.entities);
}

export const findUserById = (id: string): User | undefined => {
    return denormalize(id, user, normalizedData.entities);
}