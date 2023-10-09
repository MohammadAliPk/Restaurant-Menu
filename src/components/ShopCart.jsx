import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Components
import Cart from "./shared/Cart";

// Ations
import { clear } from "../features/cart/cartSlice";

// ant designe
import { Col, Row } from "antd";

// styles
import styles from "./ShopCart.module.css";

//icon
import LogoImg from "../assets/images/logo.png";
import plateIcon from "../assets/icons/plate.png";
import trashIcon from "../assets/icons/trash-icon.png";

const ShopCart = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cart);

  return (
    <>
      <div className={styles.cartHeader}>
        <div className={styles.logoContainer}>
          <img src={LogoImg} alt="logo" />
          <p>
            Game
            <span>Republic</span>
          </p>
        </div>
        <Link to="/products">بازگشت به منو</Link>
      </div>
      <div className={styles.container}>
        <Row>
          <Col xs={9}>
            {state.itemsCounter > 0 && (
              <div className={styles.total}>
                <div className={styles.totalPayment}>
                  <h3>تعداد سفارشات</h3>
                  <p>{state.itemsCounter}</p>
                  <h3>مجموع سفارشات</h3>
                  <div>
                    <span className={styles.hezarToman}>
                      هــــزار
                      <br />
                      تـــومان
                    </span>
                    <p>{state.total}</p>
                  </div>
                  <div className={styles.buttonContainer}>
                    <button
                      onClick={() => dispatch(clear())}
                      className={styles.clear}
                    >
                      <img src={trashIcon} alt="trash" />
                      <p>پاک کردن همه</p>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Col>
          <Col xs={15}>
            <div className={styles.receipt}>
              {state.selectedItems.length > 0 ? (
                <div className={styles.cartContainer}>
                  {state.selectedItems.map((item) => (
                    <Cart key={item.id} data={item} />
                  ))}
                </div>
              ) : null}
            </div>
          </Col>
        </Row>
        {state.itemsCounter === 0 && !state.checkout && (
          <div className={styles.emptyCart}>
            <h3>یادداشت سفارشات خالی می باشد</h3>
            <img
              src={plateIcon}
              alt=""
              style={{ width: "200px", height: "auto" }}
            />
            <Link to="/products">بازگشت به منو</Link>
          </div>
        )}

        {state.checkout && (
          <div>
            <h3>Checked out successfully</h3>
            <Link to="/products">Buy More</Link>
          </div>
        )}
      </div>
    </>
  );
};

export default ShopCart;
