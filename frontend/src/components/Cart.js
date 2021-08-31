import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import CartProduct from "./CartProduct";
import AuthApiService from "../Api-Service";
import TokenService from '../token-service';
import "./Cart.css";

function Cart() {
  const [cartProducts, setCartProducts] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [shipping, setShipping] = useState('free');
  const [tax, setTax] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(async () => {
    AuthApiService.getCartProducts().then((res) => {
      setCartProducts(res);

      let cost = 0;
      for (let i = 0; i < res.length; i++) {
        cost += res[i].price
      }
      setTotalPrice(cost)

      //MA sales tax
      let taxes = cost * 0.0625;
      setTax(taxes.toFixed(2));

      let totalOrder = cost + taxes;
      setOrderTotal(totalOrder.toFixed(2));

      console.log(res);
    });
  }, []);

  const handleRemove = (id) => {
    const productId = id;
    AuthApiService.deleteProduct(id);
    const newCartList = cartProducts.filter((item) => item._id !== productId);
    setCartProducts(newCartList)
    setTimeout(() => {
      window.location.reload(false);
    }, 500);

  }

  return (
    <div className="cart">
      <div className="cartItem">
        <div className="sidenav">
          <Container>
            {cartProducts.length > 0 ? (
              <div className="CartProductsDiv">
                {cartProducts.map((item, idx) => {
                  return (
                    <div key={idx}>
                      <CartProduct
                        key={item.ownerId}
                        id={item.ownerId}
                        img={item.img}
                        title={item.title}
                        price={item.price}
                      />
                      <Button className="buttonCart" variant="primary" onClick={() => handleRemove(item._id)}>
                        Remove
                      </Button>
                    </div>
                  );
                })}
              </div>
            ) : <div className="emptyCartMessage">Your cart is empty</div>}
          </Container>
        </div>
      </div>
      <div className="cartItem">
        <ul className="totalPrice">
          <h3>Order Summary</h3>
          <div className="priceList">Items: <div>${totalPrice}</div></div>
          <div className="priceList">Shipping & handling: <div>{shipping}</div></div>
          <div className="priceList">Total before tax: <div>${totalPrice}</div></div>
          <div className="priceList">Estimated tax: <div>${tax}</div></div>
          <div className="orderTotal">
            <div className="priceList">Order total: <div>${orderTotal}</div></div>
          </div>
          <div className="orderButton"><Button>Place your order</Button></div>
        </ul>
      </div>

    </div>
  );
}

export default Cart;
