import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarText, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export type NavMenuProps = {
    user?: any;
    notifications: any[];
}

const NavList = (props: NavMenuProps) => {
    return (
        <ul className="navbar-nav flex-grow">
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="/requests">リクエスト</NavLink>
            </NavItem>
            {props.user && (
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/notifications">通知</NavLink>
                </NavItem>
            )}
            {props.user && (
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/messages">メッセージ</NavLink>
                </NavItem>
            )}
        </ul>
    )
}

const UserInfo = (props: NavMenuProps) => {
    const { user } = props
    if (user) {
        return (
            <NavbarText>
                {user.name}
            </NavbarText>
        )
    }
    return (
        <ul className="navbar-nav flex-grow">
            <NavItem className="mr-2">
                <NavLink tag={Link} className="text-dark" to="/register">登録</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="/login">ログイン</NavLink>
            </NavItem>
        </ul>
    )
}

export const NavMenu = (props: NavMenuProps) => {
    const [isOpen, setOpen] = React.useState(false)
    const { user } = props
    if (user) {

    }
    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                <Container>
                    <NavbarBrand tag={Link} to="/">捨て魚</NavbarBrand>
                    <NavbarToggler onClick={() => setOpen(!isOpen)} className="mr-2" />
                    <Collapse className="d-sm-inline-flex justify-content-between" isOpen={isOpen} navbar>
                        <NavList {...props} />
                        <UserInfo {...props} />
                    </Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default (props: any) => <NavMenu {...props} />;