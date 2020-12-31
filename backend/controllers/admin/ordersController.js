
const OrdersController = {
    index (req, res) {
    	console.log(req.session);
     res.render('admin/orders', { req: req , res: res});
    },

};

module.exports = OrdersController;
