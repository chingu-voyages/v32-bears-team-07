import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import "./CartProduct.css";

export default function CartProduct(props) {
    return (
        <div>
            <Container>
                <Card className=".cardCart">
                    <Card.Img className="imageCart" variant="top" src={props.img} />
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>${props.price}</Card.Text>
                </Card>
            </Container>
        </div>
    );
}
