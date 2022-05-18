import Button from "../button/button.component";
import "./cart-dropdown.styles.scss";

import { CartContext } from "../../contexts/cart.context";
import { useContext } from "react";
import CartItem from "../cart-item/cart-item.component";

const CartDropDown = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </div>

      <Button>Go to checkout</Button>
    </div>
  );
};

export default CartDropDown;
