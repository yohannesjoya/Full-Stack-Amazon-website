import React, { useEffect } from "react";
import { useGlobalState } from "../../StateProvider";
// import { useGlobalState } from "../STATEprovider/StateProvider";
import "./ProductStyle.css";

// import productImg1 from "../../Assets/Fitness.jpg";

export default function Product({ id, title, price, rating, product_image }) {
  // const [state, dispatch] = useGlobalState();
  const [{ cart }, dispatch] = useGlobalState();
  // useEffect(() => {
  //   console.log(cart)
  //  })
  const addtoCart = () => {
    console.log("---- clicked add to cart ---");
    dispatch({
      type: "ADD_TO_CART",
      item: {
        id: id,
        title: title,
        price: price,
        rating: rating,
        product_image: product_image,
      },
    });
    // console.log(cart);
  };


  return (
    <div className="Product ">
      <div className="Product_info">
        <p className="Product_title">{title}</p>
        <div className="ProductPriceRating">
          <div className="Product_price">
            <span>Price: $</span>
            <b>{price}</b>
          </div>
          <div className="Product_rating">
            Rating:
            {Array(rating)
              .fill()
              .map((index) => (
                <p key={index}>⭐</p>
              ))}
          </div>
        </div>
      </div>
      <img src={product_image} alt="product here" />
      <button onClick={() => addtoCart()}>Add to Cart</button>
    </div>
  );
}
