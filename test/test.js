var Pin = require('../');
var key = '';
var pin = Pin.setup({
  key: key,
  production: false
});

var testChargeToken, testCustomerToken, testCardToken;

if(key.length > 0) {

  describe('Create a card', function () {
    it('should return successfully', function (done) {
      pin.createCard({
        number: 5520000000000000,
        expiry_month: '05',
        expiry_year: 2013,
        cvc: 519,
        name: 'Roland Robot',
        address_line1: '42 Sevenoaks St',
        address_city: 'Lathlain',
        address_postcode: 6454,
        address_state: 'WA',
        address_country: 'AU'
      }, function (response) {  
        if (!response.ok) { throw response };
        testCardToken = response.body.response.token;
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
          expiry_year: 2013,
          cvc: 123,
          name: 'Roland Robot',
          address_line1: '42 Sevenoaks St',
          address_city: 'Lathlain',
          address_postcode: 6454,
          address_state: 'WA',
          address_country: 'AU'
        }  
      }, function (response) {  
        if (!response.ok) { throw response };
        testChargeToken = response.body.response.token;
        done();
      });
    });
  });


  describe('Create a customer', function () {
    it('should return successfully', function (done) {
      pin.createCustomer({
        email: 'roland@pin.net.au',
        card: {
          number: 5520000000000000,
          expiry_month: '05',
          expiry_year: 2013,
          cvc: 123,
          name: 'Roland Robot',
          address_line1: '42 Sevenoaks St',
          address_city: 'Lathlain',
          address_postcode: 6454,
          address_state: 'WA',
          address_country: 'AU'
        }  
      }, function (response) {  
        if (!response.ok) { throw response };
        testCustomerToken = response.body.response.token;
        done();
      })
    });
  });

  describe('Refund a charge', function () {
    it('should return successfully', function (done) {
      pin.refundCharge(testChargeToken, {
        amount: 400
      }, function (response) {  
        if (!response.ok) { throw response };
        done();
      });
    });
  });


  describe('Retrieve a charge', function () {
    it('should return successfully', function (done) {
      pin.retrieveCharge(testChargeToken, function (response) {  
        if (!response.ok) { throw response };
        done();
      });
    });
  });


  describe('Create a charge using a card token', function () {
    it('should return successfully', function (done) {
      pin.createCharge({
        amount: 400,
        description: 'test charge',
        email: 'roland@pin.net.au',
        ip_address: '203.192.1.172',
        card_token: testCardToken
      }, function (response) {  
        if (!response.ok) { throw response };
        done();
      });
    });
  });


  describe('Create a charge using a customer token', function () {
    it('should return successfully', function (done) {
      pin.createCharge({
        amount: 400,
        description: 'test charge',
        email: 'roland@pin.net.au',
        ip_address: '203.192.1.172',
        customer_token: testCustomerToken
      }, function (response) {  
        if (!response.ok) { throw response };
        done();
      });
    });
  });


  describe('Create a customer using a card token', function () {
    it('should return successfully', function (done) {
      pin.createCard({
        number: 5520000000000000,
        expiry_month: '05',
        expiry_year: 2013,
        cvc: 519,
        name: 'Roland Robot',
        address_line1: '42 Sevenoaks St',
        address_city: 'Lathlain',
        address_postcode: 6454,
        address_state: 'WA',
        address_country: 'AU'
      }, function (response) {  
        testCardToken = response.body.response.token;
        pin.createCustomer({
          email: 'roland@pin.net.au',
          card_token: testCardToken
        }, function (response) {  
          if (!response.ok) { console.log(response);throw response };
          done();
        });
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