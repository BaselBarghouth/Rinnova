import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import API from '../api/API'
class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user_name:'',
            user_lastname:'',
            user_email:'',
            user_password:'',
            user_role:'user'
        }
        this.API = new API('users')
    }
    onChange = (event)=>{
        this.setState({
          [event.target.name]:event.target.value
        })
      }

      onSubmit = async event=>{

        const sinUp = await this.API.addApi(this.state)
     if(sinUp.message){
      this.props.history.push('')
     }
       
      }
    render(){
       
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <form>
            <p className="h5 text-center mb-4">Sign up</p>
            <div className="grey-text">
              <MDBInput
                label="Your name"
                icon="user"
                group
                type="text"
                name="user_name"
                validate
                error="wrong"
                success="right"
                onChange={(event)=>this.onChange(event)}
              />
              <MDBInput
                label="Your last name"
                icon="user"
                group
                type="text"
                name="user_lastname"
                validate
                error="wrong"
                success="right"
                onChange={(event)=>this.onChange(event)}
              />
              <MDBInput
                label="Your email"
                icon="envelope"
                group
                name="user_email"
                type="email"
                validate
                error="wrong"
                success="right"
                onChange={(event)=>this.onChange(event)}
              />
              
              <MDBInput
                label="Your password"
                icon="lock"
                group
                name="user_password"
                type="password"
                validate
                onChange={(event)=>this.onChange(event)}
              />
            </div>
            <div className="text-center">
              <MDBBtn color="primary" onClick={(event)=>this.onSubmit(event)} >Register</MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );}
};

export default SignUp;