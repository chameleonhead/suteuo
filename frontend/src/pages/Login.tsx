import { Col, Row } from 'reactstrap';
import { connect } from 'react-redux';

import LoginForm from '../components/LoginForm';
import { actionCreators, ApplicationState, selectors } from '../store';
import { Redirect } from 'react-router';

export type LoginProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export const Login = (props: LoginProps) => {
    const { user, onSubmit } = props
    if (user) {
        return <Redirect to="/" />
    }
    return (
        <div>
            <h1>ログイン</h1>
            <Row>
                <Col md="6">
                    <LoginForm onSubmit={onSubmit} />
                </Col>
            </Row>
        </div>
    )
};

const mapStateToProps = (state: ApplicationState) => ({
    user: selectors.selectUser(state)
})
const mapDispatchToProps = {
    onSubmit: actionCreators.login
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);