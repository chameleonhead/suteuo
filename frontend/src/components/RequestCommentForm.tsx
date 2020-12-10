import { useFormik } from 'formik';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';

export interface FormValue {
    comment: string;
}

export type RequestCommentFormProps = {
    onSubmit: (value: FormValue) => void
}

export const RequestCommentForm = (props: RequestCommentFormProps) => {
    const { onSubmit } = props
    const formik = useFormik({
        initialValues: {
            comment: '',
        },
        validate: value => {
            const errors = {} as any
            if (!value.comment) {
                errors.comment = '必須項目です。'
            }
            return errors
        },
        onSubmit: onSubmit,
    });
    return (
        <Form onSubmit={formik.handleSubmit}>
            <FormGroup>
                <Label>コメントを追加する</Label>
                <Input
                    id="comment"
                    name="comment"
                    type="textarea"
                    onChange={formik.handleChange}
                    value={formik.values.comment}
                    invalid={formik.touched.comment && formik.errors.comment ? true : false}
                />
                <FormFeedback>{formik.errors.comment}</FormFeedback>
            </FormGroup>
            <FormGroup className="mt-3">
                <Button color="primary" block>コメント</Button>
            </FormGroup>
        </Form>
    );
};

export default RequestCommentForm;