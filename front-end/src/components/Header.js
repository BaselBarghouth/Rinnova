import React from "react";
import { MDBNavbar,MDBNavbarBrand,MDBNavbarNav,MDBNavbarToggler,MDBCollapse,MDBNavItem,MDBNavLink} from "mdbreact";
import rinnova from "../images/rinnova.png";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  render() {
    return (
      <div style={{marginBottom:"100px"}}>
        <header>
          <MDBNavbar color="grey" dark expand="md" fixed="top">
            <MDBNavbarBrand href="/">
              <strong>
                <img
                  src={rinnova}
                  style={{ maxWidth: "100px" }}
                  alt="Rinnova logo"
                />
              </strong>
            </MDBNavbarBrand>
            {!this.state.isWideEnough && (
              <MDBNavbarToggler onClick={this.onClick} />
            )}
            <MDBCollapse isOpen={this.state.collapse} navbar>
              <MDBNavbarNav left>
                <MDBNavItem active>
                  <MDBNavLink to="/">Home</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/services">Services</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/products">Products</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/contactus">Contact Us</MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
        </header>
      </div>
    );
  }
}

export default Header;
