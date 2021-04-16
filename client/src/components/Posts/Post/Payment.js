import React, { useState, useRef, useEffect } from 'react';
import Post from './Post';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { likePost, deletePost } from '../../../actions/posts';



function Product({ product }) {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                //description: product.description,
                amount: {
                  currency_code: 'USD',
                  value: product.price,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaidFor(true);
          console.log(order);
        },
        onError: err => {
          setError(err);
          console.error(err);
        },
      })
      .render(paypalRef.current);
  }, [product.description, product.price]);

  if (paidFor) {
    dispatch(deletePost(product.pid));
    return (
      <div>
        {/* <h1>Congrats, you just bought {product.name}!</h1> */}
        <h1>SOLD</h1>
        
      </div>
    );
  }

  return (
    <div>
      {error && <div>Uh oh, an error occurred! {error.message}</div>}
      
      <div ref={paypalRef} />
    </div>
  );
}

function Payment(props) {
  const product = {
    price: props.price, 
    name: props.name,
    description: 'SOLD',
    pid: props.pid,
  };
   
  return (
    <div className="Payment">
      <Product product={product} />
    </div>
  );
}

export default Payment;