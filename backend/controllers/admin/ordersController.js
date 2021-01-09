
const Subscription = require('../../models/subscription.model');
const OrdersController = {
   
    index (req, res) {
    	
        Subscription.find({}, function(err, data) {
            // note that data is an array of objects, not a single object!
            res.render('admin/packages/orders', { req: req , res: res,subscriptions:data});
        });
     	
    },

};

module.exports = OrdersController;
