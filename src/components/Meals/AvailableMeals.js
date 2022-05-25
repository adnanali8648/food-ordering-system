import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect } from "react";
import { useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-2d423-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went Wrong");
      }
      const responseData = await response.json();
      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
        setMeals(loadedMeals);
        setIsLoading(false);
      }
    };
    fetchData().catch((error) => {
      setIsLoading(false);
      setHttpError("Meal items not found");
    });
  }, []);

  if (httpError) {
    return (
      <section className={classes.serverError}>
        <p>{httpError}</p>
      </section>
    );
  }
  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading....</p>
      </section>
    );
  }
  const mealsList = meals.map((items) => (
    <MealItem
      key={items.id}
      id={items.id}
      name={items.name}
      price={items.price}
      description={items.description}
    />
  ));
  return (
    <>
      <section className={classes.meals}>
        <Card>
          <ul>{mealsList}</ul>
        </Card>
      </section>
    </>
  );
};
export default AvailableMeals;
