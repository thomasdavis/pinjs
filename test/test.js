var Pin     = require('../');
var _       = require('underscore');
var chai    = require('chai');
var expect  = chai.expect;
chai.use(require('chai-things'));

var key     = 'lLlpdn5KOO-vusSMnBYq_A';
var pin     = Pin.setup({
  key: key,
  production: false
});

var testChargeToken, testCustomerToken, testCardToken, testRecipient;

if(key.length > 0) {

  describe('Create a card', function () {
    it('should return successfully', function (done) {
      pin.createCard({
        number: 5520000000000000,
        expiry_month: '05',
        expiry_year: 2015,
        cvc: 519,
        name: 'Roland Robot',
        address_line1: '42 Sevenoaks St',
        address_city: 'Lathlain',
        address_postcode: 6454,
        address_state: 'WA',
        address_country: 'AU'
      }, function (err,res) {
        if (err) { throw err };
        testCardToken = res.token;
        done();
      });

    });
  });

  describe('Create a charge', function () {
    it('should return successfully', function (done) {
      pin.createCharge({
        amount: 400,
        description: 'test charge',
        email: 'roland@pin.net.au',
        ip_address: '203.192.1.172',
        card: {
          number: 5520000000000000,
          expiry_month: '05',
          expiry_year: 2015,
          cvc: 123,
          name: 'Roland Robot',
          address_line1: '42 Sevenoaks St',
          address_city: 'Lathlain',
          address_postcode: 6454,
          address_state: 'WA',
          address_country: 'AU'
        }
      }, function (err,res) {
        if (err) { throw err };
        testChargeToken = res.token;
        done();
      });
    });
  });
  //

  describe('Create a customer', function () {
    it('should return successfully', function (done) {
      pin.createCustomer({
        email: 'roland@pin.net.au',
        card: {
          number: 5520000000000000,
          expiry_month: '05',
          expiry_year: 2015,
          cvc: 123,
          name: 'Roland Robot',
          address_line1: '42 Sevenoaks St',
          address_city: 'Lathlain',
          address_postcode: 6454,
          address_state: 'WA',
          address_country: 'AU'
        }
      }, function (err,res) {
        if (err) { throw err };
        testCustomerToken = res.token;
        done();
      })
    });
  });
  //
  describe('Retrieve a customer', function () {
    it('should return successfully', function (done) {
      pin.retrieveCustomer(testCustomerToken, function (err,res) {
        if (err) { throw err };
        done();
      });
    });
  });
  //
  //
  describe('Refund a charge', function () {
    it('should return successfully', function (done) {
      pin.refundCharge(testChargeToken, {
        amount: 400
      }, function (err,res) {
        if (err) { throw err };
        done();
      });
    });
  });
  //
  //
  describe('Retrieve a charge', function () {
    it('should return successfully', function (done) {
      pin.retrieveCharge(testChargeToken, function (err,res) {
        if (err) { throw err };
        done();
      });
    });
  });
  //
  //
  describe('Create a charge using a card token', function () {
    it('should return successfully', function (done) {
      pin.createCharge({
        amount: 400,
        description: 'test charge',
        email: 'roland@pin.net.au',
        ip_address: '203.192.1.172',
        card_token: testCardToken
      }, function (err,res) {
        if (err) { throw err };
        done();
      });
    });
  });
  //
  //
  describe('Create a charge using a customer token', function () {
    it('should return successfully', function (done) {
      pin.createCharge({
        amount: 400,
        description: 'test charge',
        email: 'roland@pin.net.au',
        ip_address: '203.192.1.172',
        customer_token: testCustomerToken
      }, function (err,res) {
        if (err) { throw err };
        done();
      });
    });
  });
  //
  //
  describe('Create a customer using a card token', function () {
    it('should return successfully', function (done) {
      pin.createCard({
        number: 5520000000000000,
        expiry_month: '05',
        expiry_year: 2015,
        cvc: 519,
        name: 'Roland Robot',
        address_line1: '42 Sevenoaks St',
        address_city: 'Lathlain',
        address_postcode: 6454,
        address_state: 'WA',
        address_country: 'AU'
      }, function (err,res) {
        testCardToken = res.token;
        pin.createCustomer({
          email: 'roland@pin.net.au',
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
          "bsb": "123456",
          "number": "987654321"
        }
      }
      pin.createRecipient(testRecipient,function(err,res){
        if(err) {throw err};
        console.log("test recipient", res);
        testRecipient = res;
        done();
      });
    });
  });

  describe('Get recipient data', function(){
    it('should return successfully',function(done){
      pin.getRecipientData(testRecipient.token, function(err,res){
        if(err) {throw err};
        if(JSON.stringify(res) !== JSON.stringify(testRecipient)) {throw new Error('get recipient data failed')}
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
      pin.updateRecipientData(testRecipient.token,{email : 'test@test.com'},function(err,res){
        if(err) {throw err};
        expect(res.email).to.equal('test@test.com');
        done()
      });
    });
    it('should update recipient name', function(done){
      pin.updateRecipientData(testRecipient.token,{name : 'slim pterodactyl'},function(err,res){
        if(err) {throw err};
        expect(res.name).to.equal('slim pterodactyl');
        done();
      });
    });
    it('should update recipient bank account', function(done){
      var bankUpdate = {"name": "Mr SLim Pterodactyl","bsb": "432412","number": "9876234241"}
      pin.updateRecipientData(testRecipient.token,{bank_account: bankUpdate},function(err,res){
        if(err) {throw err };
        expect(res.bank_account.name).to.equal(bankUpdate.name);
        expect(res.bank_account.bsb).to.equal(bankUpdate.bsb);
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
      },function(err,res){
        if(err) {throw err};
        testTransfer = res;
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




} else{
  describe('You will need a valid api key to run tests', function () {
    it('should return successfully', function () {
      return true;
    });
  });
}
