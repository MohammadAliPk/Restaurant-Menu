import React, { useContext } from "react";
import { useDispatch } from "react-redux";

// Functions
import { shorten } from "../../helper/functions";

// Icons
import trashIcon from "../../assets/icons/trash-icon.png";

// Actions
import {
  increament,
  decreament,
  addItem,
  removeItem,
} from "../../features/cart/cartSlice";

// Style
import styles from "./Cart.module.css";
import { Image } from "antd";

const Cart = (props) => {
  const dispatch = useDispatch();
  const { image, title, price, quantity } = props.data;

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.title}>
          <h3>{title}</h3>
        </div>
        <div className={styles.footer}>
          <div className={styles.buttonContainer}>
            {quantity > 1 ? (
              <button onClick={() => dispatch(decreament(props.data))}>
                -
              </button>
            ) : (
              <button onClick={() => dispatch(removeItem(props.data))}>
                <img src={trashIcon} alt="trash" />
              </button>
            )}
            <span className={styles.quantity}>{quantity}</span>
            <button onClick={() => dispatch(increament(props.data))}>+</button>
          </div>
          <p>{price} </p>
        </div>
      </div>
      <Image
        className={styles.productImg}
        src={image}
        placeholder={
          <div className={styles.loaderImgContainer}>
            <span className={styles.loaderImg}></span>
          </div>
        }
      />
    </div>
  );
};

export default Cart;
