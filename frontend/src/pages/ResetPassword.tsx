import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import { connect } from 'react-redux';

import { actionCreators, ApplicationState, selectors } from '../store';
import { Redirect } from 'react-router';
import { useFormik } from 'formik';

const ResetPasswordForm = (props: any) => {
    const { onSubmit } = props
    const formik = useFormik({
        initialValues: {
            newPassword: '',
        },
        validate: value => {
            const errors = {} as any
            if (!value.newPassword) {
                errors.newPassword = '必須項目です。'
            }
            return errors
        },
        onSubmit: onSubmit,
    });
    return (
        <Form onSubmit={formik.handleSubmit}>
            <FormGroup>
                <Label>新しいパスワード</Label>
                <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.newPassword}
                    invalid={formik.touched.newPassword && formik.errors.newPassword ? true : false}
                />
                <FormFeedback>{formik.errors.newPassword}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Button type="submit" color="primary" block>パスワードを再設定する</Button>
            </FormGroup>
        </Form>
    )
}

export type ResetPasswordProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export const ResetPassword = (props: ResetPasswordProps) => {
    const { user, onSubmit } = props
    if (user) {
        return <Redirect to="/" />
    }
    return (
        <div>
            <h1>パスワードの再設定</h1>
            <Row>
                <Col md="6">
                    <ResetPasswordForm onSubmit={onSubmit} />
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
)(ResetPassword);