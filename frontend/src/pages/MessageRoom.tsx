import * as React from 'react';
import { connect } from 'react-redux';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import { LoginUser, Message, MessageRoom as MessageRoomModel } from '../models';
import { allMessageRooms, findMessageRoomById } from '../data';
import { ApplicationState, selectors } from '../store';
import MessageForm from '../components/MessageForm';

const MessageRoomItem = (props: { activeId: string, room: MessageRoomModel, user: LoginUser }) => {
    const { activeId, room, user } = props
    return (
        <ListGroupItem tag={Link} to={`/messages/${room.id}`} className="text-dark text-decoration-none" active={room.id === activeId}>
            <h5>{room.participants.filter(m => m.id !== user.id).map(m => m.name).join('、')}</h5>
        </ListGroupItem>
    )
}

const MessageItem = (props: { message: Message, user: LoginUser }) => {
    const { message, user } = props
    if (message.sender.id === user.id) {
        return (
            <div className="mb-3">
                <div className="d-flex justify-content-end">
                    <div>
                        <div>
                            <small>あなた ({message.createdAt})</small>
                        </div>
                        <div className="border rounded p-2 bg-secondary text-light">
                            {message.body}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="mb-3">
            <div className="d-flex justify-content-start">
                <div>
                    <div>
                        <small><Link to={`/users/${message.sender.id}`}>{message.sender.name}</Link> ({message.createdAt})</small>
                    </div>
                    <div className="border rounded p-2">
                        {message.body}
                    </div>
                </div>
            </div>
        </div>
    )
}

export type MessageRoomProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & RouteComponentProps<{ id: string }>

export const MessageRoom = (props: MessageRoomProps) => {
    const { id } = props.match.params;
    const { user, onMessageSend } = props
    const room = findMessageRoomById(id);
    const messageRooms = allMessageRooms();
    return (
        <div>
            <div className="row">
                <div className="d-none d-md-block col-md-4">
                    <ListGroup>
                        {messageRooms.map(r => (<MessageRoomItem key={r.id} activeId={id} room={r} user={user} />))}
                    </ListGroup>
                </div>
                <div className="col-md-8">
                    <div className="mb-5">
                        <div className="d-md-none">
                            <h3 className=" mb-3">{room.participants.filter(m => m.id !== user.id).map((m, i) => <React.Fragment key={i}>{i === 0 ? '' : '、'}<Link to={`/users/${m.id}`}>{m.name}</Link></React.Fragment>)}</h3>
                        </div>
                        <div>
                            {room.messages.map(r => (<MessageItem key={r.id} message={r} user={user} />))}
                        </div>
                    </div>
                </div>
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