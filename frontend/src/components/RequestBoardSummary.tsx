import * as React from 'react';
import { Request, User } from '../models';
import { allRequests } from '../data';
import RequestList from './RequestList';

export type RequestBoardSummaryProps = {
    owner?: User;
    commenter?: User;
    fav?: User;
    featured?: boolean;
    latest?: boolean;
}

export const RequestBoardSummary = (props: RequestBoardSummaryProps) => {
    const { latest, featured, owner, commenter, fav } = props;

    let requests = allRequests() as Request[]
    if (featured || latest) {
        requests = [...requests].sort((a, b) => new Date(b.updatedAt).getMilliseconds() - new Date(a.updatedAt).getMilliseconds())
    }
    if (owner) {
        requests = requests.filter(m => m.owner.id === owner.id)
    }
    if (commenter) {
        requests = requests.filter(m => m.comments && m.comments.filter(c => c.createdBy.id === commenter.id).length > 0)
    }
    if (fav) {
        requests = requests.filter(m => m.favUsers && m.favUsers.filter(c => c.id === fav.id).length > 0)
    }
    if (requests.length) {
        return (
            <RequestList requests={requests} />
        )
    }
    return (
        <div>今はありません。</div>
    )
}

export default RequestBoardSummary;
