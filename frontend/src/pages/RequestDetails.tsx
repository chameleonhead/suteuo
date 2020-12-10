import { connect } from 'react-redux';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import { Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import RequestCommentForm from '../components/RequestCommentForm';
import { findRequesById } from '../data';
import { ApplicationState, selectors } from '../store';

export type RequestDetailsProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & RouteComponentProps<{ id: string }>

export const RequestDetails = (props: RequestDetailsProps) => {
    const { user, onAddNewComment } = props
    const { id } = props.match.params;
    const request = findRequesById(id);
    if (request) {
        return (
            <div>
                {
                    user && request.owner.id === user.id
                        ? (
                            <div className="d-flex justify-content-between">
                                <Button>編集</Button>
                            </div>
                        )
                        : null
                }
                <h1>{request.title}</h1>
                <div className="d-flex justify-content-between align-items-center">
                    <div>依頼者: <Link to={`/users/${request.owner.id}`}>{request.owner.name}</Link></div>
                    {
                        user
                            ? (
                                <div>
                                    <Button color="default"><i className={"fa fa-star" + ((request.favUsers && request.favUsers.filter(u => u.id === user.id).length > 0) ? ' text-warning' : '')}></i><span className="d-none d-sm-inline"> お気に入り</span></Button>
                                    <Button color="default"><i className={"fa fa-bell" + ((request.subUsers && request.subUsers.filter(u => u.id === user.id).length > 0) ? ' text-warning' : '')}></i><span className="d-none d-sm-inline"> 通知</span></Button>
                                </div>
                            )
                            : null
                    }
                </div>
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
                                                    <Link to={`/users/${c.createdBy.id}`}>{c.createdBy.name}</Link>
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
                {
                    user
                        ? (
                            <div className="mt-3">
                                <RequestCommentForm onSubmit={onAddNewComment} />
                            </div>
                        )
                        : null
                }
            </div>
        );
    }
    return <Redirect to="/requests" />
}

const mapStateToProps = (state: ApplicationState) => ({
    user: selectors.selectUser(state)
})

const mapDispatchToProps = {
    onAddNewComment: () => null
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RequestDetails);
