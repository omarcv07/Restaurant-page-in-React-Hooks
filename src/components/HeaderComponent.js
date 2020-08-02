import React, { Fragment, useState } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
Button, Modal, ModalHeader, ModalBody, Label, Form, FormGroup, Input } from 'reactstrap';
import { NavLink } from 'react-router-dom';
// import bistek from 'assets/images/123.jpg'
// import { baseUrl } from '../shared/baseUrl'

const Header = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)

    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleNav = () => setIsNavOpen(!isNavOpen)
    const toggleModal = () => setIsModalOpen(!isModalOpen)

    const handleLogin = (event) => {
        event.preventDefault();
        alert(`Username: ${username} Password: ${password} Remember: ${remember}`);
        toggleModal();
    }

    return (
        <Fragment>
            <Navbar dark expand="md">
                <div className="container">
                <NavbarToggler onClick={toggleNav} />
                <NavbarBrand className="mr-auto" href="/">
                    <img src="assets/images/logo.png" height="30" width="41"
                        alt="Ristorante Con Fusion" />
                </NavbarBrand>
                <Collapse isOpen={isNavOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink className="nav-link" to="/home">
                                <span className="fa fa-home fa-lg"></span> Home
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/aboutus">
                                <span className="fa fa-info fa-lg"></span> About us
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/menu">
                                <span className="fa fa-list fa-lg"></span> Menu
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/contactus">
                                <span className="fa fa-list fa-lg"></span> Contact us
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Button outline onClick={toggleModal}>
                                <span className="fa fa-sign-in fa-lg"></span> Login
                            </Button>
                        </NavItem>
                    </Nav>
                </Collapse>
                </div>
            </Navbar>
            <Jumbotron>
                <div className="container">
                    <div className="row row-header">
                        <div className="col-12 col-sm-6">
                            <h1>Ristorante Con Fusion</h1>
                            <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                        </div>
                    </div>
                </div>
            </Jumbotron>
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Login</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleLogin}>
                        <FormGroup>
                            <Label htmlFor="username">Username</Label>                            
                            <Input type="text" id="username" name="username"
                                onChange={e => setUsername(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>                            
                            <Input type="password" id="password" name="password"
                                onChange={e => setPassword(e.target.value)} />
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" name="remember"
                                onChange={e => setRemember(true)}  />
                                Remember me
                            </Label>
                        </FormGroup>
                        <Button type="submit" value="submit" color="primary">Login</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </Fragment>
    );
}

export default Header