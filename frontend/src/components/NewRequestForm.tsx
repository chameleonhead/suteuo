import { useFormik } from 'formik';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';

interface FormValue {
    title: string;
}

export type NewRequestFormProps = {
    onSubmit: (value: FormValue) => void
}

export const NewRequestForm = (props: NewRequestFormProps) => {
    const { onSubmit } = props
    const formik = useFormik({
        initialValues: {
            title: '',
            password: '',
            rememberMe: false,
        },
        validate: value => {
            const errors = {} as any
            if (!value.title) {
                errors.title = '必須項目です。'
            }
            return errors
        },
        onSubmit: onSubmit,
    });
    return (
        <Form onSubmit={formik.handleSubmit}>
            <FormGroup>
                <Label>タイトル</Label>
                <Input
                    id="title"
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    invalid={formik.touched.title && formik.errors.title ? true : false}
                />
                <FormFeedback>{formik.errors.title}</FormFeedback>
            </FormGroup>
            <FormGroup className="mt-3">
                <Button color="primary" block>作成</Button>
            </FormGroup>
        </Form>
    );
};

export default NewRequestForm;