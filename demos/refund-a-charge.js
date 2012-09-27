var Pin = require('../');

var pin = Pin.setup({
  key: 'your-private-key',
  production: false
});

pin.refundCharge('ch_WsscVf6IqlfUaLFtLUa5vA', {
  amount: 400
}, function (response) {  
  console.log(response.body);
});