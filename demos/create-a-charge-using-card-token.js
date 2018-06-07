var Pin = require('../');

var pin = Pin.setup({
  key: 'your-private-key',
  production: false
});

pin.createCharge({
  amount: 400,
  description: 'test charge',
  email: 'roland@pinpayments.com',
  ip_address: '203.192.1.172',
  card_token: 'tok_nytGw7koRg23EEp9NTmz9w'
}, function (response) {  
  console.log(response.body);
});
