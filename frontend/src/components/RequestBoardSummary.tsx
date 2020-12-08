import * as React from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Request } from '../models';
import { allRequests } from '../data';

const RequestItem = (props: { request: Request }) => {
    const { request } = props
    return (
        <ListGroupItem tag={Link} to={`/requests/${request.id}`} className="text-dark text-decoration-none">
            <ListGroupItemHeading>{request.requester.name}<small className="float-right">{request.requestedAt}</small></ListGroupItemHeading>
            <ListGroupItemText>{request.title}</ListGroupItemText>
        </ListGroupItem>
    )
}

export type RequestBoardSummaryProps = {
    requests: Request[];
}

export const RequestBoardSummary = (props: RequestBoardSummaryProps) => {
    const requests = allRequests() as Request[]
    return (
        <ListGroup>
            {requests.map(r => (<RequestItem key={r.id} request={r} />))}
        </ListGroup>
    )
}

export default RequestBoardSummary;
