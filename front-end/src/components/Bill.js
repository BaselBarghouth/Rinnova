import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBTabPane,
  MDBTabContent
} from "mdbreact";
import API from "../api/API";
class Bill extends Component {
  constructor(props) {
    super(props);
    this.API = new API("orders");
  }
  state = {
    activePill: "1",
    cart: []
  };

  togglePills = tab => {
    if (this.state.activePill !== tab) {
      this.setState({
        ctivePill: tab
      });
    }
  };

  selectNextTab = () => {
    this.setState({
      activePill: (+this.state.activePill + 2).toString()
    });
  };
  componentDidMount() {
    let cart = this.props.location.state.cart;

    this.setState({ cart });
  }
  async order() {
    let user_id = localStorage.getItem("user_id");
    console.log("-----------", user_id);
    let token = localStorage.getItem("token");
    let newOrder = {
      user_id: user_id,
      status: "pendding"
    };
    let f = await fetch(
      `http://localhost:${process.env.REACT_APP_PORT}/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token
        },
        body: JSON.stringify(newOrder)
      }
    );
    let a = await f.json();
    console.log(a.newOrder.result.stmt.lastID);
  }
  render() {
    let total = 0;
    this.state.cart.map(
      item =>
        (total =
          parseInt(total) + parseInt(item.item_price) * parseInt(item.item_qty))
    );
    const { activePill } = this.state;

    return (
      <div>
        <Header />
        <MDBContainer>
          <MDBRow className="my-2" center>
            <MDBCard className="w-100">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol lg="8" className="mb-4">
                    <MDBTabContent className="pt-4" activeItem={activePill}>
                      <MDBTabPane tabId="1">
                        <form>
                          <MDBRow>
                            <MDBCol md="6" className="mb-4">
                              <label htmlFor="firstName">First name</label>
                              <input
                                type="text"
                                id="firstName"
                                className="form-control"
                              />
                            </MDBCol>
                            <MDBCol md="6" className="mb-2">
                              <label htmlFor="lastName">Last name</label>
                              <input
                                type="text"
                                id="lastName"
                                className="form-control"
                              />
                            </MDBCol>
                            <MDBCol>
                              <div className="input-group mb-4">
                                <div className="input-group-prepend">
                                  <span
                                    className="input-group-text"
                                    id="basic-addon1"
                                  >
                                    @
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  className="form-control py-0"
                                  placeholder="Username"
                                  aria-describedby="basic-addon1"
                                />
                              </div>
                              <label htmlFor="email">Email (optional)</label>
                              <input
                                type="text"
                                id="email"
                                className="form-control mb-4"
                                placeholder="youremail@example.com"
                              />
                              <label htmlFor="address">Address</label>
                              <input
                                type="text"
                                id="address"
                                className="form-control mb-4"
                                placeholder="1234 Main St"
                              />
                              <label htmlFor="address-2">
                                Address 2 (optional)
                              </label>
                              <input
                                type="text"
                                id="address-2"
                                className="form-control mb-4"
                                placeholder="Apartment or suite"
                              />
                            </MDBCol>
                          </MDBRow>
                          <MDBRow>
                            <MDBCol lg="4" md="6" className="mb-4">
                              <label htmlFor="zip">Zip</label>
                              <input
                                type="text"
                                className="form-control"
                                id="zip"
                                required
                              />
                              <div className="invalid-feedback">
                                Zip code required.
                              </div>
                            </MDBCol>
                          </MDBRow>

                          <MDBBtn
                            color="primary"
                            size="lg"
                            block
                            onClick={this.selectNextTab}
                          >
                            Next step
                          </MDBBtn>
                        </form>
                      </MDBTabPane>

                      <MDBTabPane tabId="3">
                        <div className="d-block my-3">
                          <div className="mb-2">
                            <input
                              name="group2"
                              type="radio"
                              className="form-check-input with-gap"
                              id="radioWithGap4"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="radioWithGap4"
                            >
                              Credit card
                            </label>
                          </div>
                          <div className="mb-2">
                            <input
                              iname="group2"
                              type="radio"
                              className="form-check-input with-gap"
                              id="radioWithGap5"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="radioWithGap5"
                            >
                              Debit card
                            </label>
                          </div>
                          <div className="mb-2">
                            <input
                              name="group2"
                              type="radio"
                              className="form-check-input with-gap"
                              id="radioWithGap6"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="radioWithGap6"
                            >
                              Paypal
                            </label>
                          </div>
                          <MDBRow>
                            <MDBCol md="6" className="mb-3">
                              <label htmlFor="cc-name123">Name on card</label>
                              <input
                                type="text"
                                className="form-control"
                                id="cc-name123"
                                required
                              />
                              <small className="text-muted">
                                Full name as displayed on card
                              </small>
                              <div className="invalid-feedback">
                                Name on card is required
                              </div>
                            </MDBCol>
                            <MDBCol md="6" className="mb-3">
                              <label htmlFor="cc-number123">
                                Credit card number
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="cc-number123"
                                required
                              />
                              <div className="invalid-feedback">
                                Credit card number is required
                              </div>
                            </MDBCol>
                          </MDBRow>
                          <MDBRow>
                            <MDBCol md="3" className="mb-3">
                              <label htmlFor="cc-name123">Expiration</label>
                              <input
                                type="text"
                                className="form-control"
                                id="cc-name123"
                                required
                              />
                              <div className="invalid-feedback">
                                Name on card is required
                              </div>
                            </MDBCol>
                            <MDBCol md="3" className="mb-3">
                              <label htmlFor="cc-cvv123">CVV</label>
                              <input
                                type="text"
                                className="form-control"
                                id="cc-cvv123"
                                required
                              />
                              <div className="invalid-feedback">
                                Security code required
                              </div>
                            </MDBCol>
                          </MDBRow>
                          <hr className="mb-4" />
                          <MDBBtn
                            color="primary"
                            onClick={this.order}
                            size="lg"
                            block
                          >
                            Place order
                          </MDBBtn>
                        </div>
                      </MDBTabPane>
                    </MDBTabContent>
                  </MDBCol>
                  <MDBCol lg="4" className="mb-4">
                    <MDBCard>
                      <MDBCardBody>
                        <h4 className="mb-4 mt-1 h5 text-center font-weight-bold">
                          Summary
                        </h4>
                        <hr />
                        {this.state.cart.map(c => (
                          <MDBRow>
                            <MDBCol sm="8">{c.item_name}</MDBCol>
                            <MDBCol sm="4">{c.item_price * c.item_qty}</MDBCol>
                          </MDBRow>
                        ))}

                        <hr />
                        <MDBRow>
                          <MDBCol sm="8">
                            <strong>Total</strong>
                          </MDBCol>
                          <MDBCol sm="4">
                            <strong>$ {total}</strong>
                          </MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBRow>
        </MDBContainer>
        <Footer />
      </div>
    );
  }
}

export default Bill;
