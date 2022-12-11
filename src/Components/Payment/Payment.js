import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./PaymentStyle.css";
import { useGlobalState } from "../../StateProvider";
import CheckOutProduct from "../CheckOut/CheckOutProduct/CheckOutProduct";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import { db } from "../Firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

export default function Payment() {
  const [{ cart, user }, dispatch] = useGlobalState();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [err, setErr] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);

  const getCartTotal = (cart) => {
    return cart?.reduce((total, item) => {
      return total + item.price;
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // const USERS = collection(db, "users");
        // const UserDoc = doc(USERS, user?.id);
        // const ORDERS = collection(UserDoc, "orders");
        // const OrdersDoc = doc(ORDERS, paymentIntent.id);
        //  setDoc(OrdersDoc, {
        //   cart: cart,
        //   amount: paymentIntent.amount,
        //   created: paymentIntent.created,
        // });

        async function askAddOrderToDb() {
          const paymentAmount = paymentIntent?.amount;
          const clientSecretDb = paymentIntent?.client_secret;
          const paymentId = paymentIntent?.id;
          const paymentCreate = paymentIntent?.created;
          const userEmail = user?.email;
          const userId = user?.uid;

          const allDataSent = {
            uI: userId,
            uE: userEmail,
            pA: paymentAmount,
            pI: paymentId,
            pC: paymentCreate,
            pCS: clientSecretDb,
          };
          const allData = JSON.stringify(allDataSent);
          const response = await axios({
            method: "post",
            url: `/confirmedOrders?allData=${allData}`,
          });
        }
        askAddOrderToDb();
        // console.log(paymentIntent);
        setSucceeded(true);
        setErr(null);
        setProcessing(false);
        navigate("/orders");
      })
      .catch(() => {
        console.log("there is error in handle submit of payment component");
        setErr("failed");
        setSucceeded(false);
      });
  };
  const handleChange = (e) => {
    setDisabled(e.empty);
    setErr(e.error ? e.error.message : "");
  };

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getCartTotal(cart) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [cart]);
  console.log("clientSecret is ", clientSecret);
  console.log(clientSecret);
  return (
    <div className="Payment_container">
      <h1 className="Payment_container_header">
        Checkout {<Link to={"/payment"} />}
        {cart?.length}items
      </h1>
      <div className="Payment_sections">
        <div className="Payment_title">
          <h3>Delivery Address</h3>
        </div>
        <div className="Payment_address">
          <p>{user?.email}</p>
          <p>Asella kebe 10</p>
          <p>Ethiopia oromia</p>
        </div>
      </div>
      <div className="Payment_sections">
        <div className="Payment_title">
          <h3 id="p2">Review items and Delivery</h3>
        </div>
        <div className="Payment_Products">
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
        </div>
      </div>
      <div className="Payment_sections payment-section-card">
        <div className="Payment_title">
          <h3>Payment Methods</h3>
        </div>
        <div className="payment-detail">
          <form onSubmit={handleSubmit}>
            <CardElement onChange={handleChange} />
            <div>
              <CurrencyFormat
                renderText={(value) => {
                  return <h3>order Total: {value}</h3>;
                }}
                decimalScale={2}
                value={getCartTotal(cart)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
              <button
                disabled={
                  cart?.length <= 0 || processing || disabled || succeeded
                }
              >
                {processing ? "Processing" : "Buy Now"}
              </button>
              <p>
                {err && (
                  <div style={{ color: "red", fontSize: "0.75rem" }}>{err}</div>
                )}
              </p>
            </div>
          </form>
        </div>
      </div>
      {!user ? (
        <div className="login__ask">
          <h1 style={{ color: "red" }}>Please login To buy</h1>
          <button
            type=""
            onClick={() => {
              navigate("/login");
            }}
          >
            Go to Login
          </button>
        </div>
      ) : null}
    </div>
  );
}
