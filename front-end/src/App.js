import React from "react";
import Services from "./pages/Services";
import Products from "./pages/Items";
import ContactUs from "./pages/ContactUs";
import HomePage from "./pages/Home";
import { Route, withRouter } from "react-router-dom";
import Login from "./components/Login";
import Module from "./components/Module";
import SignUp from "./components/SignUp";
import Table from "./components/Table";
import Bill from "./components/Bill";
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(process.env.REACT_APP_PORT);
  }

  render() {
    return (
      <div className="App">
        <Route exact path="/" render={props => <HomePage {...props} />} />
        <Route path="/services" render={props => <Services {...props} />} />
        <Route path="/products" render={props => <Products {...props} />} />
        <Route path="/contactus" render={props => <ContactUs {...props} />} />
        <Route path="/table" render={props => <Table {...props} />} />
        <Route path="/bill" render={props => <Bill {...props} />} />
      </div>
    );
  }
}

export default withRouter(App);
