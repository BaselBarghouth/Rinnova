import React, { useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
  MDBInput,
  MDBFormInline
} from "mdbreact";
import Module from "./Module";
const CardItems = props => {
  const [cart, setCart] = useState([]);
  const addToCart = (event, index) => {
    console.log(event.target.checked, index);
    if (event.target.checked === true) {
      setCart([...cart, props.items[index]]);
    } else {
      let temp = cart.filter(c => c.item_id != props.items[index].item_id);

      setCart(temp);
    }
  };
  return (
    props.items &&
    props.items.map((item, index) => (
      <div style={{ width: "33%" }}>
        <MDBCol key={item.item_id}>
          <MDBCard style={{ width: "22rem" }}>
            <MDBCardImage className="img-fluid" src={item.item_image} waves />
            <MDBCardBody>
              <MDBCardTitle>{item.item_name}</MDBCardTitle>
              <MDBCardText>{item.item_desc}</MDBCardText>
              <div>
                <MDBFormInline>
                  <MDBInput
                    label="Add to Cart"
                    type="checkbox"
                    id="checkbox1"
                    onClick={event => addToCart(event, index)}
                  />
                </MDBFormInline>
              </div>
              {cart.length > 0 ? (
                <div>
                  <Module cart={cart} {...props} />
                </div>
              ) : null}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </div>
    ))
  );
};

export default CardItems;
