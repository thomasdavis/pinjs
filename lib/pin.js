const got = require('got');

const liveUrl = 'https://api.pinpayments.com';
const testUrl = 'https://test-api.pinpayments.com';

var Pin = function(options) {

  const client = got.extend({
    prefixUrl: options.url,
    headers: { 'user-agent': 'pinjs (https://github.com/thomasdavis/pinjs)' },
    username: options.key,
    responseType: 'json'
  });

  this.createCard = function(fields, callback) {
    client.post('/1/cards', { json: fields })
      .then(response => callback(null, response, response.body))
      .catch(error => callback(error, error.response, error.response ? error.response.body : null));
  };

  this.createCustomer = function(fields, callback) {
    client.post('/1/customers', { json: fields })
      .then(response => callback(null, response, response.body))
      .catch(error => callback(error, error.response, error.response ? error.response.body : null));
  };

  this.retrieveCustomer = function(token, callback) {
    client.get(`/1/customers/${token}`)
      .then(response => callback(null, response, response.body))
      .catch(error => callback(error, error.response, error.response ? error.response.body : null));
  };

  this.createCustomerCard = function(token, fields, callback) {
    client.post(`/1/customers/${token}/cards`, { json: fields })
      .then(response => callback(null, response, response.body))
      .catch(error => callback(error, error.response, error.response ? error.response.body : null));
  };

  this.retrieveCustomerCards = function(token, callback) {
    client.get(`/1/customers/${token}/cards`)
      .then(response => callback(null, response, response.body))
      .catch(error => callback(error, error.response, error.response ? error.response.body : null));
  }

  this.refundCharge = function(chargeId, fields, callback) {
    client.post(`/1/charges/${chargeId}/refunds`, { json: fields })
      .then(response => callback(null, response, response.body))
      .catch(error => callback(error, error.response, error.response ? error.response.body : null));
  };

  this.retrieveChargeRefunds = function(chargeId, callback) {
    client.get(`/1/charges/${chargeId}/refunds`)
      .then(response => callback(null, response, response.body))
      .catch(error => callback(error, error.response, error.response ? error.response.body : null));
  };

  this.retrieveCharge = function(chargeId, callback) {
    client.get(`/1/charges/${chargeId}`)
      .then(response => callback(null, response, response.body))
      .catch(error => callback(error, error.response, error.response ? error.response.body : null));
  };

  this.createCharge = function(fields, callback) {
    client.post('/1/charges', { json: fields })
      .then(response => callback(null, response, response.body))
      .catch(error => callback(error, error.response, error.response ? error.response.body : null));
  };

  //Recipients
  this.createRecipient = function(fields, callback) {
    client.post('/1/recipients', { json: fields })
      .then(response => callback(null, response, response.body))
      .catch(error => callback(error, error.response, error.response ? error.response.body : null));
  }

  this.getRecipientsList = function(callback) {
    client.get('/1/recipients')
      .then(response => callback(null, response, response.body))
      .catch(error => callback(error, error.response, error.response ? error.response.body : null));
  }

  this.getRecipientData = function(token, callback) {
    client.get(`/1/recipients/${token}`)
      .then(response => callback(null, response, response.body))
      .catch(error => callback(error, error.response, error.response ? error.response.body : null));
  }

  this.updateRecipientData = function(token, fields, callback) {
    client.put(`/1/recipients/${token}`, { json: fields })
      .then(response => callback(null, response, response.body))
      .catch(error => callback(error, error.response, error.response ? error.response.body : null));
  }

  this.getRecipientTransfers = function(token, callback) {
    client.get(`/1/recipients/${token}/transfers`)
      .then(response => callback(null, response, response.body))
      .catch(error => callback(error, error.response, error.response ? error.response.body : null));
  }

  this.createTransfer = function(fields, callback) {
    client.post('/1/transfers', { json: fields })
      .then(response => callback(null, response, response.body))
      .catch(error => callback(error, error.response, error.response ? error.response.body : null));
  }

  this.getTransfersList = function(callback) {
    client.get('/1/transfers')
      .then(response => callback(null, response, response.body))
      .catch(error => callback(error, error.response, error.response ? error.response.body : null));
  }

  this.getTransferDetails = function(transferToken, callback) {
    client.get(`/1/transfers/${transferToken}`)
      .then(response => callback(null, response, response.body))
      .catch(error => callback(error, error.response, error.response ? error.response.body : null));
  }

  this.getTransferLineItems = function(transferToken, callback) {
    client.get(`/1/transfers/${transferToken}/line_items`)
      .then(response => callback(null, response, response.body))
      .catch(error => callback(error, error.response, error.response ? error.response.body : null));
  }

  this.captureCharge = function(nonCapturedToken, callback) {
    client.put(`/1/charges/${nonCapturedToken}/capture`)
      .then(response => callback(null, response, response.body))
      .catch(error => callback(error, error.response, error.response ? error.response.body : null));
  }
};

var setup = function (options) {
  options.url = liveUrl;
  if(!options.production) {
    options.url = testUrl;
  }
  var pin = new Pin(options);
  return pin;
};

exports.setup = setup;
