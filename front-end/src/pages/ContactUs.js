import React, { Component } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import Form from '../components/contactform'
class ContactUs extends Component {
    constructor(props) {
        super(props);
      
    }
    render() { 
        return ( 
            <div>
            <Header />
            <Form />
            <Footer />
            </div>
         );
    }
}
 
export default ContactUs;