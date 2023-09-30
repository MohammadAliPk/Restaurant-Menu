import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Functions
import { shorten, isInCart, quantityCount } from "../../helper/functions";

// Icons
import trashIcon from "../../assets/icons/trash.svg";

// Actions
import {
  addItem,
  removeItem,
  increase,
  decrease,
} from "../../redux/cart/cartAction";

const Product = ({ productData }) => {
  const state = useSelector((state) => state.cartState);
  const dispatch = useDispatch();

  return (
    <div>
      <img src={productData.image} alt="product" />
      <h3>{shorten(productData.title)}</h3>
      <p>{`${productData.price} $`}</p>
      <div>
        <Link to={`/products/${productData.id}`}>Details</Link>
        <div>
          {quantityCount(state, productData.id) === 1 && (
            <button onClick={() => dispatch(removeItem(productData))}>
              <img src={trashIcon} alt="trash" />
            </button>
          )}
          {quantityCount(state, productData.id) > 1 && (
            <button onClick={() => dispatch(decrease(productData))}>-</button>
          )}
          {quantityCount(state, productData.id) > 0 && (
            <span>{quantityCount(state, productData.id)}</span>
          )}
          {isInCart(state, productData.id) ? (
            <button onClick={() => dispatch(increase(productData))}>+</button>
          ) : (
            <button onClick={() => dispatch(addItem(productData))}>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
