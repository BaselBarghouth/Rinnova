import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';

class Form extends React.Component{
  constructor(props){
    super(props)
    this.state= {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  }
  onChange = (event)=>{
    this.setState({[event.target.name]:event.target.value})
  
  }
   handleSubmit= async (event)=>{
    // event.preventDefault();
    const body = this.state
   
    console.log(this.state)
      const form = await fetch('http://localhost:8080/send',
      {
        method:'POST',
    body:JSON.stringify(body),
  headers:{'Content-Type':'application/json'}
})
console.log(form)
    }

  
  render(){
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <form >
            <p className="h5 text-center mb-4">Write to us</p>
            <div className="grey-text">
              <MDBInput
                label="Your name"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                name ="name"
                onChange={this.onChange}
                value={this.state.name}
              />
              <MDBInput
                label="Your email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
                name="email"
                onChange={this.onChange}
                value={this.state.email}
              />
              <MDBInput
                label="Subject"
                icon="tag"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                name ="subject"
                onChange={this.onChange}
                value={this.state.subject}
              />
              <MDBInput
                type="textarea"
                rows="2"
                label="Your message"
                icon="pencil-alt"
                name="message"
                onChange={this.onChange}
                value={this.state.message}
              />
            </div>
            <div className="text-center">
              <MDBBtn outline color="grey" onClick={this.handleSubmit}>
                Send <MDBIcon  far icon="paper-plane" className="ml-1" />
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
}
export default Form;