import React from "react";
import { useGlobalState } from "../../../StateProvider";
import "./CheckOutProductStyle.css";
export default function CheckOutProduct({
  id,
  title,
  price,
  rating,
  product_image,
}) {
  const [{ cart }, dispatch] = useGlobalState();
  const removeFromCart = () => {
    dispatch({
      type: "REMOVE_FROM_CART",

      id: id,
    });
  };

  return (
    <div className="ChOutProduct">
      <img
        className="ChOutProduct_img"
        _image
        src={product_image}
        alt={"checkout product here"}
      />
      <div className="ChOutProduct_info">
        <p className="ChOutProduct_title">{title}</p>
        <div className="ChOutProductPriceRating">
          <div className="ChOutProduct_price">
            <span>Price: $</span>
            <b>{price}</b>
          </div>
          <div className="ChOutProduct_rating">
            Rating:
            {Array(rating)
              .fill()
              .map(() => (
                <p>⭐</p>
              ))}
          </div>
        </div>
        <button onClick={() => removeFromCart()}>Remove from Cart</button>
      </div>
    </div>
  );
}
