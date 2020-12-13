import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import { Alert, Badge, Button, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import MessageList from '../components/MessageList';
import RequestCommentForm from '../components/RequestCommentForm';
import RequestCommentList from '../components/RequestCommentList';
import { findMessageRoomById, findRequesById } from '../data';
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
    const { user, onStarClick, onSubscribeClick, onFinishClick, onAddNewComment, onDeleteComment, onAddNewMessage, onCreateMessageRoom } = props
    const { id } = props.match.params;
    let selectedTab = props.location.hash
    if (!selectedTab || !['#comments', '#private'].includes(selectedTab)) {
        selectedTab = 'comments';
    } else {
        selectedTab = selectedTab.replace('#', '');
    }
    const request = findRequesById(id);
    if (request) {
        const messageRoom = user && findMessageRoomById(request.id)
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
                                            <Button size="sm" color="default" onClick={() => onStarClick(id)}><i className={"fa-star" + ((request.favUsers && request.favUsers.filter(u => u.id === user.id).length > 0) ? ' fa text-warning' : ' far')}></i><span className="d-none d-sm-inline"> お気に入り</span></Button>
                                        </Col>
                                        <Col className="col-auto">
                                            <Button size="sm" color="default" onClick={() => onSubscribeClick(id)}><i className={"fa-bell" + ((request.subUsers && request.subUsers.filter(u => u.id === user.id).length > 0) ? ' fa text-warning' : ' far')}></i><span className="d-none d-sm-inline"> 通知</span></Button>
                                        </Col>
                                    </Row>
                                )
                                : null
                        }
                    </Col>
                </Row>
                <h1 className="my-3">{request.title}</h1>
                <div>
                    <div className="d-flex justify-content-between" style={{ height: '1.5em' }}>
                        <div className="d-flex">
                            <div className="mr-3">
                                <i className="fa fa-map-marker"></i> <Link to={`/requests?search=エリア:${request.area}`}>{request.area}</Link>
                            </div>
                            <div className="mr-3">
                                <i className="fa fa-user"></i> <Link to={`/users/${request.owner.id}`}>{request.owner.name}</Link>
                            </div>
                        </div>
                        {
                            user && request.owner.id === user.id
                                ? (
                                    <Row noGutters>
                                        <Col className="ml-2 col-auto">
                                            <Button tag={Link} to={`/requests/edit/${request.id}`} color="secondary" outline>編集</Button>
                                        </Col>
                                        <Col className="ml-2 col-auto">
                                            <Button color="secondary" outline onClick={() => onFinishClick(id)}>終了</Button>
                                        </Col>
                                    </Row>
                                )
                                : null
                        }
                    </div>
                </div>
                <h5 className="my-3">依頼内容</h5>
                <div>
                    {request.detailedText}
                </div>
                {
                    user
                        ? (
                            <div className="my-3">
                                <Nav tag="ul" tabs>
                                    <NavItem tag="li">
                                        <NavLink tag={Link} to="#comments" className={selectedTab === 'comments' ? 'active' : ''}>公開コメント</NavLink>
                                    </NavItem>
                                    <NavItem tag="li">
                                        <NavLink tag={Link} to="#private" className={selectedTab === 'private' ? 'active' : ''}><i className="fa fa-lock"></i> 非公開コメント</NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={selectedTab}>
                                    <TabPane tabId="comments">
                                        <div className="my-3">
                                            <RequestCommentList comments={request.comments} user={user} onDelete={commentId => onDeleteComment(id, commentId)} />
                                            <div className="mt-3">
                                                <RequestCommentForm onSubmit={value => onAddNewComment(id, value)} />
                                            </div>
                                        </div>
                                    </TabPane>
                                    <TabPane tabId="private">
                                        <div className="my-3">
                                            <Alert color="warning">こちらに記載されたコメントは依頼者以外には見ることが出来ません。</Alert>
                                            {messageRoom
                                                ? (
                                                    <div className="mt-3">
                                                        <MessageList messages={messageRoom?.messages} user={user} />
                                                        <RequestCommentForm onSubmit={value => onAddNewMessage(messageRoom.id, value.comment)} />
                                                    </div>
                                                )
                                                : (
                                                    <div className="mt-3">
                                                        <RequestCommentForm onSubmit={value => onCreateMessageRoom(request.id, user.id, value.comment)} />
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </TabPane>
                                </TabContent>
                            </div>
                        )
                        : (
                            <div>
                                <h5 className="my-3">コメント</h5>
                                <RequestCommentList comments={request.comments} />
                            </div>
                        )
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
    onFinishClick: (id: string) => null,
    onStarClick: (id: string) => null,
    onSubscribeClick: (id: string) => null,
    onAddNewComment: (id: string, value: { comment: string }) => null,
    onDeleteComment: (id: string, commentId: string) => null,
    onAddNewMessage: (roomId: string, value: string) => null,
    onCreateMessageRoom: (id: string, userId: string, value: string) => null,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RequestDetails);
