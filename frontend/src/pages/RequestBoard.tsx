import * as React from 'react';
import { Button, Col, Form, Input, Row } from 'reactstrap';
import { RouteComponentProps } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { allRequests } from '../data';
import RequestList from '../components/RequestList';

export type RequestBoardProps = RouteComponentProps

export const RequestBoard = (props: RequestBoardProps) => {
    const { location, history } = props
    const searchQuery = new URLSearchParams(location.search).get('search');
    let requests = React.useMemo(() => {
        if (searchQuery) {
            if (searchQuery.startsWith('エリア:')) {
                return allRequests().filter(r => r.area.match(searchQuery.replace('エリア:', '')))
            }
            return allRequests().filter(r => r.title.match(searchQuery))
        }
        return allRequests();
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
                        <Col>
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
            <RequestList requests={requests} />
        </div>
    )
}

export default RequestBoard;