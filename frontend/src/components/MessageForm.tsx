import { useFormik } from 'formik';
import { Button, Col, Form, Input, Row } from 'reactstrap';

export interface FormValue {
    body: string;
}

export type MessageFormProps = {
    onSubmit: (value: FormValue) => void
}

export const MessageForm = (props: MessageFormProps) => {
    const { onSubmit } = props
    const formik = useFormik({
        initialValues: {
            body: '',
        },
        validate: value => {
            const errors = {} as any
            if (!value.body) {
                errors.username = '必須項目です。'
            }
            return errors
        },
        onSubmit: onSubmit,
    });
    return (
        <Form onSubmit={formik.handleSubmit}>
            <Row noGutters>
                <Col>
                    <Input
                        id="body"
                        name="body"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.body}
                    />
                </Col>
                <Col className="pl-2 col-auto">
                    <Button type="submit" color="primary" block className="h-100">送信</Button>
                </Col>
            </Row>
        </Form>
    );
};

export default MessageForm;