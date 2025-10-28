import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Card, Button } from "react-bootstrap";

const ProductCard = ({ prod }) => {
  const { dispatch } = useContext(CartContext);

  return (
    <Card style={{ width: "18rem", margin: "10px" }}>
      <Card.Img variant="top" src={prod.image} />
      <Card.Body>
        <Card.Title>{prod.intitule}</Card.Title>
        <Card.Text>{prod.prix} MAD</Card.Text>
        <Button
          variant="success"
          onClick={() => dispatch({ type: "ADD_TO_CART", payload: prod })}
        >
          🛒 Add To Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
