import React from "react";
import { Container } from "react-bootstrap";
import Product from "./Product";
import "./Products.css";

export default function Products(props) {
  const addToCart = (props) => {
    console.log("add to cart");
    console.log(`Product ID: ${props.target.id}`);
  };
  return (
    <div>
      <Container>
        {props.products ? (
          <div className="productsDiv">
            {props.products.map((item) => {
              return (
                <Product
                  key={item.id}
                  id={item.id}
                  img={item.img}
                  title={item.title}
                  price={item.price}
                  addToCart={addToCart}
                />
              );
            })}
          </div>
        ) : null}
      </Container>
    </div>
  );
}
