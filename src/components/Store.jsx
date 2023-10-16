import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// ant design
import { Button, Image, Modal, Row } from "antd";

// Components
import Product from "./shared/Product";
import Loader from "./shared/Loader";
import Navbar from "./Navbar";

// redux
import { fetchProducts } from "../features/products/productsSlice";

// Actions
import {
  increament,
  decreament,
  addItem,
  removeItem,
} from "../features/cart/cartSlice";

// functions
import { isInCart, quantityCount } from "../helper/functions";

// Icons
import trashIcon from "../assets/icons/trash-icon.png";

// css
import styles from "./store.module.css";

// image
import LoaderImg from "../gif/loading.gif";

const Store = () => {
  const [open, setOpen] = useState(false);
  const [modalId, setModalId] = useState(2);

  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.products);
  const modalData = productsState.products[modalId - 1];

  const state = useSelector((state) => state.cart);

  useEffect(() => {
    if (!productsState.products.length) dispatch(fetchProducts());
  }, []);

  const modalHandler = (id) => {
    setOpen(true);
    setModalId(id);
  };

  const modalHandlerClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.productBody}>
      <section id="4">ABOUT</section>

      {productsState.loading ? (
        <Loader />
      ) : productsState.error ? (
        <p>Somethin went wrong</p>
      ) : (
        <>
          <Navbar />
          <div className={styles.productContainer}>
            <Row gutter={[15, 15]} className={styles.row}>
              {productsState.products.map((product) => (
                <Product
                  key={product.id}
                  productData={product}
                  modalHandler={modalHandler}
                />
              ))}
            </Row>
          </div>
        </>
      )}
      <Modal
        open={open}
        title="جزئیات"
        onOk={() => dispatch(addItem(modalData))}
        onCancel={() => modalHandlerClose()}
        footer={(_, { CancelBtn }) => (
          <div className={styles.modalFooter}>
            {quantityCount(state, modalId) === 1 && (
              <Button
                className={styles.modalFooterBtn}
                onClick={() => dispatch(removeItem(modalData))}
              >
                <img src={trashIcon} alt="trash" />
              </Button>
            )}
            {quantityCount(state, modalId) > 1 && (
              <Button
                className={styles.modalFooterBtn}
                onClick={() => dispatch(decreament(modalData))}
              >
                -
              </Button>
            )}
            {quantityCount(state, modalId) > 0 && (
              <span className={styles.modalQuntity}>
                {quantityCount(state, modalId)}
              </span>
            )}
            {isInCart(state, modalId) ? (
              <Button
                className={styles.modalFooterBtn}
                onClick={() => dispatch(increament(modalData))}
              >
                +
              </Button>
            ) : (
              <Button
                className={styles.addToCartBtn}
                onClick={() => dispatch(addItem(modalData))}
              >
                افزودن به یادداشت سفارش
              </Button>
            )}
          </div>
        )}
      >
        {modalData ? (
          <div>
            <Image
              preview={false}
              src={modalData.image}
              alt="product"
              width="100%"
              height="auto"
              placeholder={
                <img
                  style={{ width: "100%", height: "auto" }}
                  src={LoaderImg}
                />
              }
            />
            <div>
              <h3>{modalData.title}</h3>
              <div>
                <span className={styles.modalPrice}>
                  {modalData.price} هزار تومان
                </span>
              </div>
              <h4>محتویات :</h4>
              <p>{modalData.description}</p>
              <p>
                <span>دسته بندی:</span> {modalData.category}
              </p>
            </div>
          </div>
        ) : (
          "loading..."
        )}
      </Modal>
      <section id="3" style={{ height: "500px" }}>
        3
      </section>
      <section id="2" style={{ height: "500px" }}>
        2
      </section>
      <section id="1" style={{ height: "500px" }}>
        1
      </section>
      <div style={{ height: "200px" }}></div>
    </div>
  );
};

export default Store;
