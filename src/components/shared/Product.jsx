import React from "react";
import { useSelector, useDispatch } from "react-redux";

// ant design
import { Button, Col, Image } from "antd";
import Title from "antd/es/typography/Title";

// Functions
import { shorten, isInCart, quantityCount } from "../../helper/functions";

// Icons
import trashIcon from "../../assets/icons/trash-icon.png";
import cartIcon from "../../assets/icons/cart-icon.png";

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
    <Col xs={24} lg={12}>
      <div className={styles.productCardBackground}>
        <div className={styles.productCard}>
          <Image
            className={styles.productImg}
            src={productData.image}
            placeholder={
              <div className={styles.loaderImgContainer}>
                <span className={styles.loaderImg}></span>
              </div>
            }
          />
          <div className={styles.productInfo}>
            <div className={styles.productTitle}>
              <h4>{productData.title}</h4>
            </div>
            <div className={styles.productDesc}>
              <p>{productData.description}</p>
            </div>
            <div className={styles.productDescFade}></div>
            <div className={styles.productFooter}>
              <div className={styles.productDetail}>
                <a
                  className={styles.productDetailBtn}
                  onClick={() => modalHandler(productData.id)}
                  modalid={productData.id}
                >
                  مشاهده جزئیات &#8592;
                </a>
              </div>
              <div className={styles.productFooterContainer}>
                <div className={styles.priceContainer}>
                  <p
                    className={styles.productPrice}
                  >{`${productData.price}`}</p>
                  <span className={styles.hezarToman}>
                    هــــزار
                    <br />
                    تـــومان
                  </span>
                </div>
                <div>
                  <div className={styles.productFooterBtnContainer}>
                    {quantityCount(state, productData.id) === 1 && (
                      <Button
                        className={styles.productFooterBtn}
                        onClick={() => dispatch(removeItem(productData))}
                      >
                        <img src={trashIcon} alt="trash" />
                      </Button>
                    )}
                    {quantityCount(state, productData.id) > 1 && (
                      <Button
                        className={styles.productFooterBtn}
                        onClick={() => dispatch(decreament(productData))}
                      >
                        -
                      </Button>
                    )}
                    {quantityCount(state, productData.id) > 0 && (
                      <span className={styles.productQuntity}>
                        {quantityCount(state, productData.id)}
                      </span>
                    )}
                    {isInCart(state, productData.id) ? (
                      <Button
                        className={styles.productFooterBtn}
                        onClick={() => dispatch(increament(productData))}
                      >
                        +
                      </Button>
                    ) : (
                      <Button
                        className={styles.productFooterBtn}
                        onClick={() => dispatch(addItem(productData))}
                      >
                        <img src={cartIcon} alt="cart" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.productFooterMobile}>
          <div className={styles.productDetail}>
            <a
              className={styles.productDetailBtn}
              onClick={() => modalHandler(productData.id)}
              modalid={productData.id}
            >
              مشاهده جزئیات &#8592;
            </a>
          </div>
          <div className={styles.productFooterContainer}>
            <div className={styles.priceContainer}>
              <p className={styles.productPrice}>{`${productData.price}`}</p>
              <span className={styles.hezarToman}>
                هــــزار
                <br />
                تـــومان
              </span>
            </div>
            <div>
              <div className={styles.productFooterBtnContainer}>
                {quantityCount(state, productData.id) === 1 && (
                  <Button
                    className={styles.productFooterBtn}
                    onClick={() => dispatch(removeItem(productData))}
                  >
                    <img src={trashIcon} alt="trash" />
                  </Button>
                )}
                {quantityCount(state, productData.id) > 1 && (
                  <Button
                    className={styles.productFooterBtn}
                    onClick={() => dispatch(decreament(productData))}
                  >
                    -
                  </Button>
                )}
                {quantityCount(state, productData.id) > 0 && (
                  <span className={styles.productQuntity}>
                    {quantityCount(state, productData.id)}
                  </span>
                )}
                {isInCart(state, productData.id) ? (
                  <Button
                    className={styles.productFooterBtn}
                    onClick={() => dispatch(increament(productData))}
                  >
                    +
                  </Button>
                ) : (
                  <Button
                    className={styles.productFooterBtn}
                    onClick={() => dispatch(addItem(productData))}
                  >
                    <img src={cartIcon} alt="cart" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default Product;
