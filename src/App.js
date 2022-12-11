// import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import CheckOut from "./Components/CheckOut/CheckOut";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { auth } from "./Components/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./Components/Login/Login";
import { useGlobalState } from "./StateProvider";
import { useEffect } from "react";
import Payment from "./Components/Payment/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51MBYwxHaMIJrug0ODoUB8N1oyvtErDFbs2c0Ii98WXDrNbGzTp4PdEFj6GJRi2wLaSDt2pROd6ZVaA20yRC9uKbC00NLasi3tM"
);

function App() {
  const [{}, dispatch] = useGlobalState();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // user logged in
        dispatch({
          type: "SET_USER",
          user: user,
        });
        // ...
      } else {
        // User is signed out
        dispatch({ type: "SET_USER", user: null });
      }
    });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              <Header />
              <CheckOut />
            </>
          }
        />
        <Route
          path="/payment"
          element={
            <Elements stripe={promise}>
              <Header />

              <Payment />
            </Elements>
          }
        />
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
