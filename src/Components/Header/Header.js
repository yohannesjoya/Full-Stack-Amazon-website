import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HeaderStyle.css";
// import AmazonLogo from "../../Assets/AmazonLogo.png";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useGlobalState } from "../../StateProvider";
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";
export default function Header() {
  const [{ cart, user }, dispatch] = useGlobalState();
  const navigate = useNavigate();
  // console.log(user);
  const handleAuth = () => {
    signOut(auth)
      .then(() => {
        console.log("success in sign out");
        dispatch({
          type: "RESET_CART",
        });
      })
      .catch((err) => {
        console.log("error in sign out");
      });
  };

  return (
    <div className="Header">
      <Link to={"/"}>
        <img
          className="Header__logo"
          src={"https://pngimg.com/uploads/amazon/amazon_PNG11.png"}
          alt="AmazonLogoHere"
        />
      </Link>

      <div className="Header_search">
        <input className="Header_searchInput" type="text" />
        <SearchIcon className="Header__searchIcon" />
      </div>
      <div className="Header_nav">
        <Link to={!user && "/login"}>
          <div
            className="Header_option"
            onClick={() => {
              handleAuth();
            }}
          >
            <span className="Header_optionLine1">
              Hello {!user ? "Guest" : user.email}
            </span>
            <span className="Header_optionLine2">
              {!user ? "sign in" : "sign out"}
            </span>
          </div>
        </Link>

        <div className="Header_option">
          <span className="Header_optionLine1">Returns</span>
          <span className="Header_optionLine2">&Orders</span>
        </div>
        <div className="Header_option">
          <span className="Header_optionLine1">Your</span>
          <span className="Header_optionLine2">Prime</span>
        </div>
        <Link to="/checkout">
          <div className="Header_optionBasket">
            <ShoppingBasketIcon />
            <span className="Header_optionLine2 Header_basketCount">
              {cart.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
