import * as React from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { RouteComponentProps } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Request } from '../models';
import { allRequests } from '../data';

const RequestItem = (props: { request: Request }) => {
    const { request } = props
    return (
        <ListGroupItem tag={Link} to={`/requests/${request.id}`} className="text-dark text-decoration-none">
            <ListGroupItemHeading>{request.requester.name}<small className="float-right">{request.updatedAt}</small></ListGroupItemHeading>
            <ListGroupItemText>{request.title}</ListGroupItemText>
        </ListGroupItem>
    )
}

export type RequestBoardProps = RouteComponentProps

export const RequestBoard = (_: RequestBoardProps) => {
    const requests = allRequests();
    return (
        <div>
            <Link to="#">最新</Link>
            <ListGroup>
                {requests.map(r => (<RequestItem key={r.id} request={r} />))}
            </ListGroup>
        </div>
    )
}

export default RequestBoard;