import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import API from '../api/API'
import SingUp from './Module2'
class FormPage extends React.Component {
  constructor(props){
    super(props);
    this.state={
      user_email:'',
      user_password:''
    }
    this.API = new API('login')
  }
  onChange = (event)=>{
    this.setState({
      [event.target.name]:event.target.value
    })
  }
  onSubmit = async event=>{

    const login = await this.API.addApi(this.state)
    if(login.token){
      localStorage.setItem('token',login.token)
     this.props.history.push({
      pathname: '/table',
      state: { cart: this.props.cart }
    })
    }
    else{
      alert('Soory you are not a user pleas sing up')
    }
    
   
  }
  render(){
  
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <form >
            <p className="h5 text-center mb-4">Sign in</p>
            <div className="grey-text">
              <MDBInput
                label="Type your email"
                icon="envelope"
                group
               
                name="user_email"
                onChange={(event)=>this.onChange(event)}
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                label="Type your password"
                icon="lock"
                group
              
                name="user_password"
                onChange={(event)=>this.onChange(event)}
                validate
              />
            </div>
            <div className="text-center">
              <MDBBtn color="primary" onClick={(event)=>this.onSubmit(event)} >Login</MDBBtn>
              <SingUp {...this.props} />  
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );}
};

export default FormPage;