import React from 'react';
import fetching from "./Fetch"
class ApiServices extends React.Component {
constructor(props){
    super(props)
  this.state = {
        services: [],
        error_message: "",
        isLoading: false
        };
    }
      async componentDidMount() {
        console.log("children", this.props.children)
        this.getServices();
    }
      getServices = async () => {
        this.setState({ isLoading: true });
        try {
         
          const url = 'http://localhost:8080/services'
          const answer = await fetching(url)
          if (answer.message) {
            
            this.setState({ services: answer.services, isLoading: false });
            console.log(this.state.services,"alllll")
         
          } else {
            console.log(this.state.services,"sadddddd");
            this.setState({ error_message: answer, isLoading: false });
          }
        } catch (err) {
          console.log("error", err);
          this.setState({ error_message: err.message, isLoading: false });
        }
      };
      addServices = async () => {
        this.setState({ isLoading: true });
        try {
            const body = {
                "service_name":"mmmmmmmm", 
                "service_desc": "nnnnnnnnnnn",
                "service_image": "bbbbbbbbbb"
            }
          const url = 'http://localhost:8080/services'
   
         const answer =await fetching(url , "POST", body)
          console.log('========',answer)
          if (answer.message) {
            
            this.setState({ services: answer.services, isLoading: false });
         
          } else {
            console.log(this.state.services,"sadddddd");
            this.setState({ error_message: answer, isLoading: false });
          }
        } 
        catch (err) {
          console.log("error", err);
          this.setState({ error_message: err.message, isLoading: false });
        }
      };
      deleteServices = async () => {
        this.setState({ isLoading: true });
         const body = {
             "service_id":10
         }
         console.log("ssss")
        try { 
          const url = 'http://localhost:8080/services'
   
         const answer =await fetching(url ,"DELETE",body)
          console.log('========',answer)
          if (answer.message) {
            
            this.setState({ services: answer.services, isLoading: false });
         
          } else {
            // console.log(this.state.services,"sadddddd");
            this.setState({ error_message: answer, isLoading: false });
          }
        } 
        catch (err) {
          console.log("error", err);
          this.setState({ error_message: err.message, isLoading: false });
        }
      };
      updateServices = async () => {
        // if (!service_name && !service_desc && !service_image) {
        //     throw new Error("You need to provide an email or name");
        console.log("ssssssss")
        //   }
        this.setState({ isLoading: true });
        try {
            const body = {
                "service_name":"basel", 
                "service_desc":"baesl",
                "service_image":"basel",
                "service_id":4
            }
            console.log("bbbbbbbbbbb")
          const url = 'http://localhost:8080/services'
   
         const answer =await fetching(url , "PATCH", body)
          console.log('========',answer)
          if (answer.message) {
            
            this.setState({ services: answer.services, isLoading: false });
         
          } else {
            console.log(this.state.services,"sadddddd");
            this.setState({ error_message: answer, isLoading: false });
          }
        } 
        catch (err) {
          console.log("error", err);
          this.setState({ error_message: err.message, isLoading: false });
        }
      };




    render() { 
      const x = React.Children.map(this.props.children, child =>React.cloneElement(child, 
        {...this.state}));
return(
 
        <>{x}</>
  
)
    }

}
 
export default ApiServices ;