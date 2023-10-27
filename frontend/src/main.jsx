import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Store from "./store/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
 
    <Provider store={Store}>
      <App />
    </Provider>
 
);
