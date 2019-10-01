import React, { Component } from "react";
import { MDBRow, MDBCard, MDBCardBody, MDBTooltip, MDBTable, MDBTableBody, MDBTableHead, MDBInput, MDBBtn } from "mdbreact";
import Header from './Header'
import Footer from './Footer'
class eCommercePage extends Component {
state = {
  cart:[
  ],
      
  data: [

    ],
    columns: [
      {
        label: '',
        field: 'img',
      },
      {
        label: <strong>Product</strong>,
        field: 'product'
      },
      {
        label: <strong>Price</strong>,
        field: 'price'
      },
      {
        label: <strong>Remove Item</strong>,
        field: 'qty'
      }
  ]
}
componentDidMount(){
  let data = this.props.location.state.cart
this.setState({data})
}
deleteItem = (event,index)=>{
  let data = this.state.data
  data.splice(index,1)
  this.setState({data})
}
render() {
let total = 0;
this.state.data.map(item=>total = parseInt(total)+parseInt(item.item_price))
    const rows = [];
    const { columns, data } = this.state;

    data.map((row,index) => {
      return rows.push(
        {
        'img': <img src={row.item_image} alt="" className="img-fluid z-depth-0" />,
        'product': [<h5 className="mt-3" key={new Date().getDate + 1}><strong>{row.item_name}</strong></h5>, <p key={new
          Date().getDate} className="text-muted">{row.item_desc}</p>],
        'amount': <strong>${1* row.item_price}</strong>,
        'button':
        <MDBTooltip placement="top">
            <MDBBtn color="primary" size="sm" onClick={(event)=>this.deleteItem(event,index)} >
                X
            </MDBBtn>
            <div>Remove item</div>
        </MDBTooltip>
        }
      )
    });

    return (
      <div>
      <Header />
    <MDBRow className="my-2" center>
      <MDBCard className="w-100">
        <MDBCardBody>
          <MDBTable className="product-table">

            <MDBTableHead className="font-weight-bold" color="mdb-color lighten-5" columns={columns} />
            <MDBTableBody rows={rows} />
          </MDBTable>
        </MDBCardBody>
      </MDBCard>
      
    </MDBRow>
    <h3>Total:${total}</h3>
    <MDBBtn color="primary"  >Confirm</MDBBtn>
    <Footer />
    </div>
    );
  }
}

export default eCommercePage;