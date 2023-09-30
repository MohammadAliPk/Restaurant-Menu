import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Components
import Cart from "./shared/Cart";

// Ations
import { clear, checkout } from "../redux/cart/cartAction";

const ShopCart = () => {
  // const { state, dispatch } = useContext(CartContext);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cartState);

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
            <button onClick={() => dispatch(checkout())}>Checkout</button>
          </div>
        </div>
      )}

      {state.itemsCounter === 0 && !state.checkout && (
        <div>
          <h3>Want to buy?</h3>
          <Link to="/products">Go to shop</Link>
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
