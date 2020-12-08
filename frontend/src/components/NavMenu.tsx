import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarText, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export type NavMenuProps = {
    user?: any;
    notifications: any[];
}

const UserInfo = (props: NavMenuProps) => {
    const { user } = props
    return (
        <NavbarText>
            {user.name}
        </NavbarText>
    )
}

export const NavMenu = (props: NavMenuProps) => {
    const [isOpen, setOpen] = React.useState(false)
    const { user } = props
    if (user) {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">捨て魚</NavbarBrand>
                        <ul className="nav mr-auto">
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/requests/new">
                                    <i className="fas fa-pencil-alt d-sm-none"></i>
                                    <span className="d-none d-sm-inline">リクエスト</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/notifications">
                                    <i className="fas fa-bell d-sm-none"></i>
                                    <span className="d-none d-sm-inline">通知</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/notifications">
                                    <i className="far fa-comment-dots d-sm-none"></i>
                                    <span className="d-none d-sm-inline">メッセージ</span>
                                </NavLink>
                            </NavItem>
                        </ul>
                        <NavbarToggler onClick={() => setOpen(!isOpen)} className="mr-2" />
                        <Collapse className="d-sm-inline-flex justify-content-end" isOpen={isOpen} navbar>
                            <UserInfo {...props} />
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        )
    }
    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                <Container>
                    <NavbarBrand tag={Link} to="/">捨て魚</NavbarBrand>
                    <div className="d-flex justify-content-end">
                        <ul className="nav mr-auto">
                            <NavItem className="mr-2">
                                <NavLink tag={Link} className="text-dark" to="/register">登録</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/login">ログイン</NavLink>
                            </NavItem>
                        </ul>
                    </div>
                </Container>
            </Navbar>
        </header>
    )
}

export default (props: any) => <NavMenu {...props} />;