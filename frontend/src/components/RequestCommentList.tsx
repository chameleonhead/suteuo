import * as React from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { RequestComment, User } from '../models';

const RequestCommentItem = (props: { comment: RequestComment, user?: User, onDelete?: (id: string) => void }) => {
    const { comment, user, onDelete } = props
    const [isOpen, setOpen] = React.useState(false);
    return (
        <ListGroupItem key={comment.id}>
            <div className="d-flex justify-content-between">
                <Link to={`/users/${comment.createdBy.id}`}>{comment.createdBy.name}</Link>
                <div className="d-flex" style={{ height: '2rem' }}>
                    <small className="float-right">{comment.createdAt}</small>
                    {user && user.id === comment.createdBy.id && (
                        <Dropdown className="ml-2" isOpen={isOpen} toggle={() => setOpen(!isOpen)}>
                            <DropdownToggle tag="div">
                                <Button color="default" size="sm"><i className="fas fa-ellipsis-v"></i></Button>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem tag="button" onClick={() => onDelete && onDelete(comment.id)}>削除</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    )}
                </div>
            </div>
            <div>{comment.comment}</div>
        </ListGroupItem>
    )
}

export type RequestCommentListProps = {
    comments: RequestComment[];
    user?: User;
    onDelete?: (id: string) => void;
}

export const RequestCommentList = (props: RequestCommentListProps) => {
    const { comments, user, onDelete } = props;

    if (!comments || comments.length === 0) {
        return <div>コメントがありません。</div>
    }

    return (
        <ListGroup>
            {comments.map(r => (<RequestCommentItem key={r.id} comment={r} user={user} onDelete={onDelete} />))}
        </ListGroup>
    )
}

export default RequestCommentList;
