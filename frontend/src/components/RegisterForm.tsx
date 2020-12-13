import { useFormik } from 'formik';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';

interface FormValue {
    mailAddress: string;
    area: string;
    password: string;
}

export type RegisterFormProps = {
    onSubmit: (value: FormValue) => void
}

export const RegisterForm = (props: RegisterFormProps) => {
    const { onSubmit } = props
    const formik = useFormik({
        initialValues: {
            mailAddress: '',
            name: '',
            area: '',
            password: '',
        },
        validate: value => {
            const errors = {} as any
            if (!value.mailAddress) {
                errors.mailAddress = '必須項目です。'
            }
            if (!value.name) {
                errors.name = '必須項目です。'
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
                <Label>表示名</Label>
                <Input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    invalid={formik.touched.name && formik.errors.name ? true : false}
                />
                <FormFeedback>{formik.errors.name}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label>エリア</Label>
                <Input
                    id="area"
                    name="area"
                    type="select"
                    onChange={formik.handleChange}
                    value={formik.values.area}
                    invalid={formik.touched.area && formik.errors.area ? true : false}
                >
                    <option value="">選択してください</option>
                    <option value="北海道">北海道</option>
                    <option value="青森県">青森県</option>
                    <option value="岩手県">岩手県</option>
                    <option value="宮城県">宮城県</option>
                    <option value="秋田県">秋田県</option>
                    <option value="山形県">山形県</option>
                    <option value="福島県">福島県</option>
                    <option value="茨城県">茨城県</option>
                    <option value="栃木県">栃木県</option>
                    <option value="群馬県">群馬県</option>
                    <option value="埼玉県">埼玉県</option>
                    <option value="千葉県">千葉県</option>
                    <option value="東京都">東京都</option>
                    <option value="神奈川県">神奈川県</option>
                    <option value="新潟県">新潟県</option>
                    <option value="富山県">富山県</option>
                    <option value="石川県">石川県</option>
                    <option value="福井県">福井県</option>
                    <option value="山梨県">山梨県</option>
                    <option value="長野県">長野県</option>
                    <option value="岐阜県">岐阜県</option>
                    <option value="静岡県">静岡県</option>
                    <option value="愛知県">愛知県</option>
                    <option value="三重県">三重県</option>
                    <option value="滋賀県">滋賀県</option>
                    <option value="京都府">京都府</option>
                    <option value="大阪府">大阪府</option>
                    <option value="兵庫県">兵庫県</option>
                    <option value="奈良県">奈良県</option>
                    <option value="和歌山県">和歌山県</option>
                    <option value="鳥取県">鳥取県</option>
                    <option value="島根県">島根県</option>
                    <option value="岡山県">岡山県</option>
                    <option value="広島県">広島県</option>
                    <option value="山口県">山口県</option>
                    <option value="徳島県">徳島県</option>
                    <option value="香川県">香川県</option>
                    <option value="愛媛県">愛媛県</option>
                    <option value="高知県">高知県</option>
                    <option value="福岡県">福岡県</option>
                    <option value="佐賀県">佐賀県</option>
                    <option value="長崎県">長崎県</option>
                    <option value="熊本県">熊本県</option>
                    <option value="大分県">大分県</option>
                    <option value="宮崎県">宮崎県</option>
                    <option value="鹿児島県">鹿児島県</option>
                    <option value="沖縄県">沖縄県</option>
                </Input>
                <FormFeedback>{formik.errors.area}</FormFeedback>
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
                <Button type="submit" color="primary" block>登録</Button>
            </FormGroup>
        </Form>
    );
};

export default RegisterForm;