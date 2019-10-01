import React, { Component } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import About from '../components/AboutUs/AboutUs'
import Slider from '../components/slider'

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
        <div>
        <Header {...this.props} />
        <Slider />
        <div style={{marginTop:'20px'}} >
        <About  />
        </div>
        <Footer />

        </div> );
    }
}
 
export default HomePage;