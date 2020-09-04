import React, { Component } from "react";
import axios from 'axios';

class Home extends Component {
    constructor(props) {
        super(props);
        this.deleteCoupon = this.deleteCoupon.bind(this);
    }

    state = {
        coupons: []
    }

    renderCoupons = (listOfCoupons) => {
        var row = listOfCoupons.map( coupon => {
            return(
                <div>
                    <p>
                        Coupon ID: {coupon.id}
                    </p>
                    <p>
                       Duration: {coupon.duration}
                    </p>
                    <p>
                       Duration in Months: {coupon.duration_in_months}
                    </p>
                    <p>
                        Percent Off: {coupon.percent_off}
                    </p>
                    <p>
                    <button onClick={() => this.deleteCoupon({couponId: coupon.id})}>
                        Click To Delete Coupon {coupon.id}
                    </button>
                    </p>
                <br />
                </div>
            );
        }
        );
        return row;
    }    

    /*
     *Function to make a get request to Node Express API
     to delete a Coupon from Stripe API. 
    */
    deleteCoupon = (couponIdObj, e) => {
        console.log(couponIdObj);

        var data = JSON.stringify(couponIdObj);

        var config = {
          method: 'delete',
          url: 'http://localhost:3001/api/removecoupon',
          headers: { 
            'Content-Type': 'application/json'
          },
          data: data
        };
        
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          alert("Coupon Deleted: "+ couponIdObj.couponId);
          window.location.reload(false);
        })
        .catch(function (error) {
          console.log(error);
        });        
    }

    /* 
      *method which will fetch all the 
      coupons and will update the state.
    */
    componentDidMount() {
        axios.get(`http://localhost:3001/api/allcoupons`)
          .then(res => {
            const couponsData = res.data.data;
            this.setState({ coupons: couponsData });
        }).catch(
            function(error) {
                this.setState({
                    coupons: []
                });
                console.log("Error Occurs in Get Request!!!");
            }
        );
    }
    render() {
        return (
            <div>
                <h2>Showing All Coupons</h2>
                <ul style={{"textDecoration": "None"}}>
                    { this.renderCoupons(this.state.coupons)}
                </ul>
            </div>
        );
    }
}
export default Home;