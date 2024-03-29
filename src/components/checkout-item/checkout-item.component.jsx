import { useDispatch } from "react-redux";

import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from "../../store/cart/cart.slice";

import {
  Arrow,
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  RemoveButton,
  Value,
} from "./checkout-item.styles";

const CheckoutItem = ({ product }) => {
  const { name, imageUrl, price, quantity } = product;

  const dispatch = useDispatch();

  const addItemHandler = () => dispatch(addItemToCart(product));

  const removeItemHandler = () => dispatch(removeItemFromCart(product));

  const clearItemHandler = () => dispatch(clearItemFromCart(product));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan>{price}</BaseSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
