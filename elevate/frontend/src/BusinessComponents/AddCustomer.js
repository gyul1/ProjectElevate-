import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after
import axios from 'axios';
import ListSubscriptions from './ListSubscriptions'

const mockupSubscriptions = [ //id is benefit id
  { name: "Stadard Package", selected: false, id:0 },
  { name: "Premium Package", selected: false, id:1 },
  { name: "Premium+ Package", selected: false, id:2 },
]

class AddCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api_key: "",
            username: "",
            password: "",

            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",

            street_address: "",
            suite_apt: "",
            city: "",
            state: "",
            postal_code: "",

            emailError: false,
            emailErrorMessage: "",

            subscriptions: [],
        }
    }

    componentDidMount() {
        document.title = "Elevate - Add Customer";
        this.setState({
          subscriptions: mockupSubscriptions,
        })
    }

    addCustomer = () => {
      axios({
        method: 'POST',
        url: '/api/users/',
        headers: {
            'Authorization': `JWT ${localStorage.getItem('token')}`
            },
        data: {
            username: this.state.username,
            password: this.state.password,
            business_api_key: this.state.api_key,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            phone_number: this.state.phone_number,
            street_home_address: this.state.street_address,
            city_home_address: this.state.city,
            state_home_address: this.state.state,
            apt_home_address: this.state.suite_apt,
            zip_home_address: this.state.postal_code,
            customer: true,
            business_FK: this.props.id, //Double Check If user id === businessid
        }
        })
        .then((response) => {
            console.log(response);
            let newCustomer = response.data;
            window.location.replace(`/frontend/business/${this.props.id}/customer/${newCustomer.id}`);
        })
        .catch((error) => {
            console.log(error);    
            console.log(error.response);  
            // if(error.response.status === 400) { // 400 is a bad request
            //     if(error.response.data.email) {
            //         // alert(error.response.data.email);
            //         this.setState({
            //             emailError: true,
            //             emailErrorMessage: error.response.data.email,
            //         })
            //     }
            // }         
        })
    }

    submitForm = (e) => { // function to call backend and add the business
        e.preventDefault();
        console.log(this.state);
        this.addCustomer();
        //this.addCustomer();
    }

    updateSelected = (e, index) => {
      const subscriptions = this.state.subscriptions;
      subscriptions[index].selected = !subscriptions[index].selected;
      this.setState({
          subscriptions,
      })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
      return (
        <div className="AddCustomer">
          <h1>Add Customer</h1>
          <form onSubmit={this.submitForm}>
                <div className="smallboxed">
                    <h4>Customer Account</h4>
                    <div className="subbox1">
                    <label htmlFor="username">Username</label>
                        <br/>
                        <input type="text" name="username" id="username" value={this.state.username} className="inputs" required onChange={this.onChange}/>
                        <br/>
                        <label htmlFor="password">Password</label>
                        <br/>
                        <input type="password" name="password" id="password"  value={this.state.password} className="inputs" required onChange={this.onChange}/>
                        <br/>
                    </div>
                    <div className="subbox2">
                        <label htmlFor="api_key">Customer API Key</label>
                        <br/>
                        <input type="text" name="api_key" id="api_key" value={this.state.api_key} className="inputs" onChange={this.onChange}/>
                        <br/>
                    </div>
                </div>
                <div className="smallboxed">
                        <h4>Customer Information</h4>
                        <div className="subbox1">
                            <label htmlFor="first_name">First Name</label>
                            <br/>
                            <input type="text" name="first_name" id="first_name" value={this.state.first_name} className=" inputs" required onChange={this.onChange}/>
                            <br/>
                            <label htmlFor="last_name">Last Name</label>
                            <br/>
                            <input type="text" name="last_name" id="last_name" value={this.state.last_name} className="inputs" required onChange={this.onChange}/>
                            <br/>
                        </div>
                        <div className="subbox2">
                            <label htmlFor="email">Email</label>
                            <br/>
                            <input type="email" name="email" id="email" value={this.state.email} className="inputs" required onChange={this.onChange}/>
                            {this.state.emailError && <div className="form-error-message">{this.state.emailErrorMessage}</div>} {/* If there is an email error display it*/}
                            <br/>
                            <label htmlFor="phone_number">Phone Number</label>
                            <br/>
                            <input type="number" name="phone_number" id="phone_number" value={this.state.phone_number} className="inputs" required onChange={this.onChange}/>
                            <br/>
                        </div>
                    </div>
                  <div className="smallboxed">
                      <h4>Primary Address</h4>
                      <div className="subbox1">
                          <label htmlFor="street_address">Street Address</label>
                          <br/>
                          <input type="text" name="street_address" id="street_address" value={this.state.street_address} className="inputs" required onChange={this.onChange}/>
                          <br/>
                          <label htmlFor="city">City</label>
                          <br/>
                          <input type="text" name="city" id="city" value={this.state.city} className="inputs" required onChange={this.onChange}/>
                          <br/>
                      </div>
                      <div className="subbox2">
                          <label htmlFor="suite_apt">Suite/Apt#</label>
                          <br/>
                          <input type="number" name="suite_apt" id="suite_apt" value={this.state.suite_apt} className="inputs" onChange={this.onChange}/>
                          <br/>
                          <div id="smaller_input">
                              <label htmlFor="state" >State</label>
                              <br/>
                              <input type="text" name="state" id="state" value={this.state.state} style={{width: '130px'}} required onChange={this.onChange}/>
                              <br/>
                          </div>
                          <div id="smaller_input">
                              <label htmlFor="postal_code" id="smaller_input">Postal Code</label>
                              <br/>
                              <input type="number" name="postal_code" id="postal_code" value={this.state.postal_code} style={{width: '260px'}} required onChange={this.onChange}/>
                              <br/>
                          </div>
                      </div>
                    <br/>
                    {this.state.error ? <div>{this.state.errorMessage}</div> : null}
                    <button className="green_button">Save</button>
                    {/* <Link id="setup" to={this.props.NMILink}>Setup NMI</Link> */}
                    <br/>
                    <br/>
                </div>
            </form>
        </div>
      );
    }
  }


export default AddCustomer;