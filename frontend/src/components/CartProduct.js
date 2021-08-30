import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import "./CartProduct.css";

export default function CartProduct(props) {
    return (
        <div>
            <Container>
                <Card className=".card">
                    <Card.Img className="image" variant="top" src={props.img} />
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>${props.price}</Card.Text>
                    <Button variant="primary" onClick={props.addToCart} id={props.id}>
                        Remove from Cart
                    </Button>
                </Card>
            </Container>
        </div>
    );
}
