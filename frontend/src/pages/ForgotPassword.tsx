import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import { connect } from 'react-redux';

import { actionCreators, ApplicationState, selectors } from '../store';
import { Redirect } from 'react-router';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

const ForgotPasswordForm = (props: any) => {
    const { onSubmit } = props
    const formik = useFormik({
        initialValues: {
            mailAddress: '',
        },
        validate: value => {
            const errors = {} as any
            if (!value.mailAddress) {
                errors.mailAddress = '必須項目です。'
            }
            return errors
        },
        onSubmit: onSubmit,
    });
    return (
        <Form onSubmit={formik.handleSubmit}>
            <FormGroup>
                <Label>メールアドレス</Label>
                <Input
                    id="mailAddress"
                    name="mailAddress"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.mailAddress}
                    invalid={formik.touched.mailAddress && formik.errors.mailAddress ? true : false}
                />
                <FormFeedback>{formik.errors.mailAddress}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Button color="primary" block tag={Link} to="/resetpassword?requestId=123">再発行用メールを送信する</Button>
            </FormGroup>
        </Form>
    )
}

export type ForgotPasswordProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export const ForgotPassword = (props: ForgotPasswordProps) => {
    const { user, onSubmit } = props
    if (user) {
        return <Redirect to="/" />
    }
    return (
        <div>
            <h1>パスワードの再設定</h1>
            <Row>
                <Col md="6">
                    <ForgotPasswordForm onSubmit={onSubmit} />
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
)(ForgotPassword);