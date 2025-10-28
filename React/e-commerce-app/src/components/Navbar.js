import React, { useContext } from "react";
import { Navbar as Navb, Nav, Container } from "react-bootstrap";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { state } = useContext(CartContext);
  const count = state.Cart.reduce((sum, p) => sum + p.qte, 0);

  return (
    <Navb bg="dark" variant="dark" expand="lg">
      <Container>
        <Navb.Brand href="#">🛍️ ReactShop</Navb.Brand>
        <Nav className="ms-auto">
          <Nav.Link href="#">Produits</Nav.Link>
          <Nav.Link href="#">Panier ({count})</Nav.Link>
        </Nav>
      </Container>
    </Navb>
  );
};

export default Navbar;
