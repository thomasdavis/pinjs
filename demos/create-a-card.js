var Pin = require('../');

var pin = Pin.setup({
  key: 'pk_DSA-1XmSdIIViXp4bJO8SA',
  production: false
});

pin.createCard({
  number: 5520000000000000,
  expiry_month: '05',
  expiry_year: 2013,
  cvc: 519,
  name: 'Roland Robot',
  address_line1: '42 Sevenoaks St',
  address_city: 'Lathlain',
  address_postcode: 6454,
  address_state: 'WA',
  address_country: 'AU'
}, function (response) {  
  console.log(response.body);
});

