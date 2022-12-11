import React from "react";
import "./SubtotalStyle.css";
import { useNavigate} from "react-router-dom"
import CurrencyFormat from "react-currency-format";
import { useGlobalState } from "../../StateProvider";
export default function Subtotal() {
  // const [total, setTotal] = useState(0);
  const [{ cart }, dispatch] = useGlobalState();
const Navigate = useNavigate()
  // useEffect(() => {
  //   var x = 0;
  //   for (var i = 0; i < cart.length; i++) {
  //     x += cart[i].price;
  //   }
  //   setTotal(x);
  // }, [total, cart]);

  const getCartTotal = (cart) => {
    return cart?.reduce((total, item) => {
      return total + item.price;
    }, 0);
  };
  // console.log(getCartTotal(cart))
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => {
          return (
            <div>
              <p>
                Subtotal({cart.length} items): <strong>{value}</strong>
              </p>
              <small className="subtotal_gift">
                <input type="checkbox" /> This order contains a Gift
              </small>
            </div>
          );
        }}
        decimalScale={2}
        value={getCartTotal(cart)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button
        disabled={cart?.length <= 0}
        onClick={(e) => {
          Navigate("/payment");
        }}
      >
        Proceed to Checkout
        <sub style={{ color: "red" }}>{cart?.length <= 0 && "empty cart"}</sub>
      </button>
    </div>
  );
}
