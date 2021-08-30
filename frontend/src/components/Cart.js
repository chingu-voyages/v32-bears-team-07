import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Product from "./Product";
import AuthApiService from "../Api-Service";
import "./Cart.css";

function Cart() {
  const [cartProducts, setCartProducts] = useState("");

  useEffect(() => {
    AuthApiService.getCartProducts().then((res) => {
      setCartProducts(res);
      console.log(res);
    });
  }, []);

  return (
    <div>
      <Container>
        {cartProducts ? (
          <div className="productsDiv">
            {cartProducts.map((item) => {
              return (
                <Product
                  key={item.ownerId}
                  id={item.ownerId}
                  img={item.img}
                  title={item.name}
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

export default Cart;
