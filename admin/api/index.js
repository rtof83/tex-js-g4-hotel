const { app } = require('./database/conn');

const cors = require('cors');
app.use(cors());

// ====== environment variables ======
// require('dotenv').config();


// accommodations routes
require('./routes/accommodations/getAllAccommodations');







// // ========== custom routes ==========

// // get coupons
// require('./routes/getCoupons')('/coupons');

// // create coupon
// require('./routes/createCoupon')('/coupons');

// // delete coupon
// require('./routes/deleteCoupons')('/coupons');

// // use coupon
// require('./routes/useCoupon')('/coupons/:coupon');

// // check coupon
// require('./routes/checkCoupon')('/coupons/:coupon');
