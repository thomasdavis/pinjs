var Pin = require('../');

var pin = Pin.setup({
  key: 'your-private-key',
  production: false
});

pin.createCustomer({
  email: 'roland@pinpayments.com',
  card_token: 'card_NmEoTFipYK2PAM1cTH5Glw'
}, function (response) {  
  console.log(response.body);
});
