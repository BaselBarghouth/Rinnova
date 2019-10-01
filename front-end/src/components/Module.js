import React, { Component } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";
import Login from "./Login";
class ModalPage extends Component {
  state = {
    modal14: false
  };

  toggle = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };

  render() {
    return (
      <div>
        <MDBBtn onClick={this.toggle(14)}>View Cart</MDBBtn>
        <MDBModal isOpen={this.state.modal14} toggle={this.toggle(14)} centered>
          <MDBModalHeader toggle={this.toggle(14)}>Login</MDBModalHeader>
          <MDBModalBody>
            <Login cart={this.props.cart} {...this.props} />
          </MDBModalBody>
        </MDBModal>
      </div>
    );
  }
}

export default ModalPage;
