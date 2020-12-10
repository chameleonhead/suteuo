import * as React from 'react';
import { connect } from 'react-redux';
import { Container, ListGroup, ListGroupItem, ListGroupItemText } from 'reactstrap';
import { RouteComponentProps } from 'react-router-dom';
import { LoginUser, Message } from '../models';
import { findMessageRoomById } from '../data';
import { ApplicationState, selectors } from '../store';
import MessageForm from '../components/MessageForm';

const MessageItem = (props: { message: Message, user: LoginUser }) => {
    const { message, user } = props
    return (
        <ListGroupItem>
            <ListGroupItemText>{message.body}<small className="float-right">{message.sender.id === user.id ? 'あなた' : message.sender.name} ({message.createdAt})</small></ListGroupItemText>
        </ListGroupItem>
    )
}

export type MessageRoomProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & RouteComponentProps<{ id: string }>

export const MessageRoom = (props: MessageRoomProps) => {
    const { id } = props.match.params;
    const { user, onMessageSend } = props
    const room = findMessageRoomById(id);
    return (
        <div>
            <div className="mb-5">
                <h1>{room.participants.filter(m => m.id !== user.id).map(m => m.name).join('、')}</h1>
                <ListGroup>
                    {room.messages.map(r => (<MessageItem key={r.id} message={r} user={user} />))}
                </ListGroup>
            </div>
            <div className="position-fixed w-100 py-2 bg-light" style={{ bottom: 0, left: 0 }}>
                <Container>
                    <MessageForm onSubmit={onMessageSend} />
                </Container>
            </div>
        </div>
    )
}

const mapStateToProps = (state: ApplicationState) => ({
    user: selectors.selectUser(state) as LoginUser
})

const mapDispatchToProps = {
    onMessageSend: () => null
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MessageRoom);