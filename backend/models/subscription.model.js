const config = require('config');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//simple schema
const SubscriptionSchema = new Schema({
  customer_id: {
    type: String
  },
  package_id: {
    type: String,
    required: true,
   
  },
  package_amount: {
    type: Number,
    required: true,
  
  },
  user_id: {
    type: String,
    required: true,
  
  },
  subscription_date: {
    type: Date,
    required: true,
  
  },
  
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

module.exports = Subscription;
