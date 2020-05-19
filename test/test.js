var Pin     = require('../');
var _       = require('underscore');
var chai    = require('chai');
var expect  = chai.expect;
var moment = require('moment');
chai.use(require('chai-things'));

var key     = 'lLlpdn5KOO-vusSMnBYq_A';
var pin     = Pin.setup({
  key: key,
  production: false
});

var nextYear = moment().add(1, "year").format("YYYY");

var testChargeToken, testCustomerToken, testCardToken, testRecipient, testTransfer;
var nonCapturedCharge;

if(key.length > 0) {

  describe('Create a card', function () {
    it('should return successfully', function (done) {
      pin.createCard({
        number: 5520000000000000,
        expiry_month: '05',
        expiry_year: nextYear,
        cvc: 519,
        name: 'Roland Robot',
        address_line1: '42 Sevenoaks St',
        address_city: 'Lathlain',
        address_postcode: 6454,
        address_state: 'WA',
        address_country: 'AU'
      }, function (err,res,body) {
        if (err) {
          console.error(err, res, body);
          throw err
        };
        testCardToken = body.response.token;
        done();
      });

    });
  });

  describe('Create a charge', function () {
    it('should return successfully', function (done) {
      pin.createCharge({
        amount: 400,
        description: 'test charge',
        email: 'roland@pinpayments.com',
        ip_address: '203.192.1.172',
        card: {
          number: 5520000000000000,
          expiry_month: '05',
          expiry_year: nextYear,
          cvc: 123,
          name: 'Roland Robot',
          address_line1: '42 Sevenoaks St',
          address_city: 'Lathlain',
          address_postcode: 6454,
          address_state: 'WA',
          address_country: 'AU'
        }
      }, function (err,res,body) {
        if (err) {
          console.error(err, res, body);
          throw err
        };
        testChargeToken = body.response.token;
        done();
      });
    });
  });

  describe('Create a charge and not capture', function () {
    it('should return successfully', function (done) {
      pin.createCharge({
        amount: 400,
        currency: "AUD",
        description: 'test charge',
        email: 'roland@pinpayments.com',
        ip_address: '203.192.1.172',
        capture: false,
        card: {
          number: 5520000000000000,
          expiry_month: '05',
          expiry_year: nextYear,
          cvc: 123,
          name: 'Roland Robot',
          address_line1: '42 Sevenoaks St',
          address_line2: "",
          address_city: 'Lathlain',
          address_postcode: 6454,
          address_state: 'WA',
          address_country: 'Australia'
        }
      }, function (err,res,body) {
        if (err) {
          console.error(err, res, body);
          throw err
        };
        nonCapturedCharge = body.response.token;
        done();
      });
    });
  });

  describe('Create a customer', function () {
    it('should return successfully', function (done) {
      pin.createCustomer({
        email: 'roland@pinpayments.com',
        card: {
          number: 5520000000000000,
          expiry_month: '05',
          expiry_year: nextYear,
          cvc: 123,
          name: 'Roland Robot',
          address_line1: '42 Sevenoaks St',
          address_city: 'Lathlain',
          address_postcode: 6454,
          address_state: 'WA',
          address_country: 'AU'
        }
      }, function (err,res,body) {
        if (err) {
          console.error(err, res, body);
          throw err
        };
        testCustomerToken = body.response.token;
        done();
      })
    });
  });

  describe('Retrieve a customer', function () {
    it('should return successfully', function (done) {
      pin.retrieveCustomer(testCustomerToken, function (err,res,body) {
        if (err) { throw err }
        done();
      });
    });
  });

  describe('Retrieve customer cards', function () {
    it('should return successfully', function (done) {
      pin.retrieveCustomerCards(testCustomerToken, function(err, res, body) {
        if (err) {
          console.log(err);
          throw err
        }
        expect(res.statusCode).to.eq(200);
        expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
        expect(body.response[0].token).to.match(/card_(\w+)/);
        expect(body.response[0].scheme).to.match(/master|visa/);
        expect(body.response[0].customer_token).to.match(/cus_(\w+)/);
        done();
      });
    });
  });

  describe('Refund a charge', function () {
    it('should return successfully', function (done) {
      pin.refundCharge(testChargeToken, {
        amount: 400
      }, function (err,res,body) {
        if (err) { throw err };
        done();
      });
    });
  });

  describe('Retrieve a charge', function () {
    it('should return successfully', function (done) {
      pin.retrieveCharge(testChargeToken, function (err,res) {
        if (err) { throw err };
        done();
      });
    });
  });

  describe('Create a charge using a card token', function () {
    it('should return successfully', function (done) {
      pin.createCharge({
        amount: 400,
        description: 'test charge',
        email: 'roland@pinpayments.com',
        ip_address: '203.192.1.172',
        card_token: testCardToken
      }, function (err,res) {
        if (err) { throw err };
        done();
      });
    });
  });
  
  describe('Create a charge using a customer token', function () {
    it('should return successfully', function (done) {
      pin.createCharge({
        amount: 400,
        description: 'test charge',
        email: 'roland@pinpayments.com',
        ip_address: '203.192.1.172',
        customer_token: testCustomerToken
      }, function (err,res) {
        if (err) { throw err };
        done();
      });
    });
  });

  describe('Create a customer using a card token', function () {
    it('should return successfully', function (done) {
      pin.createCard({
        number: 5520000000000000,
        expiry_month: '05',
        expiry_year: nextYear,
        cvc: 519,
        name: 'Roland Robot',
        address_line1: '42 Sevenoaks St',
        address_city: 'Lathlain',
        address_postcode: 6454,
        address_state: 'WA',
        address_country: 'AU'
      }, function (err,res,body) {
        testCardToken = body.response.token;
        pin.createCustomer({
          email: 'roland@pinpayments.com',
          card_token: testCardToken
        }, function (err,res) {
          if (err) { throw err };
          done();
        });
      });

    });
  });

  describe('Create recipient', function(){
    it('should return successfully', function(done){
      testRecipient = {
        email : 'dino@thefat.com',
        name  : 'Fat Dinosaur',
        bank_account : {
          "name": "Mr Fat Dinosaur",
          "bsb": "342088",
          "number": "987654321"
        }
      }
      pin.createRecipient(testRecipient,function(err,res,body){
        if(err) {throw err};
        testRecipient = body.response;
        done();
      });
    });
  });

  describe('Create recipient with incorrect BSB', function() {
    it('should return a validation error', function(done) {
      recipientWrongBsb = {
        email : 'dino@thefat.com',
        name  : 'Fat Dinosaur',
        bank_account : {
          "name": "Mr Fat Dinosaur",
          "bsb": "123456",
          "number": "987654321"
        }
      }
      pin.createRecipient(recipientWrongBsb, function(err, res, body) {
        if (err) {
          expect(res.statusCode).to.equal(422);
          expect(body.error).to.equal('invalid_resource');
          expect(body.error_description).to.equal('One or more parameters were missing or invalid');
          expect(body.messages[0].param).to.equal('bank_account');
          expect(body.messages[0].code).to.equal('bank_account_invalid');
          expect(body.messages[0].message).to.equal('Bank account is invalid');
          done();
        } else {
          throw 'Expecting an error';
        };
      });
    });
  });

  describe('Get recipient data', function(){
    it('should return successfully',function(done){
      pin.getRecipientData(testRecipient.token, function(err,res,body){
        if(err) {throw err};
        if(JSON.stringify(body.response) !== JSON.stringify(testRecipient)) {throw new Error('get recipient data failed')}
        done();
      });
    })
  });

  describe('Get recipients list', function(){
    it('should return successfully', function(done){
      pin.getRecipientsList(function(err,res){
        if(err) { throw err }
        done();
      });
    });
  });

  describe('Get recipient transfers', function(){
    it('should return successfully', function(done){
      pin.getRecipientTransfers(testRecipient.token, function(err,res){
        if(err) {throw err};
        done();
      });
    });
  });

  describe('Update recipient data', function(){
    it('should update email', function(done){
      pin.updateRecipientData(testRecipient.token,{email : 'test@test.com'},function(err,res,body){
        if(err) {throw err};
        expect(body.response.email).to.equal('test@test.com');
        done();
      });
    });
    it('should update recipient name', function(done){
      pin.updateRecipientData(testRecipient.token,{name : 'slim pterodactyl'},function(err,res,body){
        if(err) {throw err};
        expect(body.response.name).to.equal('slim pterodactyl');
        done();
      });
    });
    it('should update recipient bank account', function(done){
      var bankUpdate = {"name": "Mr Roland Robot","bsb": "342088","number": "987654321"};
      pin.updateRecipientData(testRecipient.token,{bank_account: bankUpdate},function(err,res,body){
        if(err) {throw err };
        expect(body.response.bank_account.name).to.equal(bankUpdate.name);
        expect(body.response.bank_account.bsb).to.equal(bankUpdate.bsb);
        done();
      });
    });
  });

  describe('Create transfer', function(){
    it('should return successfully', function(done){
      pin.createTransfer({
        description : "test transfer",
        amount : 10,
        currency : "AUD",
        recipient : testRecipient.token
      },function(err,res,body){
        if(err) {throw err};
        testTransfer = body.response;
        done();
      });
    });
  });

  describe('Get all transfers', function(){
    it('should return array of transfers', function(done){
      pin.getTransfersList(function(err,res){
        if(err) {throw err};
        done();
      });
    });
  });

  describe('Get transfer details', function(){
    it('should return successfully', function(done){
      pin.getTransferDetails(testTransfer.token,function(err,res){
        if(err) {throw err};
        done();
      });
    });
  });

  describe('Get transfer line items', function(){
    it('should return successfully', function(done){
      pin.getTransferLineItems(testTransfer.token, function(err,res){
        if(err) {throw err};
        done();
      });
    });
  });

  describe('Capture a charge', function () {
    it('should capture a non captured charge', function (done) {
      pin.captureCharge(nonCapturedCharge, function (err, res) {
        if(err) {throw err};
        done();
      })
    })
  })

} else{
  describe('You will need a valid api key to run tests', function () {
    it('should return successfully', function () {
      return true;
    });
  });
}
