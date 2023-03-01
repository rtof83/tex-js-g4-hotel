const { app } = require('../../database/conn');

module.exports = app.post('/banners', async (req, res) => {
  try {
    await global.connection.query(`INSERT INTO banner (image, slogan) VALUES (?, ?);`, [req.body['image'], req.body.slogan]);
    // await global.connection.query(`INSERT INTO banner (image, slogan) VALUES (?, ?);`, [req.body]);

    // if (!rows)
    //   return res.status(422).json({ message: 'Record not found!' });
      
    res.status(200).json({ message: 'Banner created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
