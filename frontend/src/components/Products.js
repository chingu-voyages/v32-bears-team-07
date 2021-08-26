import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Product from "./Product";
import AuthApiService from "../Api-Service";
import "./Products.css";

export default function Products(props) {
  const [products, setProducts] = useState("");

  //fetches all products
  useEffect(() => {
    AuthApiService.getProducts().then((res) => {
      setProducts(res);
      console.log(res);
    });
  }, []);

  return (
    <div>
      <Container>
        {products ? (
          <div className="productsDiv">
            {products.map((item) => {
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

  // const addToCart = (props) => {
  //   console.log("add to cart");
  //   console.log(`Product ID: ${props.target.id}`);
  // };

  // return (
  //   <div>
  //     <Container>
  //       {props.products ? (
  //         <div className="productsDiv">
  //           {props.products.map((item) => {
  //             return (
  //               <Product
  //                 key={item.id}
  //                 id={item.id}
  //                 img={item.img}
  //                 title={item.title}
  //                 price={item.price}
  //                 addToCart={addToCart}
  //               />
  //             );
  //           })}
  //         </div>
  //       ) : null}
  //     </Container>
  //   </div>
  // );
}
