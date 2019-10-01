import React from "react";
import Card from "../components/cardItems.js";
import Footer from "../components/Footer.js";
import Header from "../components/Header.js";
import API from "../api/API";
class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.API = new API("items");
  }
  async componentDidMount() {
    const items = await this.API.getApi();
    this.setState({ items: items.items }, () => console.log(this.state.items));
  }
  render() {
    return (
      <div>
        <Header />
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <Card items={this.state.items} {...this.props} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Items;
