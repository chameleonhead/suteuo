import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import { connect } from 'react-redux';

import { actionCreators, ApplicationState, selectors } from '../store';
import { Redirect, RouteComponentProps } from 'react-router';
import { useFormik } from 'formik';

interface FormValue {
    newPassword: string
}

const ResetPasswordForm = (props: { onSubmit: (value: FormValue) => void }) => {
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

export type ResetPasswordProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & RouteComponentProps;

export const ResetPassword = (props: ResetPasswordProps) => {
    const { user, onSubmit, location } = props
    const requestId = new URLSearchParams(location.search).get('requestId')
    if (!requestId || user) {
        return <Redirect to="/" />
    }
    return (
        <div>
            <h1>パスワードの再設定</h1>
            <Row>
                <Col md="6">
                    <ResetPasswordForm onSubmit={value => onSubmit({ ...value, requestId })} />
                </Col>
            </Row>
        </div>
    )
};

const mapStateToProps = (state: ApplicationState) => ({
    user: selectors.selectUser(state)
})
const mapDispatchToProps = {
    onSubmit: actionCreators.resetPassword
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPassword);