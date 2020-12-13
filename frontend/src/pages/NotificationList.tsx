import * as React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import { LoginUser, Notification } from '../models';
import { allNotifications } from '../data';
import { ApplicationState, selectors } from '../store';

const NotificationItem = (props: { notification: Notification }) => {
    const { notification } = props
    if (notification.href) {
        return (
            <ListGroupItem tag={Link} to={notification.href} className="text-dark text-decoration-none">
                <div className="d-flex justify-content-between">
                    <h5>{notification.title}</h5>
                    <small>{notification.createdAt}</small>
                </div>
                <div>{notification.body}</div>
            </ListGroupItem>
        )
    }
    return (
        <ListGroupItem>
            <div className="d-flex justify-content-between">
                <h5>{notification.title}</h5>
                <small>{notification.createdAt}</small>
            </div>
            <div>{notification.body}</div>
        </ListGroupItem>
    )
}

export type NotificationListProps = ReturnType<typeof mapStateToProps> & RouteComponentProps<{ id: string }>

export const NotificationList = (_: NotificationListProps) => {
    const notifications = allNotifications();
    return (
        <div>
            <ListGroup>
                {notifications.map(r => (<NotificationItem key={r.id} notification={r} />))}
            </ListGroup>
        </div>
    )
}

const mapStateToProps = (state: ApplicationState) => ({
    user: selectors.selectUser(state) as LoginUser
})

export default connect(
    mapStateToProps,
)(NotificationList);