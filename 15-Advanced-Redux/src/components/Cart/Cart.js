import { useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useEffect } from "react";

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map((cartItem) => {
          return (
            <CartItem
              item={{
                name: cartItem.name,
                quantity: cartItem.quantity,
                price: cartItem.price,
                id: cartItem.id,
              }}
              key={cartItem.id}
            />
          );
        })}
      </ul>
    </Card>
  );
};

export default Cart;
