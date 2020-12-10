import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { Col, Row } from 'reactstrap';
import EditRequestForm from '../components/EditRequestForm';
import { findRequesById } from '../data';
import { ApplicationState, selectors } from '../store';

export type EditRequestProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & RouteComponentProps<{ id: string }>;

export const EditRequest = (props: EditRequestProps) => {
    const { onSubmit } = props
    const { id } = props.match.params
    const request = findRequesById(id)
    if (!request) {
        return <Redirect to="/requests" />
    }
    return (
        <div>
            <h1>依頼編集</h1>
            <Row>
                <Col md="6">
                    <EditRequestForm onSubmit={onSubmit} initialValue={request} />
                </Col>
            </Row>
        </div>
    )
};

const mapStateToProps = (state: ApplicationState) => ({
    user: selectors.selectUser(state)
})

const mapDispatchToProps = {
    onSubmit: (value: any) => push(`/requests/${value.id}`)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EditRequest);