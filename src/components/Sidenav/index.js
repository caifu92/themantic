import React from 'react';
import { NavLink as RouterNavLink, useHistory } from 'react-router-dom';
import { Sidenav, Nav, Icon } from 'rsuite';

const NavLink = props => <Nav.Item hasTooltip={true} componentClass={RouterNavLink} {...props} />;

const AppSidenav = () => {
    let history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('t__isAuthenticated');
        localStorage.removeItem('t__demo-user');
        localStorage.removeItem('t__user-type');
        history.push('/login');
    }

    return (
        <Sidenav activeKey="1" expanded={false}>
            {
                localStorage.getItem('t__user-type')==='ADVISOR' &&
                <Sidenav.Body>
                <Nav>
                    <NavLink eventKey="1" to="/clients" activeClassName="is-active">
                        <Icon icon="peoples" /> Clients
                    </NavLink>

                    <NavLink disabled={false} eventKey="4" to="/analyse">
                        <Icon icon="pie-chart" /> Portfolio Analyser
                    </NavLink>

                    <NavLink eventKey="2" to="/questionnaire" activeClassName="is-active">
                        <Icon icon="coincide" /> Personalized onboarding form for your website
                    </NavLink>

                    {/* <NavLink disabled={true} eventKey="3" to="#">
                        <Icon icon="charts-line" /> Analytics
                    </NavLink> */}

                    <NavLink disabled={false} eventKey="4" to="/settings">
                        <Icon icon="gear" /> Settings
                    </NavLink>

                    <Nav.Item eventKey="5" onClick={handleLogout} className="log-out">
                        <Icon icon="off" style={{ color: '#fff' }} />
                    </Nav.Item>
                </Nav>
            </Sidenav.Body>
            }
            {
                localStorage.getItem('t__user-type')==='ADMIN' &&
                <Sidenav.Body>
                <Nav>
                    <NavLink eventKey="1" to="/advisors" activeClassName="is-active">
                        <Icon icon="peoples" /> Advisors
                    </NavLink>

                    <NavLink disabled={false} eventKey="4" to="/settings">
                        <Icon icon="gear" /> Settings
                    </NavLink>
                    <Nav.Item eventKey="5" onClick={handleLogout} className="log-out">
                        <Icon icon="off" style={{ color: '#fff' }} />
                    </Nav.Item>
                </Nav>
            </Sidenav.Body>
            }
        </Sidenav>
    )
};

export default AppSidenav;