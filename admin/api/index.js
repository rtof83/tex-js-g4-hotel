const { connect } = require("./database/conn");

(async () => {
  await connect();
})();

// accommodations routes
require("./commonMethods/getAllRecords")("/accommodations", "accommodation");
require("./routes/accommodations/getAccommodationById");
require("./routes/accommodations/createAccommodation");

// banners routes
require("./commonMethods/getAllRecords")("/banners", "banner");
require("./commonMethods/deleteRecord")("/banners", "banner");
require("./commonMethods/updateRecord")("/banners", "banner");
require("./routes/banners/createBanner");

// reservations routes
require("./commonMethods/getAllRecords")("/reservations", "reservation");
require("./routes/reservations/createReservation");
require("./routes/reservations/createCoupon");
require("./commonMethods/getAllRecords")(
  "/reservations/services",
  "reservationServices"
);
require("./routes/reservations/createReservationServices");

// users routes
require("./commonMethods/getAllRecords")("/users", "user");
require("./routes/users/createUser");
require("./routes/users/updateUser");
require("./routes/users/deleteUser");
require("./routes/users/createPermission");
require("./routes/users/createAddress");
require("./routes/users/login");
require("./routes/users/validate");

// services routes
require("./commonMethods/getAllRecords")("/services", "service");
require("./commonMethods/updateRecord")("/services", "service");
require("./commonMethods/deleteRecord")("/services", "service");
require("./routes/services/createService");
