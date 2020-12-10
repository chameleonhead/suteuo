import * as React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, ListGroupItemText } from 'reactstrap';
import { RouteComponentProps } from 'react-router-dom';
import { LoginUser, Message } from '../models';
import { findMessageRoomById } from '../data';
import { ApplicationState, selectors } from '../store';

const MessageItem = (props: { message: Message, user: LoginUser }) => {
    const { message, user } = props
    return (
        <ListGroupItem>
            <ListGroupItemText>{message.body}<small className="float-right">{message.sender.id === user.id ? 'あなた' : message.sender.name} ({message.createdAt})</small></ListGroupItemText>
        </ListGroupItem>
    )
}

export type MessageRoomProps = ReturnType<typeof mapStateToProps> & RouteComponentProps<{ id: string }>

export const MessageRoom = (props: MessageRoomProps) => {
    const { id } = props.match.params;
    const { user } = props
    const room = findMessageRoomById(id);
    return (
        <div>
            <h1>{room.participants.filter(m => m.id !== user.id).map(m => m.name).join('、')}</h1>
            <ListGroup>
                {room.messages.map(r => (<MessageItem key={r.id} message={r} user={user} />))}
            </ListGroup>
        </div>
    )
}

const mapStateToProps = (state: ApplicationState) => ({
    user: selectors.selectUser(state) as LoginUser
})

export default connect(
    mapStateToProps
)(MessageRoom);