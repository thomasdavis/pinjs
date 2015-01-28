var request = require('superagent');

var liveUrl = 'https://api.pin.net.au';
var testUrl = 'https://test-api.pin.net.au';



var Pin = function(options) {

  var generateRequest = function(req, fields, callback) {
    var field, field2;
    req.auth(options.key, '')
    for(field in fields) {
        if(typeof fields[field] === 'object') {
          for(field2 in fields[field]) {
            req.field(field+'['+field2+']', ''+fields[field][field2])
          }
        } else {
          req.field(field, ''+fields[field])
        }
      }

    req.end(function(err,res){
      callback.call(this, err, res.body.response);
    });
  };


  this.createCard = function (fields, callback) {
    var req = request.post(options.url + '/1/cards');
    generateRequest(req, fields, callback);
  };


  this.createCustomer = function (fields, callback) {
    var req = request.post(options.url + '/1/customers');
    generateRequest(req, fields, callback);
  };

  this.retrieveCustomer = function (token, callback) {
    var req = request.get(options.url + '/1/customers/' + token);
    generateRequest(req, {}, callback);
  };

  this.refundCharge = function (chargeId, fields, callback) {

    var req = request.post(options.url + '/1/charges/' + chargeId + '/refunds');
    generateRequest(req, fields, callback);
  };

  this.retrieveCharge = function (chargeId, callback) {

    var req = request.get(options.url + '/1/charges/' + chargeId);
    generateRequest(req, {}, callback);
  };

  this.createCharge = function (fields, callback) {
    var req = request.post(options.url + '/1/charges');
    generateRequest(req, fields, callback);
  };

  //Recipients

  this.createRecipient = function(fields,callback){
    var req = request.post(options.url + '/1/recipients');
    generateRequest(req,fields,callback);
  }

  this.getRecipientsList = function(callback){
    var req = request.get(options.url +'/1/recipients');
    generateRequest(req,{},callback);
  }

  this.getRecipientData = function(token,callback){
    var req = request.get(options.url + '/1/recipients/' + token);
    generateRequest(req,{},callback);
  }

  this.updateRecipientData = function(token,fields,callback){
    var req = request.put(options.url + '/1/recipients/' + token);
    generateRequest(req,fields,callback);
  }

  this.getRecipientTransfers = function(token,callback){
    var req = request.get(options.url +'/1/recipients/' + token +'/transfers');
    generateRequest(req,{},callback);
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
