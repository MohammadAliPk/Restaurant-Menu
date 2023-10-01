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
            <Button onClick={() => dispatch(removeItem(productData))}>
              <img src={trashIcon} alt="trash" style={{ width: "15px" }} />
            </Button>
          )}
          {quantityCount(state, productData.id) > 1 && (
            <Button onClick={() => dispatch(decreament(productData))}>-</Button>
          )}
          {quantityCount(state, productData.id) > 0 && (
            <span>{quantityCount(state, productData.id)}</span>
          )}
          {isInCart(state, productData.id) ? (
            <Button onClick={() => dispatch(increament(productData))}>+</Button>
          ) : (
            <Button onClick={() => dispatch(addItem(productData))}>
              Add to Cart
            </Button>
          )}
          <Button
            type="primary"
            onClick={() => modalHandler(productData.id)}
            modalid={productData.id}
          >
            محتویات
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
