import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Card, CardBody, CardImg, CardTitle, Col, Row } from 'reactstrap';
import RequestBoardSummary from '../components/RequestBoardSummary';
import { findUserById } from '../data';

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

export type UserDetailsProps = RouteComponentProps<{ id: string }>

export const UserDetails = (props: UserDetailsProps) => {
    const { id } = props.match.params;
    const user = findUserById(id)
    if (user) {
        return (
            <Row>
                <Col md="4">
                    <Card>
                        <CardImg top width="100%" src="/assets/sample.svg" alt={`${user.name}のプロフィール画像`} />
                        <CardBody>
                            <CardTitle>
                                <h1>{user.name}</h1>
                            </CardTitle>
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
                    <h5>最近の投稿</h5>
                    <RequestBoardSummary owner={user} />
                </Col>
            </Row>
        );
    }
    return <Redirect to="/users" />
}
export default UserDetails;
