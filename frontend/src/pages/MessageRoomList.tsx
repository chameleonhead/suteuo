import * as React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { RouteComponentProps } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LoginUser, MessageRoom as MessageRoomModel } from '../models';
import { allMessageRooms } from '../data';
import { ApplicationState, selectors } from '../store';

const MessageRoomItem = (props: { room: MessageRoomModel, user: LoginUser }) => {
    const { room, user } = props
    const message = room.messages.length ? room.messages[room.messages.length - 1] : undefined;
    return (
        <ListGroupItem tag={Link} to={`/messages/${room.id}`} className="text-dark text-decoration-none">
            <h5>{room.participants.filter(m => m.id !== user.id).map(m => m.name).join('、')}</h5>
            {
                message
                    ? <div className="d-flex justify-content-between">{message.body}<small>{message.sender.id === user.id ? 'あなた' : message.sender.name} ({message.createdAt})</small></div>
                    : <div></div>
            }
        </ListGroupItem>
    )
}

export type MessageRoomListProps = ReturnType<typeof mapStateToProps> & RouteComponentProps

export const MessageRoomList = (props: MessageRoomListProps) => {
    const { user } = props
    const messageRooms = allMessageRooms();
    return (
        <div>
            <ListGroup>
                {messageRooms.map(r => (<MessageRoomItem key={r.id} room={r} user={user} />))}
            </ListGroup>
        </div>
    )
}

const mapStateToProps = (state: ApplicationState) => ({
    user: selectors.selectUser(state) as LoginUser
})

export default connect(
    mapStateToProps
)(MessageRoomList);