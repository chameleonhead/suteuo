import { connect } from 'react-redux';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import { Badge, Button, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row } from 'reactstrap';
import RequestCommentForm from '../components/RequestCommentForm';
import { findRequesById } from '../data';
import { ApplicationState, selectors } from '../store';

const RequestState = (props: { state: 'OPEN' | 'CLOSED' }) => {
    const { state } = props
    switch (state) {
        case 'OPEN':
            return (
                <Badge color="success" className="px-3">受付中</Badge>
            )
        case 'CLOSED':
            return (
                <Badge color="secondary" className="px-3">終了</Badge>
            )
        default:
            return null
    }
}

export type RequestDetailsProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & RouteComponentProps<{ id: string }>

export const RequestDetails = (props: RequestDetailsProps) => {
    const { user, onAddNewComment } = props
    const { id } = props.match.params;
    const request = findRequesById(id);
    if (request) {
        return (
            <div>
                <Row className="justify-content-between mb-3" style={{ height: '1.5em' }}>
                    <Col className="col-auto">
                        <div><RequestState state={request.state} /></div>
                    </Col>
                    <Col className="col-auto">
                        {
                            user
                                ? (
                                    <Row noGutters>
                                        <Col className="col-auto">
                                            <Button size="sm" color="default"><i className={"fa fa-star" + ((request.favUsers && request.favUsers.filter(u => u.id === user.id).length > 0) ? ' text-warning' : '')}></i><span className="d-none d-sm-inline"> お気に入り</span></Button>
                                        </Col>
                                        <Col className="col-auto">
                                            <Button size="sm" color="default"><i className={"fa fa-bell" + ((request.subUsers && request.subUsers.filter(u => u.id === user.id).length > 0) ? ' text-warning' : '')}></i><span className="d-none d-sm-inline"> 通知</span></Button>
                                        </Col>
                                    </Row>
                                )
                                : null
                        }
                    </Col>
                </Row>
                <h1 className="my-3">{request.title}</h1>
                <div>
                    <Row noGutters style={{ height: '1.5em' }}>
                        <Col>
                            <Link to={`/users/${request.owner.id}`}><b>{request.owner.name}</b></Link>
                        </Col>
                        {
                            user && request.owner.id === user.id
                                ? (
                                    <>
                                        <Col className="ml-2 col-auto">
                                            <Button tag={Link} to={`/requests/edit/${request.id}`} color="secondary" outline>編集</Button>
                                        </Col>
                                        <Col className="ml-2 col-auto">
                                            <Button color="secondary" outline>終了</Button>
                                        </Col>
                                    </>
                                )
                                : null
                        }
                    </Row>
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
            </div >
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
