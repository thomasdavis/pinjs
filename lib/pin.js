var request = require('request');

const liveUrl = 'https://api.pinpayments.com';
const testUrl = 'https://test-api.pinpayments.com';

var Pin = function(options) {

  var generateRequest = function(req) {
    req.auth(options.key, '')
  };


  this.createCard = function (fields, callback) {
    var req = request.post({url: options.url + '/1/cards', body: fields, json: true}, callback);
    generateRequest(req);
  };


  this.createCustomer = function (fields, callback) {
    var req = request.post({url: options.url + '/1/customers', body: fields, json: true}, callback);
    generateRequest(req);
  };

  this.retrieveCustomer = function (token, callback) {
    var req = request.get({url: options.url + '/1/customers/' + token, json: true}, callback);
    generateRequest(req);
  };

  this.createCustomerCard = function(token, fields, callback) {
    var req = request.post({ url: options.url + '/1/customers/' + token + '/cards', body: fields, json: true }, callback);
    generateRequest(req);
  };

  this.refundCharge = function (chargeId, fields, callback) {
    var req = request.post({url: options.url + '/1/charges/' + chargeId + '/refunds', body: fields, json: true}, callback);
    generateRequest(req);
  };

  this.retrieveChargeRefunds = function (chargeId, callback) {

    var req = request.get({url: options.url + '/1/charges/' + chargeId + '/refunds', json: true}, callback);
    generateRequest(req);
  };

  this.retrieveCharge = function (chargeId, callback) {

    var req = request.get({url: options.url + '/1/charges/' + chargeId, json: true}, callback);
    generateRequest(req);
  };

  this.createCharge = function (fields, callback) {
    var req = request.post({url: options.url + '/1/charges', body: fields, json: true}, callback);
    generateRequest(req);
  };

  //Recipients

  this.createRecipient = function(fields,callback){
    var req = request.post({url: options.url + '/1/recipients', body: fields, json: true}, callback);
    generateRequest(req);
  }

  this.getRecipientsList = function(callback){
    var req = request.get({url: options.url +'/1/recipients', json: true}, callback);
    generateRequest(req);
  }

  this.getRecipientData = function(token,callback){
    var req = request.get({url: options.url + '/1/recipients/' + token, json: true}, callback);
    generateRequest(req);
  }

  this.updateRecipientData = function(token,fields,callback){
    var req = request.put({url: options.url + '/1/recipients/' + token, body: fields, json: true}, callback);
    generateRequest(req);
  }

  this.getRecipientTransfers = function(token,callback){
    var req = request.get({url: options.url +'/1/recipients/' + token +'/transfers', json: true}, callback);
    generateRequest(req);
  }
  this.createTransfer = function(fields,callback){
    var req = request.post({url: options.url+'/1/transfers', body: fields, json: true}, callback);
    generateRequest(req);
  },
  this.getTransfersList = function(callback){
    var req = request.get({url: options.url + '/1/transfers', json: true}, callback)
    generateRequest(req);
  }

  this.getTransferDetails = function(transferToken, callback){
    var req = request.get({url: options.url + '/1/transfers/' + transferToken, json: true}, callback);
    generateRequest(req);
  },

  this.getTransferLineItems = function(transferToken, callback){
    var req = request.get({url: options.url + '/1/transfers/' + transferToken+'/line_items', json: true}, callback);
    generateRequest(req);
  },

  this.captureCharge = function (nonCapturedToken, callback) {
    var url = options.url + '/1/charges/' + nonCapturedToken + "/capture";
    var req = request.put({url: url, json: true}, callback);
    generateRequest(req);
  };


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
