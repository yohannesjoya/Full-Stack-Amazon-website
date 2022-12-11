import React from "react";
import checkoutbanner from "../../Assets/checkoutbanner.webp";
import { useGlobalState } from "../../StateProvider";
import Product from "../Product/Product";
import Subtotal from "../SubTotal/Subtotal";
import CheckOutProduct from "./CheckOutProduct/CheckOutProduct";
import "./CheckOutStyle.css";

export default function CheckOut() {
  const [{ cart }, dispatch] = useGlobalState();
  return (
    <div className="Check-out">
      <div className="Check-out-left">
        <img
          className="Check-out-add"
          src={checkoutbanner}
          alt="checkout banner"
        />
        <h3>Hello</h3>
        <h2 className="Check-out-title">Your Shopping Cart</h2>
        {cart.map((item) => {
          return (
            <CheckOutProduct
              id={item.id}
              title={item.title}
              price={item.price}
              rating={item.rating}
              product_image={item.product_image}
            />
          );
        })}
        {/* <CheckOutProduct /> */}

        {/* custom made later replaced by component based*/}
        {/* <div className="Check-out-cart">
          {cart.map((x) => {
            return (
              <Product
                id={x.id}
                title={x.title}
                price={x.price}
                rating={x.rating}
                product_image={x.product_image}
              />
            );
          })}
        </div> */}
      </div>
      <div className="Check-out-right">
        <Subtotal />
      </div>
    </div>
  );
}
