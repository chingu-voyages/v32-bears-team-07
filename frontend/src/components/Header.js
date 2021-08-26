import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import TokenService from '../token-service';
import './Header.css';

const Header = () => {

    const [loggedIn, setLoggedIn] = useState('')

    useEffect(() => {
        setLoggedIn(TokenService.hasAuthToken())
    });

    function handleLogoutClick() {
        TokenService.clearAuthToken()
        window.location.reload(false);
    }

    return (
        <header>
            <Navbar bg="light" expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand href="/">Popup Shop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="/"><i className='fas fa-home'></i> Home</Nav.Link>

                            <Nav.Link href="/cart"><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>

                            {loggedIn ? (
                                <Nav.Link href="/login" onClick={handleLogoutClick}><i className='fas fa-user'></i> Log Out </Nav.Link>
                            ) : (
                                <Nav.Link href="/login"><i className='fas fa-user'></i> Sign In </Nav.Link>
                            )}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </header>
    )
}

export default Header