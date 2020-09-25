import React from "react";
import { Navbar, Button, Form, FormControl, Nav } from "react-bootstrap";

export default function Navigation() {
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="/">Examanager</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
      </Nav>
    </Navbar>
  );
}
