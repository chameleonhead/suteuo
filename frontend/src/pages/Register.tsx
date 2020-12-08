import { Col, Container, Row } from 'reactstrap';
import LoginForm, { LoginFormProps } from '../components/LoginForm';

export type RegisterProps = {
    onSubmit: LoginFormProps['onSubmit']
}

export const Register = (props: RegisterProps) => {
    const { onSubmit } = props
    return (
        <div>
            <h1>登録</h1>
            <Row>
                <Col md="6">
                    <LoginForm onSubmit={onSubmit} />
                </Col>
            </Row>
        </div>
    )
};

export default Register;