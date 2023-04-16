const Accommodation = require("./models/Accommodation");
const Service = require("./models/Service");
const Banner = require("./models/Banner");
const Reservation = require("./models/Reservation");
const Permission = require("./models/Permission");
const User = require("./models/User");
const Coupon = require("./models/Coupon");
const Review = require("./models/Review");

// accommodations routes
require("./common/getAllRecords")("/accommodations", Accommodation);
require("./common/updateRecord")("/accommodations", Accommodation);
require("./common/deleteRecord")("/accommodations", Accommodation);
require("./common/createRecord")("/accommodations", Accommodation);
require("./routes/accommodations/getAccommodationById");

// banners routes
require("./common/getAllRecords")("/banners", Banner);
require("./common/updateRecord")("/banners", Banner);
require("./common/deleteRecord")("/banners", Banner);
require("./common/createRecord")("/banners", Banner);

// reservations routes
require("./common/getAllRecords")("/reservations", Reservation);
require("./routes/reservations/createReservation");
require("./routes/reservations/createCoupon");
require("./routes/reservations/getReservationsByUser");
require("./routes/reservations/getReservationById");
require("./common/deleteRecord")("/reservations", Reservation);

// users routes
require("./common/getAllRecords")("/users", User);
require("./routes/users/getUserById");
require("./routes/users/createUser");
require("./routes/users/updateUser");
require("./routes/users/softDeleteUser");
require("./common/createRecord")("/users/permissions", Permission);
require("./routes/users/login");
require("./routes/users/validate");

// services routes
require("./common/getAllRecords")("/services", Service);
require("./common/updateRecord")("/services", Service);
require("./common/deleteRecord")("/services", Service);
require("./common/createRecord")("/services", Service);

// contacts routes
require("./routes/contacts/getContacts");
require("./routes/contacts/createContact");
require("./routes/contacts/deleteContact");

// coupons routes
require("./common/getAllRecords")("/coupons", Coupon);
require("./common/activateInactivateRecord")("/coupons", Coupon);
require("./common/deleteRecord")("/coupons", Coupon);
require("./common/updateRecord")("/coupons", Coupon);
require("./routes/coupons/createCoupon");
require("./routes/coupons/useCoupon");
require("./routes/coupons/checkCoupon");

// review routes
require("./common/getAllRecords")("/reviews", Review);
require("./routes/reviews/getReviewsByAccommodation");
require("./routes/reviews/getReviewsByUser");
require("./routes/reviews/createReview");

// services
require("./services/initialPermission")();
require("./services/initialAdmin")();
