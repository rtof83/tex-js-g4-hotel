const { connect } = require('./database/conn');

(async () => {
  await connect();
})();

// accommodations routes
require('./commonMethods/getAll')('/accommodations', 'accommodation');
require('./routes/accommodations/getAccommodationById');
require('./routes/accommodations/createAccommodation');

// banners routes
require('./commonMethods/getAll')('/banners', 'banner');
require('./routes/banners/createBanner');

// reservations routes
require('./commonMethods/getAll')('/reservations', 'reservation');
require('./routes/reservations/createReservation');
require('./routes/reservations/createCoupon');
require('./commonMethods/getAll')('/reservations/services', 'reservationServices');
require('./routes/reservations/createReservationServices');

// users routes
require('./commonMethods/getAll')('/users', 'user');
require('./routes/users/createUser');
require('./routes/users/createPermission');
require('./routes/users/createAddress');

// services routes
require('./commonMethods/getAll')('/services', 'service');
require('./routes/services/createService');
