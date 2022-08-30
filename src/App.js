import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Private from "./Routes/Private";
import Public from "./Routes/Public";
import Categories from "./Pages/Categories/Categories";
import Restaurants from "./Pages/Restaurants/Restaurants";
import Foods from "./Pages/Foods/Foods";
import Orders from "./Pages/Orders/Orders";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Private />}>
          <Route path="/" element={<Categories />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/foods" element={<Foods />} />
          <Route path="/orders" element={<Orders />} />
        </Route>

        <Route path="/" element={<Public />}>
          <Route path="/" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
