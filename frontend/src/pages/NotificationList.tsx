import * as React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import { LoginUser, Notification } from '../models';
import { allNotifications } from '../data';
import { ApplicationState, selectors } from '../store';

const NotificationItem = (props: { notification: Notification }) => {
    const { notification } = props
    if (notification.href) {
        return (
            <ListGroupItem tag={Link} to={notification.href} className="text-dark text-decoration-none">
                <ListGroupItemHeading>{notification.title}</ListGroupItemHeading>
                <ListGroupItemText>{notification.body}<small className="float-right">{notification.createdAt}</small></ListGroupItemText>
            </ListGroupItem>
        )
    }
    return (
        <ListGroupItem>
            <ListGroupItemHeading>{notification.title}</ListGroupItemHeading>
            <ListGroupItemText>{notification.body}<small className="float-right">{notification.createdAt}</small></ListGroupItemText>
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