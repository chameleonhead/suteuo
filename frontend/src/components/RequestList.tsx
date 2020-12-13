import * as React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Request } from '../models';

const RequestItem = (props: { request: Request }) => {
    const { request } = props
    return (
        <ListGroupItem tag={Link} to={`/requests/${request.id}`} className="text-dark text-decoration-none">
            <div className="d-flex justify-content-between">
                <h5>
                    {request.owner.name}
                    <small className="ml-2">{request.area}</small>
                </h5>
                <small>{request.updatedAt}</small>
            </div>
            <div>{request.title}</div>
        </ListGroupItem>
    )
}

export type RequestListProps = {
    requests: Request[];
}

export const RequestList = (props: RequestListProps) => {
    const { requests } = props;

    return (
        <ListGroup>
            {requests.map(r => (<RequestItem key={r.id} request={r} />))}
        </ListGroup>
    )
}

export default RequestList;
