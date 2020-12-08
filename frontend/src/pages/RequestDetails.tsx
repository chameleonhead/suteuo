import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Container } from 'reactstrap';
import { findRequestById } from '../data';

export type RequestDetailsProps = RouteComponentProps<{ id: string }>

export const RequestDetails = (props: RequestDetailsProps) => {
    const { id } = props.match.params;
    const request = findRequestById(id);
    if (request) {
        return (
            <div>
                <h1>{request.title}</h1>
                <div>依頼者: {request.requester.name}</div>
            </div>
        );
    }
    return <Redirect to="/requests" />
}
export default (props: any) => <RequestDetails {...props} />;
