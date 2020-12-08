import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Container } from 'reactstrap';
import { findRequestById } from '../data';

export type RequestDetailsProps = RouteComponentProps<{ id: string }>

export const RequestDetails = (props: RequestDetailsProps) => {
    const { id } = props.match.params;
    const request = findRequestById(id);
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
