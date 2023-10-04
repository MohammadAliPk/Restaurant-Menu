import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Components
import Cart from "./shared/Cart";

// Ations
import { clear } from "../features/cart/cartSlice";

import plateIcon from "../assets/icons/plate.png";

const ShopCart = () => {
  // const { state, dispatch } = useContext(CartContext);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cart);

  return (
    <div>
      <div>
        {state.selectedItems.map((item) => (
          <Cart key={item.id} data={item} />
        ))}
      </div>

      {state.itemsCounter > 0 && (
        <div>
          <p>
            <span>Total Items:</span> {state.itemsCounter}
          </p>
          <p>
            <span>Total Payments:</span> {state.total} $
          </p>
          <div>
            <button onClick={() => dispatch(clear())}>Clear</button>
          </div>
        </div>
      )}

      {state.itemsCounter === 0 && !state.checkout && (
        <div>
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
  );
};

export default ShopCart;
