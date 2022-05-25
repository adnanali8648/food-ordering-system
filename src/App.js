import react, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Card from "./components/UI/Card";
function App() {
  const [showCart, setShowCart] = useState(false);

  return (
    <>
      {showCart && <Cart closeCart={() => setShowCart(!showCart)}></Cart>}
      <Header showCart={() => setShowCart(!showCart)} />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
