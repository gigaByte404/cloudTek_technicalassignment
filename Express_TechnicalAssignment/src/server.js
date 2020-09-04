const stripecoupons = require("./utils/stripecoupons");
const bodyParser = require('body-parser');
const express = require('express');
var cors = require('cors');

const port = 3001;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());
// stripecoupons.createCoupon("50_off", "40", 'repeating', "4");
// stripecoupons.deleteCoupon("50_off");
// stripecoupons.deleteCoupon("50_off");
app.post('/api/addcoupon', (req, res, next) => {
    const reqBody = req.body;
    const couponId = reqBody.couponId;
    const percentOff = reqBody.percentOff;
    const duration = reqBody.duration;
    const durationInMonths = reqBody.durationInMonths;
    // console.log(couponId, " ", percentOff, " ", duration, " ", durationInMonths);
    if(!(Object.keys(reqBody).length === 0 && reqBody.constructor === Object)){
        console.log(stripecoupons.createCoupon(couponId, percentOff, duration, durationInMonths, (result)=>{
            res.send(result);
        }));
    }
    else {
        res.send({"error": "invalid_request"});
    }
});

app.delete('/api/removecoupon', (req, res, next) => {
    const reqBody = req.body;
    const couponId = reqBody.couponId;
    if(!(Object.keys(reqBody).length === 0 && reqBody.constructor === Object)){
        stripecoupons.deleteCoupon(couponId, (result)=>{
            res.send(result);
        });
    }
    else {
        res.send({"error": "invalid_request"});
    }
});

app.get('/api/allcoupons', (req, res, next) => {
    stripecoupons.getAllCoupons((result) => {
        res.send(result);
    });
    
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});