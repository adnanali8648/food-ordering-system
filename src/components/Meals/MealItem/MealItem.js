import react, { useContext } from "react";
import { CartContext } from "../../../store/Cart-Context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;
  const onAddToCartHandler = (amount) => {
    console.log(amount, "amount");
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };
  return (
    <>
      <li className={classes.meal}>
        <div>
          <h1> {props.name}</h1>
          <div className={classes.description}>{props.description}</div>
          <div className={classes.price}>{price}</div>
        </div>
        <div>
          <MealItemForm onAddTOCart={onAddToCartHandler} />
        </div>
      </li>
    </>
  );
};
export default MealItem;
