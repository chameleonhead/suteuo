import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import RequestCommentForm from '../components/RequestCommentForm';
import { findRequesById } from '../data';

export type RequestDetailsProps = typeof mapDispatchToProps & RouteComponentProps<{ id: string }>

export const RequestDetails = (props: RequestDetailsProps) => {
    const { onAddNewComment } = props
    const { id } = props.match.params;
    const request = findRequesById(id);
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
                                                <ListGroupItemHeading>
                                                    {c.createdBy.name}
                                                    <span className="float-right">{c.createdAt}</span>
                                                </ListGroupItemHeading>
                                                <ListGroupItemText>
                                                    {c.comment}
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
                <div className="mt-3">
                    <RequestCommentForm onSubmit={onAddNewComment} />
                </div>
            </div>
        );
    }
    return <Redirect to="/requests" />
}

const mapDispatchToProps = {
    onAddNewComment: () => null
}

export default (props: any) => <RequestDetails {...props} />;
