import { useFormik } from 'formik';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';

interface FormValue {
    username: string;
    password: string;
}

export type RegisterFormProps = {
    onSubmit: (value: FormValue) => void
}

export const RegisterForm = (props: RegisterFormProps) => {
    const { onSubmit } = props
    const formik = useFormik({
        initialValues: {
            username: '',
            mailAddress: '',
            password: '',
        },
        validate: value => {
            const errors = {} as any
            if (!value.username) {
                errors.username = '必須項目です。'
            }
            if (!value.password) {
                errors.password = '必須項目です。'
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
                <Label>ユーザー名</Label>
                <Input
                    id="username"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    invalid={formik.touched.username && formik.errors.username ? true : false}
                />
                <FormFeedback>{formik.errors.username}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label>パスワード</Label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    invalid={formik.touched.password && formik.errors.password ? true : false}
                />
                <FormFeedback>{formik.errors.password}</FormFeedback>
            </FormGroup>
            <FormGroup className="mt-3">
                <Button color="primary" block>登録</Button>
            </FormGroup>
        </Form>
    );
};

export default RegisterForm;