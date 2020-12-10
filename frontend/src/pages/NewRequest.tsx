import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Col, Row } from 'reactstrap';
import NewRequestForm from '../components/NewRequestForm';
import { ApplicationState, selectors } from '../store';

export type NewRequestProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export const NewRequest = (props: NewRequestProps) => {
    const { user, onSubmit } = props
    if (!user) {
        return <Redirect to="/login" />
    }
    return (
        <div>
            <h1>新規依頼</h1>
            <Row>
                <Col md="6">
                    <NewRequestForm onSubmit={onSubmit} defaultArea={user.area} />
                </Col>
            </Row>
        </div>
    )
};

const mapStateToProps = (state: ApplicationState) => ({
    user: selectors.selectUser(state)
})

const mapDispatchToProps = {
    onSubmit: () => null
}

export default connect(
    mapStateToProps
)(NewRequest);