import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol
} from "mdbreact";
const cardSrevices = props =>
  props.services &&
  props.services.map(item => (
    <div style={{ margin: "20px" }}>
      <MDBCol key={item.service_id}>
        <MDBCard style={{ width: "22rem" }}>
          <MDBCardImage className="img-fluid" src={item.service_image} waves />
          <MDBCardBody>
            <MDBCardTitle>{item.service_name}</MDBCardTitle>
            <MDBCardText>{item.service_desc}</MDBCardText>
            <MDBBtn color="primary" href="/contactus">
              Contact Us
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </div>
  ));

export default cardSrevices;
