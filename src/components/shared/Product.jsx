import React from "react";
import { useSelector, useDispatch } from "react-redux";

// ant design
import { Button, Col, Image } from "antd";
import Title from "antd/es/typography/Title";

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

// css
import styles from "./Product.module.css";

const Product = ({ productData, modalHandler }) => {
  const state = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  console.log(productData);

  return (
    <Col span={12}>
      <div className={styles.productCard}>
        <Image
          className={styles.productImg}
          width={220}
          height={200}
          src={productData.image}
          placeholder={
            <div className={styles.loaderImgContainer}>
              <span className={styles.loaderImg}></span>
            </div>
          }
        />
        <div className={styles.productInfo}>
          <div className={styles.productTitle}>
            <h3>{shorten(productData.title)}</h3>
          </div>
          <div className={styles.productDesc}>
            <p>{productData.description}</p>
          </div>
          <div className={styles.productFooter}>
            <p>{`${productData.price} $`}</p>
            <div>
              <div>
                {quantityCount(state, productData.id) === 1 && (
                  <Button onClick={() => dispatch(removeItem(productData))}>
                    <img
                      src={trashIcon}
                      alt="trash"
                      style={{ width: "15px" }}
                    />
                  </Button>
                )}
                {quantityCount(state, productData.id) > 1 && (
                  <Button onClick={() => dispatch(decreament(productData))}>
                    -
                  </Button>
                )}
                {quantityCount(state, productData.id) > 0 && (
                  <span>{quantityCount(state, productData.id)}</span>
                )}
                {isInCart(state, productData.id) ? (
                  <Button onClick={() => dispatch(increament(productData))}>
                    +
                  </Button>
                ) : (
                  <Button onClick={() => dispatch(addItem(productData))}>
                    افزودن
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
        </div>
      </div>
    </Col>
  );
};

export default Product;
