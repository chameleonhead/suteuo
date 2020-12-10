import * as React from 'react';
import { Button, Col, Form, Input, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row } from 'reactstrap';
import { RouteComponentProps } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Request } from '../models';
import { allRequests } from '../data';

const RequestItem = (props: { request: Request }) => {
    const { request } = props
    return (
        <ListGroupItem tag={Link} to={`/requests/${request.id}`} className="text-dark text-decoration-none">
            <ListGroupItemHeading>{request.owner.name}<small className="float-right">{request.updatedAt}</small></ListGroupItemHeading>
            <ListGroupItemText>{request.title}</ListGroupItemText>
        </ListGroupItem>
    )
}

export type RequestBoardProps = RouteComponentProps

export const RequestBoard = (props: RequestBoardProps) => {
    const { location, history } = props
    const searchQuery = new URLSearchParams(location.search).get('search');
    let requests = React.useMemo(() => {
        return allRequests().filter(r => !searchQuery || r.title.match(searchQuery))
    }, [searchQuery]);
    const [localSearch, setLocalSearch] = React.useState(searchQuery || '');
    return (
        <div>
            <div className="mb-3">
                <Form onSubmit={e => {
                    e.preventDefault();
                    if (localSearch) {
                        history.push({ search: '?search=' + localSearch })
                    } else {
                        history.push({ search: '' })
                    }
                }}>
                    <Row noGutters>
                        <Col className="pl-2">
                            <Input
                                name="search"
                                type="search"
                                onChange={e => setLocalSearch(e.target.value)}
                                value={localSearch}
                            />
                        </Col>
                        <Col className="pl-2 col-auto">
                            <Button
                                color="primary"
                                block
                                className="h-100"
                            >検索</Button>
                        </Col>
                        <Col className="pl-4 col-auto">
                            <Button
                                tag={Link}
                                to="/requests/new"
                                color="default"
                                block
                                outline
                                className="h-100"
                            ><i className="fa fa-plus"></i></Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <ListGroup>
                {requests.map(r => (<RequestItem key={r.id} request={r} />))}
            </ListGroup>
        </div>
    )
}

export default RequestBoard;