import { Redirect, RouteComponentProps } from 'react-router-dom';
import { findUserById } from '../data';

export type UserDetailsProps = RouteComponentProps<{ id: string }>

export const UserDetails = (props: UserDetailsProps) => {
    const { id } = props.match.params;
    const user = findUserById(id)
    if (user) {
        return (
            <div>
                <h1>{user.name}</h1>
            </div>
        );
    }
    return <Redirect to="/users" />
}
export default (props: any) => <UserDetails {...props} />;
