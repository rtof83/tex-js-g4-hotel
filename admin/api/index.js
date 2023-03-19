const Accommodation = require("./models/Accommodation");
const Service = require("./models/Service");
const Banner = require("./models/Banner");

// accommodations routes
require("./common/getAllRecords")("/accommodations", Accommodation);
require("./common/updateRecord")("/accommodations", Accommodation);
require("./common/deleteRecord")("/accommodations", Accommodation);
require("./common/createRecord")("/accommodations", Accommodation);
require("./routes/accommodations/getAccommodationById");
// require("./routes/accommodations/createAccommodation");

// banners routes
require("./common/getAllRecords")("/banners", Banner);
require("./common/updateRecord")("/banners", Banner);
require("./common/deleteRecord")("/banners", Banner);
require("./common/createRecord")("/banners", Banner);

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
// require("./routes/services/createService");
require("./common/createRecord")("/services", Service);

// services
require('./services/initialPermission')();
require('./services/initialAdmin')();
