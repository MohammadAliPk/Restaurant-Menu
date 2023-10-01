import React from "react";
import { useSelector, useDispatch } from "react-redux";

// ant design
import { Button } from "antd";

// Functions
import { shorten, isInCart, quantityCount } from "../../helper/functions";

// Icons
import trashIcon from "../../assets/icons/trash.svg";

// Actions
import {
  increament,
  decreament,
  addItem,
  removeItem,
} from "../../features/cart/cartSlice";

const Product = ({ productData, modalHandler }) => {
  const state = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      <img src={productData.image} alt="product" />
      <h3>{shorten(productData.title)}</h3>
      <p>{`${productData.price} $`}</p>
      <div>
        <div>
          {quantityCount(state, productData.id) === 1 && (
            <button onClick={() => dispatch(removeItem(productData))}>
              <img src={trashIcon} alt="trash" />
            </button>
          )}
          {quantityCount(state, productData.id) > 1 && (
            <button onClick={() => dispatch(decreament(productData))}>-</button>
          )}
          {quantityCount(state, productData.id) > 0 && (
            <span>{quantityCount(state, productData.id)}</span>
          )}
          {isInCart(state, productData.id) ? (
            <button onClick={() => dispatch(increament(productData))}>+</button>
          ) : (
            <button onClick={() => dispatch(addItem(productData))}>
              Add to Cart
            </button>
          )}
          <Button
            type="primary"
            onClick={() => modalHandler(productData.id)}
            modalId={productData.id}
          >
            محتویات
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
