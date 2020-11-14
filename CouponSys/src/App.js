import React from 'react';
import './App.css';
import PostCoupon from "./components/PostCoupon";
import { Provider } from "react-redux";
import { store } from "./actions/store";


function App() {
  return (
    <Provider store={store}>
    <div className="container-fluid">
    <nav className="navbar navbar-light bg-light">
      <h3>
          Coupon System
        </h3>
    </nav>
      <PostCoupon/>
      </div>
    </Provider>
  );
}

export default App;
