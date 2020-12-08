import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { findRequestById } from '../data';

export type RequestDetailsProps = RouteComponentProps<{ id: string }>

export const RequestDetails = (props: RequestDetailsProps) => {
    const { id } = props.match.params;
    const request = findRequestById(id);
    if (request) {
        return (
            <div>
                <h1>{request.title}</h1>
                <div>依頼者: <Link to={`/users/${request.owner.id}`}>{request.owner.name}</Link></div>
                <h5 className="my-3">依頼内容</h5>
                <div>
                    {request.detailedText}
                </div>
                <h5 className="my-3">コメント</h5>
                <div>
                    {(request.comments && request.comments.length)
                        ? (
                            <ListGroup>
                                {
                                    request.comments.map(c => {
                                        return (
                                            <ListGroupItem key={c.id}>
                                                <ListGroupItemText>
                                                    {c.comment}
                                                    <span className="float-right">{c.createdBy.name}</span>
                                                </ListGroupItemText>
                                            </ListGroupItem>
                                        )
                                    })
                                }
                            </ListGroup>
                        )
                        : (
                            <p>コメントはまだありません</p>
                        )}
                </div>
            </div>
        );
    }
    return <Redirect to="/requests" />
}
export default (props: any) => <RequestDetails {...props} />;
