import { useFormik } from 'formik';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

const LoginForm = () => {
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: (values: any) => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <Form onSubmit={formik.handleSubmit}>
            <FormGroup>
                <Label>ユーザー名</Label>
                <Input
                    id="username"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
            </FormGroup>
            <FormGroup>
                <Label>パスワード</Label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
            </FormGroup>
            <FormGroup className="mt-3">
                <Button color="primary" block>ログイン</Button>
            </FormGroup>
        </Form>
    );
};

export default LoginForm;