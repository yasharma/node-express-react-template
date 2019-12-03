import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [dropdownOpen, setToggle] = useState(false);
  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand tag={Link} to="/">Authoring Tool</NavbarBrand>
      <NavbarToggler onClick={() => setToggle(!dropdownOpen)} />
      <Collapse isOpen={dropdownOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/">Home</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}