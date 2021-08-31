import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import Product from "./Product";
import AuthApiService from "../Api-Service";
import TokenService from '../token-service';
import "./Products.css";

export default function Products(props) {
  const [products, setProducts] = useState("");
  const [loggedIn, setLoggedIn] = useState('');

  //fetches all products
  useEffect(() => {
    setLoggedIn(TokenService.hasAuthToken())
    AuthApiService.getProducts().then((res) => {
      setProducts(res);
      console.log(res);
    });
  }, []);

  const addToCart = async (event) => {
    const idNumber = event.currentTarget.dataset.id;

    let productTitleMapped = products.map(item => {
      return item.name
    })

    let productImgMapped = products.map(item => {
      return item.img
    })

    let productDescriptionMapped = products.map(item => {
      return item.description
    })

    let productCompanyMapped = products.map(item => {
      return item.company
    })

    let productPriceMapped = products.map(item => {
      return item.price
    })

    let productStockMapped = products.map(item => {
      return item.stock
    })

    let productDigitalMapped = products.map(item => {
      return item.digitalProduct
    })

    let productRatingMapped = products.map(item => {
      return item.rating
    })

    let productOwnerMapped = products.map(item => {
      return item.ownerId
    })

    const productTitle = productTitleMapped[idNumber];
    const productImg = productImgMapped[idNumber];
    const productDescription = productDescriptionMapped[idNumber];
    const productCompany = productCompanyMapped[idNumber];
    const productPrice = productPriceMapped[idNumber];
    const productStock = productStockMapped[idNumber];
    const productDigital = productDigitalMapped[idNumber];
    const productRating = productRatingMapped[idNumber];
    const productOwner = productOwnerMapped[idNumber];

    console.log(productTitle)

    await AuthApiService.addCartProduct({ 
      title: productTitle, 
      description: productDescription, 
      company: productCompany, 
      img: productImg, 
      price: productPrice, 
      stock: productStock,
      digitalProduct: productDigital, 
      rating: productRating, 
      ownerId: productOwner 
    });
    window.location.reload(false);
  }

  return (
    <div className="products">
      <Container>
        {products ? (
          <div className="productsDiv">
            {products.map((item, idx) => {
              return (
                <div className="productsList" key={idx}>
                  <Product
                    id={item._id}
                    img={item.img}
                    title={item.name}
                    price={item.price}
                  />
                  {loggedIn ? (
                    <Button className="buttonProducts" variant="primary" onClick={addToCart} data-id={idx}>
                      Add to Cart
                    </Button>
                  ) : (
                    <Button className="buttonProducts" href="/login">
                      Add to Cart
                    </Button>
                  )}

                </div>

              );
            })}
          </div>
        ) : null}
      </Container>
    </div>
  );
}
