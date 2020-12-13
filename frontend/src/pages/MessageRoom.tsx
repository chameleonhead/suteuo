import * as React from 'react';
import { connect } from 'react-redux';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import { LoginUser, MessageRoom as MessageRoomModel } from '../models';
import { findMessageRoomsForUser, findMessageRoomById } from '../data';
import { ApplicationState, selectors } from '../store';
import MessageForm from '../components/MessageForm';
import MessageList from '../components/MessageList';

const MessageRoomItem = (props: { activeId: string, room: MessageRoomModel, user: LoginUser }) => {
    const { activeId, room, user } = props
    return (
        <ListGroupItem tag={Link} to={`/messages/${room.id}`} className="text-dark text-decoration-none" active={room.id === activeId}>
            <h5>{room.participants.filter(m => m.id !== user.id).map(m => m.name).join('、')}</h5>
        </ListGroupItem>
    )
}

export type MessageRoomProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & RouteComponentProps<{ id: string }>

export const MessageRoom = (props: MessageRoomProps) => {
    const { id } = props.match.params;
    const { user, onMessageSend } = props
    const room = findMessageRoomById(id);
    if (!room) {
        return <Redirect to="/messages" />
    }
    const messageRooms = findMessageRoomsForUser(user.id);
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
                        <MessageList messages={room.messages} user={user} />
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