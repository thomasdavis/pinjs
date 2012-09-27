# Pinjs - Node.js module for Pin.net.au

[![Build Status](https://secure.travis-ci.org/ApiEngine/pinjs.png?branch=master)](http://travis-ci.org/ApiEngine/pinjs)

Pinjs is an node.js API client for [Pin](https://pin.net.au/) which is an Australian payment gateway.    The module has wrapped all documented Pin resources.

## Getting started

```
npm install pinjs
```

## Methods

First instantiate pinjs by passing in your api key 

```javascript
var Pin = require('pin');

var pin = Pin.setup({
  key: 'yourkey',
  production: false
});

this.createCard = function (fields, callback) {
this.createCustomer = function (fields, callback) {
this.refundCharge = function (chargeId, fields, callback) {
this.retrieveCharge = function (chargeId, callback) {
this.createCharge = function (fields, callback) {
```

## Sample

This is the basic syntax of how to create a new charge, checkout the demos folder for the rest of the methods

```javascript
var Pin = require('pin');

var pin = Pin.setup({
  key: 'your-api-key',
  production: false
});

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
  console.log(response.body);
});
```
