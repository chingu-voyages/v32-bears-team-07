import React from "react";
import { Container } from "react-bootstrap";
import Product from "./Product";
import "./Products.css";

export default function Products(props) {
  return (
    <div>
      <Container>
        {props.products ? (
          <div className="productsDiv">
            {props.products.map((item) => {
              return (
                <Product
                  key={item.id}
                  img={item.img}
                  title={item.title}
                  price={item.price}
                />
              );
            })}
          </div>
        ) : null}
      </Container>
    </div>
  );
}
