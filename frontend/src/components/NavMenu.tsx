import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Badge, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Navbar, NavbarBrand, NavbarText, NavItem, NavLink } from 'reactstrap';
import { actionCreators, ApplicationState, selectors } from '../store';
import './NavMenu.css';

export type NavMenuProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps

export const NavMenu = (props: NavMenuProps) => {
    const [isOpen, setOpen] = React.useState(false)
    const { user, notificationCount, messageCount, onLogout } = props
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
                                    {
                                        notificationCount > 0 
                                        ? <>{' '}<Badge>{notificationCount}</Badge></>
                                        : null
                                    }                                    
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/messages">
                                    <i className="far fa-comment-dots d-sm-none"></i>
                                    <span className="d-none d-sm-inline">メッセージ</span>
                                    {
                                        messageCount > 0 
                                        ? <>{' '}<Badge>{messageCount}</Badge></>
                                        : null
                                    }                                    
                                </NavLink>
                            </NavItem>
                        </ul>
                        <Dropdown isOpen={isOpen} toggle={() => setOpen(!isOpen)}>
                            <DropdownToggle tag="div">
                                <NavbarText>
                                    {user.name}
                                </NavbarText>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem tag="button" onClick={onLogout}>ログアウト</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
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

const mapStateToProps = (state: ApplicationState) => ({
    user: selectors.selectUser(state),
    notificationCount: selectors.selectUnreadNotificationCount(state),
    messageCount: selectors.selectUnreadMessageCount(state),
})
const mapDispatchToProps = {
    onLogout: actionCreators.logout
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavMenu) as any;