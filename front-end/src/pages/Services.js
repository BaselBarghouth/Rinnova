import React from "react";
import Card from "../components/cardServices";
import Footer from "../components/Footer.js";
import Header from "../components/Header.js";
import API from "../api/API";
class Services extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: []
    };
    this.API = new API("services");
  }
  async componentDidMount() {
    const services = await this.API.getApi();
    this.setState({ services: services.services }, () =>
      console.log(this.state.services)
    );
  }
  render() {
    return (
      <div>
        <Header />
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <Card services={this.state.services} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Services;
