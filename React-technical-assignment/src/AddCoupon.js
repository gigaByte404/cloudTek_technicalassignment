import React, { Component } from "react";
import axios from 'axios';

class AddCoupon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            couponId: '',
            percentOff: '',
            duration: '',
            durationInMonths: ''
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
    //   Function will handle change for input fields
      handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state);
      }
      
    /*   
        function will handle submit and 
        make a POST request to Express API 
        to create a coupon
    */
      handleSubmit(event) {
        event.preventDefault();
        var coupon_id = this.state.couponId;
        var data = JSON.stringify(this.state);

        var config = {
          method: 'post',
          url: 'http://localhost:3001/api/addcoupon',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
          console.log();
          var reqResponse = response.data;
          console.log(reqResponse.code);
          if(reqResponse.code==="invalid_request" || reqResponse.code==="coupon_already_exists") {
            alert("Coupon " + coupon_id + " Already exist!!!");
          }
          else {
              alert("Coupon Addedd Successfully");
              this.setState(
                {
                    couponId: '',
                    percentOff: '',
                    duration: '',
                    durationInMonths: ''
                }
              );
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }


    render() {
    return (
        <div>
            <h2>Add Coupon</h2>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Coupon ID:
                    <input type="text" required name="couponId" value={this.state.couponId} onChange={this.handleChange} />
                </label>
                <label>
                    Percent Off:
                    <input type="text" required name="percentOff" value={this.state.percentOff} onChange={this.handleChange} />
                </label>
                <label>
                    Duration:
                    <input type="text" required name="duration" value={this.state.duration} onChange={this.handleChange} />
                </label>
                <label>
                    Duration in Months:
                    <input type="text" required name="durationInMonths" value={this.state.durationInMonths} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
                
            </form>
      </div>
    );
  }
}
 
export default AddCoupon;