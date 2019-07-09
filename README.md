# Pin.js - Node.js module for [pinpayments.com](http://pinpayments.com)

[![Build Status](https://secure.travis-ci.org/ApiEngine/pinjs.png?branch=master)](http://travis-ci.org/ApiEngine/pinjs)

Pin.js is an node.js API client for [Pin](https://pinpayments.com/) which is an Australian payment gateway.    The module has wrapped all documented Pin resources.

Down under we don't have access to some of the cooler payment gateways so we are looking forward to Pin giving us more options than just Paypal.

## Getting started

```
npm install pinjs
```

## Methods

First instantiate pinjs by passing in your api key 

```javascript
var Pin = require('pinjs');

var pin = Pin.setup({
  key: 'yourkey',
  production: false
});
// fields is an object, see the example for more info
pin.createCard(fields, callback)
pin.createCustomer(fields, callback)
pin.refundCharge(chargeId, fields, callback)
pin.retrieveCharge(chargeId, callback)
pin.createCharge(fields, callback)
pin.captureCharge(uncapturedChargeToken, callback)
```

## Example

This is the basic syntax of how to create a new charge, checkout the demos folder for the rest of the methods

> Note: As of v1.0.2 the callback parameters have been updated. Please check the example bellow.

```javascript
var Pin = require('pinjs');

var pin = Pin.setup({
  key: 'your-api-key',
  production: false
});

pin.createCharge({
  amount: 400,
  description: 'test charge',
  email: 'roland@pinpayments.com',
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
}, 
/**
 * @param error - Error response from the API
 * @param response - A HTTP response object.
 * @param body - The JSON response body.
 */
function (error, response, body) {
  console.log(body);
});
```

## Author

Built by the team at [API Engine](http://apiengine.io).

Contact: thomasalwyndavis@gmail.com

<img alt="Clicky" width="1" height="1" src="//in.getclicky.com/66606907ns.gif" />
