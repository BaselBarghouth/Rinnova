import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter,MDBNavLink } from "mdbreact";

const Footer = () => {
  return (
    <MDBFooter color="grey" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">Footer Content</h5>
            <p>
              Here you can use rows and columns here to organize your footer
              content.
            </p>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">Links</h5>
            <ul>
              <li className="list-unstyled">
              <MDBNavLink to="/">Home</MDBNavLink>
              </li>
              <li className="list-unstyled">
              <MDBNavLink to="/services">Services</MDBNavLink>
              </li>
              <li className="list-unstyled">
              <MDBNavLink to="/products">Products</MDBNavLink>
              </li>
              <li className="list-unstyled">
              <MDBNavLink to="/contactus">Contact Us</MDBNavLink>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.MDBootstrap.com"> MDBootstrap.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default Footer;