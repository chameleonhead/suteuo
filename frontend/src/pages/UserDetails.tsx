import { connect } from 'react-redux';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import { Button, Card, CardBody, CardImg, CardTitle, Col, Row } from 'reactstrap';
import RequestBoardSummary from '../components/RequestBoardSummary';
import { findMessageRoomForUserId, findUserById } from '../data';
import { LoginUser } from '../models';
import { ApplicationState, selectors } from '../store';

const Rating = (props: { value: number }) => {
    const { value } = props;
    if (value < 2) {
        return (
            <span className="rating">
                <i className="fa fa-star text-warning" />
                <i className="far fa-star" />
                <i className="far fa-star" />
                <i className="far fa-star" />
                <i className="far fa-star" />
            </span>
        )
    }
    if (value < 3) {
        return (
            <span className="rating">
                <i className="fa fa-star text-warning" />
                <i className="fa fa-star text-warning" />
                <i className="far fa-star" />
                <i className="far fa-star" />
                <i className="far fa-star" />
            </span>
        )
    }
    if (value < 4) {
        return (
            <span className="rating">
                <i className="fa fa-star text-warning" />
                <i className="fa fa-star text-warning" />
                <i className="fa fa-star text-warning" />
                <i className="far fa-star" />
                <i className="far fa-star" />
            </span>
        )
    }
    if (value < 5) {
        return (
            <span className="rating">
                <i className="fa fa-star text-warning" />
                <i className="fa fa-star text-warning" />
                <i className="fa fa-star text-warning" />
                <i className="fa fa-star text-warning" />
                <i className="far fa-star" />
            </span>
        )
    }
    return (
        <span className="rating">
            <i className="fa fa-star text-warning" />
            <i className="fa fa-star text-warning" />
            <i className="fa fa-star text-warning" />
            <i className="fa fa-star text-warning" />
            <i className="fa fa-star text-warning" />
        </span>
    )
}

const InteractionPanel = (props: { id: string, loginUser: LoginUser }) => {
    const { id, loginUser } = props
    const messageRoom = findMessageRoomForUserId(loginUser.id, id);
    return (
        <div className="mb-3">
            <Row>
                <Col>
                    <Button color="primary" block size="sm" tag={Link} to={`/messages${messageRoom ? "/" + messageRoom.id : ''}`}><i className="fa fa-envelope"></i> メッセージ</Button>
                </Col>
                <Col>
                    <Button color="primary" block size="sm"><i className="fa fa-plus"></i> フォローする</Button>
                </Col>
            </Row>
        </div>
    );
}

export type UserDetailsProps = ReturnType<typeof mapStateToProps> & RouteComponentProps<{ id: string }>

export const UserDetails = (props: UserDetailsProps) => {
    const { id } = props.match.params;
    const { loginUser } = props
    const user = findUserById(id);
    if (user) {
        return (
            <Row>
                <Col md="4">
                    <Card className="mb-3">
                        <CardImg top width="100%" src="/assets/sample.svg" alt={`${user.name}のプロフィール画像`} />
                        <CardBody>
                            <CardTitle>
                                <h1>{user.name}</h1>
                            </CardTitle>
                            {
                                loginUser && id !== loginUser.id && <InteractionPanel id={id} loginUser={loginUser} />
                            }
                            <div className="mb-3">
                                <h6>エリア</h6>
                                <div>
                                    {user.area}
                                </div>
                            </div>
                            <div className="mb-3">
                                <h6>評価</h6>
                                <div>
                                    <Rating value={3.6} /> 3.6
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="8">
                    <div className="mb-3">
                        <h5>最近の投稿</h5>
                        <RequestBoardSummary owner={user} />
                    </div>
                </Col>
            </Row>
        );
    }
    return <Redirect to="/users" />
}

const mapStateToProps = (state: ApplicationState) => ({
    loginUser: selectors.selectUser(state)
})

export default connect(
    mapStateToProps
)(UserDetails);
