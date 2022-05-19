import {
  CartItemContainer,
  ItemDetails,
  Name,
  Price,
} from "./cart-item.styles";

const CartItem = ({ item }) => {
  const { name, quantity, imageUrl, price } = item;

  return (
    <CartItemContainer>
      <img src={imageUrl} alt={name} />
      <ItemDetails>
        <Name>{name}</Name>
        <Price>
          {quantity} x ${price}
        </Price>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
