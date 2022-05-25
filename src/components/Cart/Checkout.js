import react from "react";
import { useRef } from "react";
import { useState } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const [isFormValidity, setIsFormValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();
  const isEmpty = (value) => value.trim() === "";
  const isFiveChar = (value) => value.trim().length === 5;
  const confirmHandler = (event) => {
    event.preventDefault();
    const name = nameInputRef.current.value;
    const street = streetInputRef.current.value;
    const postalCode = postalCodeInputRef.current.value;
    const city = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(name);
    const enteredStreetIsValid = !isEmpty(street);
    const enteredpostalCodeIsValid = isFiveChar(postalCode);
    const enteredCityIsValid = !isEmpty(city);
    const formIsValid =
      enteredCityIsValid &&
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredpostalCodeIsValid;

    setIsFormValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredpostalCodeIsValid,
      city: enteredCityIsValid,
    });
    if (!formIsValid) {
      return;
    }
    props.getData({
      name: name,
      street: street,
      postalCode: postalCode,
      city: city,
    });
  };

  const nameControlClasses = `${classes.control} ${
    !isFormValidity.name ? classes.invalid : ""
  }`;
  const streetControlClasses = `${classes.control} ${
    !isFormValidity.street ? classes.invalid : ""
  }`;
  const postalCOdeControlClasses = `${classes.control} ${
    !isFormValidity.postalCode ? classes.invalid : ""
  }`;
  const cityControlClasses = `${classes.control} ${
    !isFormValidity.city ? classes.invalid : ""
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!isFormValidity.name && <p>please enter valid Name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!isFormValidity.street && <p>please enter valid Street</p>}
      </div>
      <div className={postalCOdeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!isFormValidity.postalCode && (
          <p>please enter valid Postal code (lenght of 5 character)</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!isFormValidity.city && <p>please enter valid City</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onClick}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
