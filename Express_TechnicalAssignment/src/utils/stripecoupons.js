const stripe = require('stripe')('sk_test_51HNElzAA9c360wJEM7n6j1g3vKI819Pp8nlm0gWlK2YFThGcjwKJnmwzHzufWQO0Lk3pLuMinlYJ3qyJm6hza0oz00kPsaHbEG');

exports.createCoupon = async (couponId,percentOff, duration, durationInMonths, callback) => {
    const coupon = await stripe.coupons.create({
    id:couponId,
    percent_off: percentOff,
    duration: duration,
    duration_in_months: durationInMonths,
    }).then(
        function(result){
            callback(result)
        },
        function(err) {
            if(err.raw.code == "resource_already_exists"){
                callback({"code": "coupon_already_exists"});
                
            } 
            else {
                callback({"code": "invalid_request"});
            }
        }
    );
};

exports.getCoupon = async (couponId, callback) => {
    const coupon = await stripe.coupons.retrieve(
        couponId
    ).then(
        function(result) {
            callback(result);
        },
        function(err) {
            console.log(err.raw.code)
            if(err.raw.code == "resource_missing"){
                callback({"code": "no_such_coupon"});
            } 
            else {
                callback({"code": "invalid_request"});
            }
        }
    ); 
}

exports.getAllCoupons = async (callback) => {
    const coupons = await stripe.coupons.list({
        limit: 100,
    }).then(
        function(result) {
            callback(result);
        },
        function(err) {
            console.log(err.raw.code)
            if(err.raw.code == "resource_missing"){
                callback({"code": "list_empty"});
            } 
            else {
                callback({"code": "invalid_request"});
            }
        }
    ); 
}


exports.deleteCoupon = async (couponId, callback) => {
    const deletedCoupon = await stripe.coupons.del(
        couponId
    ).then(
        function(result){
            callback(result);
        },
        function(err) {
            if(err.raw.code == "resource_missing") {
                callback({"code": "no_such_coupon"});
            }
            else {
                callback({"code": "invalid_request"});
            }
        }
    );
};


// createCoupon("40_off", "40", 'repeating', "4");
// getCoupon("40_off");
// deleteCoupon("50_off");
