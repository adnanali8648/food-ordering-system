import { useContext } from "react";
import { useState } from "react";
import { CartContext } from "../../store/Cart-Context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const CartCtx = useContext(CartContext);
  const totalAmount = CartCtx.totalAmount.toFixed(2);
  const hasItems = CartCtx.items.length > 0;
  console.log(CartCtx, "CartCtx");
  const cartItemRemoveHandler = (id) => {
    CartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    CartCtx.addItem(item);
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {CartCtx.items.map((items) => (
        <CartItem
          key={items.id}
          name={items.name}
          amount={items.amount}
          price={items.price}
          onRemove={cartItemRemoveHandler.bind(null, items.id)}
          onAdd={cartItemAddHandler.bind(null, items)}
        />
      ))}
    </ul>
  );

  const onOrderHandler = async (userData) => {
    setIsSubmiting(true);
    await fetch(
      "https://react-http-2d423-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderItems: CartCtx.items,
        }),
      }
    );
    setIsSubmiting(false);
    setDidSubmit(true);

    setTimeout(() => {
      props.closeCart();
    }, 1000);
    CartCtx.clearCart();
  };
  const modalActions = (
    <div className={classes.actions}>
      <button onClick={props.closeCart} className={classes["button--alt"]}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={() => setShowForm(true)}>
          {" "}
          Order
        </button>
      )}
    </div>
  );

  const modalContent = (
    <>
      <div>
        {cartItems}
        <div className={classes.total}>
          <span>total Amount</span>
          <span>{totalAmount}</span>
        </div>
        <div>
          {showForm && (
            <Checkout getData={onOrderHandler} onClick={props.closeCart} />
          )}
        </div>
        {!showForm && modalActions}
      </div>
    </>
  );
  const modalSubmitingContent = (
    <>
      <p>Submiting the order....</p>
    </>
  );
  const modalSubmitOrderContent = (
    <>
      <p>Successfully submited the order....</p>
    </>
  );
  return (
    <>
      <Modal onClose={props.closeCart}>
        {!isSubmiting && !didSubmit && modalContent}
        {isSubmiting && modalSubmitingContent}
        {!isSubmiting && didSubmit && modalSubmitOrderContent}
      </Modal>
    </>
  );
};
export default Cart;
