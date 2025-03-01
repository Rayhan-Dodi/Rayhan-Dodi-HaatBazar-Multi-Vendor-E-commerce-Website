const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Stripe
const paypal = require('@paypal/checkout-server-sdk'); // PayPal
const config = require('config');
const axios = require('axios'); // For Bikash, Google Pay, and Bank Pay API calls

// Stripe Payment
const createStripePayment = async (amount, currency, token) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents (e.g., $10 = 1000 cents)
      currency: currency,
      payment_method: token,
      confirm: true,
    });

    return paymentIntent;
  } catch (error) {
    console.error('Error processing Stripe payment:', error);
    throw new Error('Stripe payment failed');
  }
};

// PayPal Payment
const createPaypalPayment = async (amount, currency, returnUrl, cancelUrl) => {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_SECRET;

  const environment = new paypal.core.SandboxEnvironment(clientId, secret);
  const client = new paypal.core.PayPalHttpClient(environment);

  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: currency,
        value: amount,
      },
    }],
    application_context: {
      return_url: returnUrl,
      cancel_url: cancelUrl,
    },
  });

  try {
    const order = await client.execute(request);
    return order.result;
  } catch (error) {
    console.error('Error processing PayPal payment:', error);
    throw new Error('PayPal payment failed');
  }
};

// Bikash Payment (Bikash API Placeholder Example)
const createBikashPayment = async (amount, phoneNumber) => {
  const bikashApiUrl = 'https://api.bikash.com/v1/payment';
  
  try {
    const response = await axios.post(bikashApiUrl, {
      amount,
      phone_number: phoneNumber,
      api_key: process.env.BIKASH_API_KEY,
    });

    if (response.data.success) {
      return response.data.payment_url;
    } else {
      throw new Error('Bikash payment failed');
    }
  } catch (error) {
    console.error('Error processing Bikash payment:', error);
    throw new Error('Bikash payment failed');
  }
};

// Google Pay Payment (Example using Google Pay API)
const createGooglePayPayment = async (amount, currency, token) => {
  const googlePayUrl = 'https://pay.google.com/gp/p/ui/payments/v1/charge';

  try {
    const response = await axios.post(googlePayUrl, {
      amount,
      currency,
      payment_method: token, // Google Pay token
    });

    if (response.data.success) {
      return response.data.payment_id;
    } else {
      throw new Error('Google Pay payment failed');
    }
  } catch (error) {
    console.error('Error processing Google Pay payment:', error);
    throw new Error('Google Pay payment failed');
  }
};

// Bank Payment (Credit/Debit/MasterCard integration example)
const createBankPayment = async (amount, cardDetails) => {
  const bankPaymentApiUrl = 'https://api.bankgateway.com/v1/payment';

  try {
    const response = await axios.post(bankPaymentApiUrl, {
      amount,
      card_number: cardDetails.cardNumber,
      expiration_date: cardDetails.expiryDate,
      cvv: cardDetails.cvv,
      cardholder_name: cardDetails.cardholderName,
    });

    if (response.data.success) {
      return response.data.transaction_id;
    } else {
      throw new Error('Bank payment failed');
    }
  } catch (error) {
    console.error('Error processing bank payment:', error);
    throw new Error('Bank payment failed');
  }
};

// Unified Payment Gateway Function
const processPayment = async (paymentMethod, amount, currency, paymentDetails) => {
  try {
    switch (paymentMethod) {
      case 'stripe':
        return await createStripePayment(amount, currency, paymentDetails.token);
      case 'paypal':
        return await createPaypalPayment(amount, currency, paymentDetails.returnUrl, paymentDetails.cancelUrl);
      case 'bikash':
        return await createBikashPayment(amount, paymentDetails.phoneNumber);
      case 'googlePay':
        return await createGooglePayPayment(amount, currency, paymentDetails.token);
      case 'bank':
        return await createBankPayment(amount, paymentDetails.cardDetails);
      default:
        throw new Error('Unsupported payment method');
    }
  } catch (error) {
    console.error('Error processing payment:', error);
    throw new Error('Payment processing failed');
  }
};

module.exports = {
  createStripePayment,
  createPaypalPayment,
  createBikashPayment,
  createGooglePayPayment,
  createBankPayment,
  processPayment,
};
