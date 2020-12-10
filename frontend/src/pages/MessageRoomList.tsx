import * as React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { RouteComponentProps } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LoginUser, MessageRoom } from '../models';
import { allMessageRooms } from '../data';
import { ApplicationState, selectors } from '../store';

const MessageRoomItem = (props: { room: MessageRoom, user: LoginUser }) => {
    const { room, user } = props
    const message = room.messages.length ? room.messages[room.messages.length - 1] : undefined;
    return (
        <ListGroupItem tag={Link} to={`/messages/${room.id}`} className="text-dark text-decoration-none">
            <ListGroupItemHeading>{room.participants.filter(m => m.id !== user.id).map(m => m.name).join('、')}</ListGroupItemHeading>
            {
                message
                    ? <ListGroupItemText>{message.body}<small className="float-right">{message.sender.id === user.id ? 'あなた' : message.sender.name} ({message.createdAt})</small></ListGroupItemText>
                    : <ListGroupItemText></ListGroupItemText>
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