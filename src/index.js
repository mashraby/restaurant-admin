import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ApolloProvider from "./ApolloProvider";
import { Provider as ContextProvider } from "./Context/Context";
import { Provider as QueryProvider } from "./Context/QueryContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider>
      <BrowserRouter>
        <QueryProvider>
          <ContextProvider>
            <App />
          </ContextProvider>
        </QueryProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
