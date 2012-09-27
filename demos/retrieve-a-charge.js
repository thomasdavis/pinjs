var Pin = require('../');

var pin = Pin.setup({
  key: 'your-private-key',
  production: false
});

pin.retrieveCharge('ch_WsscVf6IqlfUaLFtLUa5vA', function (response) {  
  console.log(response.body);
});