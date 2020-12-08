import { Col, Row } from 'reactstrap';
import NewRequestForm, { NewRequestFormProps } from '../components/NewRequestForm';

export type NewRequestProps = {
    onSubmit: NewRequestFormProps['onSubmit']
}

export const NewRequest = (props: NewRequestProps) => {
    const { onSubmit } = props
    return (
        <div>
            <h1>新規リクエスト</h1>
            <Row>
                <Col md="6">
                    <NewRequestForm onSubmit={onSubmit} />
                </Col>
            </Row>
        </div>
    )
};

export default NewRequest;