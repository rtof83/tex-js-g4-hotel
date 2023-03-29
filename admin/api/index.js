const Accommodation = require("./models/Accommodation");
const Service = require("./models/Service");
const Banner = require("./models/Banner");
const Contact = require("./models/Contact");
const Reservation = require("./models/Reservation");
const Permission = require("./models/Permission");
const User = require("./models/User");

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

// users routes
require("./common/getAllRecords")("/users", User);
require("./common/getRecordById")("/users", User);
require("./routes/users/createUser");
require("./common/updateRecord")("/users", User);
require("./common/deleteRecord")("/users", User);
require("./common/createRecord")("/users/permissions", Permission);
require("./routes/users/login");
require("./routes/users/validate");

// services routes
require("./common/getAllRecords")("/services", Service);
require("./common/updateRecord")("/services", Service);
require("./common/deleteRecord")("/services", Service);
require("./common/createRecord")("/services", Service);

// contacts routes
require("./common/getAllRecords")("/contacts", Contact);
require("./common/createRecord")("/contacts", Contact);

// services
require('./services/initialPermission')();
require('./services/initialAdmin')();
