

import * as React from 'react';
import { Link } from 'react-router-dom';
import { LoginUser, Message } from '../models';

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

export type MessageListProps = {
    messages: Message[];
    user: LoginUser;
}

export const MessageList = (props: MessageListProps) => {
    const { messages, user } = props;
    return (
        <div>
            {messages.map(r => (<MessageItem key={r.id} message={r} user={user} />))}
        </div>
    )
}

export default MessageList;

