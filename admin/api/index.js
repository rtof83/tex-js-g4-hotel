const Accommodation = require("./models/Accommodation");

// accommodations routes
require("./common/getAllRecords")("/accommodations", Accommodation);
require("./common/updateRecord")("/accommodations", Accommodation);
require("./common/deleteRecord")("/accommodations", Accommodation);
require("./common/createRecord")("/accommodations", Accommodation);
require("./routes/accommodations/getAccommodationById");
// require("./routes/accommodations/createAccommodation");

// banners routes
require("./common/getAllRecords")("/banners", "banner");
require("./common/deleteRecord")("/banners", "banner");
require("./common/updateRecord")("/banners", "banner");
require("./routes/banners/createBanner");

// reservations routes
require("./common/getAllRecords")("/reservations", "reservation");
require("./routes/reservations/createReservation");
require("./routes/reservations/createCoupon");
require("./common/getAllRecords")(
  "/reservations/services",
  "reservationServices"
);
require("./routes/reservations/createReservationServices");

// users routes
require("./common/getAllRecords")("/users", "user");
require("./routes/users/createUser");
require("./routes/users/updateUser");
require("./routes/users/deleteUser");
require("./routes/users/createPermission");
require("./routes/users/createAddress");
require("./routes/users/login");
require("./routes/users/validate");

// services routes
require("./common/getAllRecords")("/services", "service");
require("./common/updateRecord")("/services", "service");
require("./common/deleteRecord")("/services", "service");
require("./routes/services/createService");

// services
require('./services/initialPermission')();
require('./services/initialAdmin')();
