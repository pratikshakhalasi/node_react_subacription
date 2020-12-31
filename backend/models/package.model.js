const config = require('config');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//simple schema
const PackageSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
   
  },
   amount: {
    type: Number,
    required: true,
    minlength: 5,
    maxlength: 10,
    
  },
  
});

const Package = mongoose.model('Package', PackageSchema);

module.exports = Package;
