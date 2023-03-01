const { connect } = require('./database/conn');

(async () => {
  await connect();
})();

// accommodations routes
require('./routes/accommodations/getAllAccommodations');
require('./routes/accommodations/getAccommodationById');

// banners routes
require('./routes/banners/createBanner');
