import { Col, Row } from 'reactstrap';
import RegisterForm, { RegisterFormProps } from '../components/RegisterForm';

export type RegisterProps = {
    onSubmit: RegisterFormProps['onSubmit']
}

export const Register = (props: RegisterProps) => {
    const { onSubmit } = props
    return (
        <div>
            <h1>登録</h1>
            <Row>
                <Col md="6">
                    <RegisterForm onSubmit={onSubmit} />
                </Col>
            </Row>
        </div>
    )
};

export default Register;