import React, { Component } from "react";
import {
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBTooltip,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBInput,
  MDBBtn
} from "mdbreact";
import Header from "./Header";
import Footer from "./Footer";
class eCommercePage extends Component {
  state = {
    data: [],
    columns: [
      {
        label: "",
        field: "img"
      },
      {
        label: <strong>Product</strong>,
        field: "product"
      },
      {
        label: <strong>Color</strong>,
        field: "color"
      },
      {
        label: <strong>Price</strong>,
        field: "price"
      },
      {
        label: <strong>QTY</strong>,
        field: "qty"
      },
      {
        label: <strong>Amount</strong>,
        field: "amount"
      },
      {
        label: "",
        field: "button"
      }
    ]
  };
  componentDidMount() {
    let data = this.props.location.state.cart;
    data.map(d => (d["item_qty"] = 1));
    this.setState({ data });
  }
  deleteItem = (event, index) => {
    let data = this.state.data;
    data.splice(index, 1);
    this.setState({ data });
  };
  onChange = (event, index) => {
    let temp = this.state.data;
    temp[index]["item_qty"] = event.target.value;
    this.setState({ data: temp });
  };
  render() {
    let total = 0;
    this.state.data.map(
      item =>
        (total =
          parseInt(total) + parseInt(item.item_price) * parseInt(item.item_qty))
    );
    const rows = [];
    const { columns, data } = this.state;

    data.map((row, index) => {
      return rows.push({
        img: (
          <img
            src={row.item_image}
            alt=""
            className="img-fluid z-depth-0"
            style={{ maxWidth: "150px" }}
          />
        ),
        product: [
          <h5 className="mt-3" key={new Date().getDate + 1}>
            <strong>{row.item_name}</strong>
          </h5>,
          <p key={new Date().getDate} className="text-muted">
            {row.item_desc}
          </p>
        ],
        color: row.color,
        price: `$${row.item_price}`,
        qty: (
          <MDBInput
            type="number"
            valueDefault={1}
            className="form-control"
            onChange={event => this.onChange(event, index)}
            style={{ width: "100px" }}
          />
        ),
        amount: <strong>${row.item_qty * row.item_price}</strong>,
        button: (
          <MDBTooltip placement="top">
            <MDBBtn
              color="primary"
              size="sm"
              onClick={event => this.deleteItem(event, index)}
            >
              X
            </MDBBtn>
            <div>Remove item</div>
          </MDBTooltip>
        )
      });
    });

    return (
      <div>
        <Header />
        <MDBRow className="my-2" center>
          <MDBCard className="w-100">
            <MDBCardBody>
              <MDBTable className="product-table">
                <MDBTableHead
                  className="font-weight-bold"
                  color="mdb-color lighten-5"
                  columns={columns}
                />
                <MDBTableBody rows={rows} />
              </MDBTable>
            </MDBCardBody>
          </MDBCard>
          <div style={{ marginTop: "20px" }}>
            <h3>Total:${total}</h3>
            <MDBBtn
              color="primary"
              onClick={() =>
                this.props.history.push({
                  pathname: "/bill",
                  state: { cart: this.state.data, total: total }
                })
              }
            >
              Confirm
            </MDBBtn>
          </div>
        </MDBRow>
        <Footer />
      </div>
    );
  }
}

export default eCommercePage;
