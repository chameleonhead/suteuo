import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Container } from 'reactstrap';
import requests from '../data/requests.json';
import { Request } from '../models';

export type RequestDetailsProps = RouteComponentProps<{ id: string }>

export const RequestDetails = (props: RequestDetailsProps) => {
    const { id } = props.match.params;
    const filtered = requests.filter(m => String(m.id) === id);
    const request = filtered.length ? filtered[0] as Request : undefined
    if (request) {
        return (
            <Container>
                <h1>{request.title}</h1>
                <div>依頼者: {request.requester.name}</div>
            </Container>
        );
    }
    return <Redirect to="/requests" />
}
export default (props: any) => <RequestDetails {...props} />;
