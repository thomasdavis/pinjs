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
  customer_token: 'cus_oX-JRX780mLzQaTcke-Tiw'
}, function (response) {  
  console.log(response.body);
});
