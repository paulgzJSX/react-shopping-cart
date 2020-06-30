import React from "react";
import CartItem from "./CartItem";
import { connect } from 'react-redux'
import { CLEAR_CART, GET_TOTALS } from '../actions'

const CartContainer = ({ cartItems = [], total, dispatch }) => {
  
  React.useEffect(() => {
    dispatch({ type: GET_TOTALS })
  }, [cartItems, dispatch])
  
  if (cartItems.length === 0) {
    return (
      <section className="cart">
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
      </header>
      <article>
        {cartItems.map(cartItem => {
          return <CartItem key={cartItem.id} {...cartItem} />;
        })}
      </article>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total}</span>
          </h4>
        </div>
        <button className="btn clear-btn" onClick={() => dispatch({ type: CLEAR_CART })}>clear cart</button>
      </footer>
    </section>
  );
};

function mapStateToProps(store) {
  return {cartItems: store.cartItems, total: store.total}
}

export default connect(mapStateToProps)(CartContainer);
