const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors())
const port = 3000;

const taxRate = 5;
const discountPercentage = 10;
const loyaltyRate = 2;

app.get('/cart-total', (req, res) => {
  const newItemPrice = parseFloat(req.query.newItemPrice);
  const cartTotal = parseFloat(req.query.cartTotal);
  const totalCartPrice = cartTotal + newItemPrice;

  res.send(totalCartPrice.toString());
});

app.get('/membership-discount', (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  const isMember = req.query.isMember;
  let totalCartPrice = cartTotal;
  if(isMember === 'true'){
    totalCartPrice = totalCartPrice-(totalCartPrice*(discountPercentage/100));
  }

  res.send(totalCartPrice.toString());
});

app.get('/calculate-tax', (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  const totalTax = cartTotal*(taxRate/100);

  res.send(totalTax.toString());
});

app.get('/estimate-delivery', (req, res) => {
  const shippingMethod = req.query.shippingMethod;
  const distance = parseFloat(req.query.distance);
  let deliveryDays;
  if(shippingMethod === 'standard'){
    deliveryDays = distance/50;
  } else if(shippingMethod === 'express') {
    deliveryDays = distance/100;
  }

  res.send(deliveryDays.toString());
});

app.get('/shipping-cost', (req, res) => {
  const weight = parseFloat(req.query.weight);
  const distance = parseFloat(req.query.distance);
  const shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

app.get('/loyalty-points', (req, res) => {
  const purchaseAmount = parseFloat(req.query.purchaseAmount);
  const loyaltyPoints = purchaseAmount * loyaltyRate;
  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
