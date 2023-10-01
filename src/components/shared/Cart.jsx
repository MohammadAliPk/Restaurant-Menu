import React, { useContext } from "react";
import { useDispatch } from "react-redux";

// Functions
import { shorten } from "../../helper/functions";

// Icons
import trashIcon from "../../assets/icons/trash.svg";

// Actions
import {
  increament,
  decreament,
  addItem,
  removeItem,
} from "../../features/cart/cartSlice";
const Cart = (props) => {
  const dispatch = useDispatch();
  const { image, title, price, quantity } = props.data;

  return (
    <div>
      <img src={image} />
      <div>
        <h3>{shorten(title)}</h3>
        <p>{price} $</p>
      </div>
      <div>
        <span>{quantity}</span>
      </div>
      <div>
        {quantity > 1 ? (
          <button onClick={() => dispatch(decreament(props.data))}>-</button>
        ) : (
          <button onClick={() => dispatch(removeItem(props.data))}>
            <img src={trashIcon} alt="trash" />
          </button>
        )}
        <button onClick={() => dispatch(increament(props.data))}>+</button>
      </div>
    </div>
  );
};

export default Cart;
