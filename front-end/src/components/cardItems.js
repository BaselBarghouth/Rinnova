import React, { useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol
} from "mdbreact";
import Module from "./Module";
const CardItems = props => {
  const [cart, setCart] = useState([]);
  return (

      props.items &&
        props.items.map((item, index) => (
          <div style={{width:'33%'}} >
          <MDBCol key={item.item_id}>
            <MDBCard style={{ width: "22rem" }}>
              <MDBCardImage className="img-fluid" src={item.item_image} waves />
              <MDBCardBody>
                <MDBCardTitle>{item.item_name}</MDBCardTitle>
                <MDBCardText>{item.item_desc}</MDBCardText>
                
                <MDBBtn
                  color="primary"
                  onClick={() => setCart([...cart, props.items[index]])}
                >
                  Add to Cart
                </MDBBtn>
                <div >
                <Module cart={cart} {...props} />
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          </div>
        ))
   
  );
};

export default CardItems;
