import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import "./Product.css";

export default function Product(props) {
  return (
    <div>
      <Container>
        <Card className=".card">
          <Card.Img className="image" variant="top" src={props.img} />
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>${props.price}</Card.Text>
        </Card>
      </Container>
    </div>
  );
}
